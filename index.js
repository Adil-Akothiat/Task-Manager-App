require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const tasksRounter = require('./starter/controller/task');
const connectDB = require('./starter/db/connect');

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const app =  express();
app.use(express.json());


app.use('/api/v1/tasks', tasksRounter); 
app.use(express.static('./public'));

const start = async ()=> {
    try {
        await connectDB(process.env.MONGO_SCUR);
        app.listen(port, host, function() {
            console.log('server started...');
        });
    }catch(err) {
        console.log(err);
    }
}

start();