const mongoose = require('mongoose')
const { Schema, model } = mongoose;



const movieModel = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: {type: Schema.Types.ObjectId, ref: "Movie"}
  },
  {
    timestamps: true
  }
);

const Movie = model("Movie", movieModel);

module.exports = Movie;
