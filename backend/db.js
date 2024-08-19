const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/todo-list";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
}

module.exports = connectToMongo;