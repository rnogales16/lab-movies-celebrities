// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const isLoggedIn = require('../middleware/isLoggedIn')

// all your routes here

//route to show all movies
router.get('/', (req, res) => {
  Movie.find()
  .then(allMovies => res.render('movies/movies', {allMovies}))
  .catch(err => console.log(err))
})

//route to show the form
router.get('/create', isLoggedIn, (req, res) => {
  Celebrity.find()
  .then(allCelebrities => res.render('./movies/new-movie', {allCelebrities}))
  .catch(err => console.log(err))
});

//route to handle from data
router.post('/create', isLoggedIn, (req, res) => {
  const {title, genre, plot, cast} = req.body
  Movie.create({title, genre, plot, cast})
  .then(newMovie => res.redirect('/movies'))
  .catch(err => {
    res.redirect('/movies/create')
    console.log(err)
  })
})

//route to show one movie
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
  .populate('cast')
  .then((movieDetails) => res.render('./movies/movie-details', movieDetails))
  .catch(err => console.log(err))
})

//route to delete one movie
router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndRemove(id)
  .then(goBackMovies => res.redirect('/movies'))
  .catch(err => console.log(err))
})

//route to show form to edit the movie
router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
  .populate('cast')
  .then((movie) => {
    console.log(movie)
    res.render('./movies/edit-movie', {movie})
  })
  .catch((err) => console.log(err))
})

//route to handle form data to edit the movie
router.post('/:id/edit', (req, res) => {
  const {id} = req.params;
  const {title, genre, plot, cast} = req.body;
  Movie.findByIdAndUpdate(id, {title, genre, plot, cast})
  .then((updateMovie) => {
    console.log(updateMovie)
    res.redirect('/movies')
  })
  .catch((err) => console.log(err))
})

module.exports = router;