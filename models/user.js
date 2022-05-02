const mongoose = require('mongoose')
const Schema  = mongoose.Schema
const moment = require('moment')

const UserSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String.apply,
        required:true
    },
    profile_pic:{
        type:String,
        default:"empty-avatar.jpg"
    },
    createdAt:{
        type:Date,
        default:moment().format("DD?MM?YYYY") + ";" + moment().format("hh:mm:ss")
    
    }, updatedAt:{
        type:Date,
        default:moment().format("DD?MM?YYYY") + ";" + moment().format("hh:mm:ss")
    
    }


})

//create user model
mongoose.model("users",userSchema);

//export user model
module.exports = mongoose.model("users");