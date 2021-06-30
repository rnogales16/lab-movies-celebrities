// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
// all your routes here


router.get('/create', (req, res) => {
  res.render('celebrities/new-celebrity')
});


router.post('/create', (req, res) => {
  const {name, occupation, catchPhrase} = req.body
  Celebrity.create({name, occupation, catchPhrase})
  .then(allCelebrities => res.redirect('/celebrities'))
  .catch(err => {
    res.redirect('/celebrities/create')
    console.log(err)
  })
});


router.get('/', (req, res) => {
  Celebrity.find()
  .then(oneCelebrity => res.render('celebrities/celebrities', {oneCelebrity}))
  .catch(err => console.log(err))
})



module.exports = router;