//  Add your code here
const mongoose = require('mongoose')
const { Schema, model } = mongoose;



const celebrityModel = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
  },
  {
    timestamps: true
  }
);

const Celebrity = model("Celebrity", celebrityModel);

module.exports = Celebrity;
