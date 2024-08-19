const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    task : {
        type : String,
        required : true
    },
    desc : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }
    



  });

  module.exports = mongoose.model('todo', todoSchema);