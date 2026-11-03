const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./DBConn/conn');
const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',').map(value => value.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/auth', require('./Routes/gym'));
app.use('/plans', require('./Routes/membership'));
app.use('/members', require('./Routes/member'));
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});
async function start() {
  if (!process.env.JWT_SecretKey) throw new Error('JWT_SecretKey is required');
  await connectDB();
  app.listen(process.env.PORT || 5000, '0.0.0.0', () => console.log('Gym API started'));
}
start().catch(err => { console.error(err.message); process.exit(1); });
