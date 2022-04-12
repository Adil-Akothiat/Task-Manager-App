const mongoose = require('mongoose');



function connectDB(url) {
    return mongoose
    .connect(url)   
    .then(()=> console.log('connected db..'))
    .catch((err)=> console.log(err));
}

module.exports = connectDB;