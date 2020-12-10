'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=mongoose.ObjectId;


const bookSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique: false
    },
    author:{
        type:String,
        required: true,
        unique : false
    },
    user: {
        type: ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports= mongoose.model('book',bookSchema,'books');