const mongoose = require('mongoose');
//old one  mongodb://localhost:27017/inodebook
const mongoURI = "mongodb+srv://jigardonda:9825551024%40Aa@cluster0.xqsicym.mongodb.net/jigarPortfolio";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongo successfully");
    })
    mongoose.connection.on('connected', function () {
        console.log(`Mongoose connected to ${mongoURI}`);
    });
    mongoose.connection.on('error', err => {
        console.log('Mongoose connection error:', err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log("Mongoose disconnected");
    });
}

module.exports = connectToMongo;