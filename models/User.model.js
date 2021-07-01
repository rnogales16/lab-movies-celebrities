const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: {
    type: String, 
    required: [true, 'Username is required'],
    unique: true,//no usar unique mas de lo necesairo porque es super pesado, the default property everywhere is FALSE
    match: [ /^\S+@\S+\.\S+$/ , "Please input a valid email"], //checks if email has @ and .
    lowercase: true
  },
  password: {
    type: String, 
    required: [true, 'Password is required']}
});


const User = mongoose.model('User', userSchema);


module.exports = User;