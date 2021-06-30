const mongoose = require('mongoose')
const { Schema, model } = mongoose;



const movieModel = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{type: Schema.Types.ObjectId, ref: "Celebrity"}]// nos referimos a celebrity de celebrity.model para acceder al contenido.
  },
  {
    timestamps: true
  }
);

const Movie = model("Movie", movieModel);

module.exports = Movie;
