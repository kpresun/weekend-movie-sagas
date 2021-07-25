const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/detail/:id', (req, res) => {
  let movieId = req.params.id;
  const queryText = 'SELECT movies.id, generes.name FROM genres JOIN movies_genres ON genres.id = movies_genres.genre_id JOIN movies ON movies.id = movies_genres.movie_id WHERE movies.id =$1;';
  console.log('Inside router get for retrieving movie detail:', movieId);
  pool.query(queryText, [movieId])
  .then(dbResponse => res.send(results.rows))
  .catch(error => {
    console.log('unable to retrieve data from db:', error);
    res.sendStatus(500);
  })
});

module.exports = router;