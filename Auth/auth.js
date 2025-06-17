const Gym = require('../Modals/gym');
const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.cookie_token;

        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        const decode = jwt.verify(token, process.env.JWT_SecretKey);

        // console.log("Decoded gym_id:", decode.gym_id);  // Add this to verify gym_id

        req.gym = await Gym.findById(decode.gym_id).select('-password');

        if (!req.gym) {
            return res.status(404).json({ error: 'Gym not found' });  // Make sure gym is found
        }

        next();

    } catch (err) {
        console.log(err);  // Log the error to see what might have gone wrong
        res.status(401).json({ error: 'Token is not valid' });
    }
}


module.exports = auth;