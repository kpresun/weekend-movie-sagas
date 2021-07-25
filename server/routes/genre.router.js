const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM genres ORDER BY name ASC;`;
  pool.query(queryText)
  .then(response => {
    res.send(response.rows);
  })
  .catch(error => {
    console.log('cannot retrieve errors,', error);
    res.sendStatus(500);
  })
  
});

module.exports = router;