

const mongoose = require("mongoose");

    mongoose.connect('mongodb://localhost:27017/gymBackend')
    .then(() => console.log('DB connection sucessfull')).catch(err=>{
        console.log(err)
    });
