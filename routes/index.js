const express = require('express');
const request = require('request');
const router = express.Router();

const token = process.env.API_KEY;
const rootURL = `https://api.themoviedb.org/3/person/2963/movie_credits?api_key=${token}&language=en-US`


/* GET home page. */
router.get('/', function(req, res, next) {
  let list = null;
  res.render('index', { list: list });
});

router.post('/', (req, res, next) => {
  let options = {url: rootURL};
  request(options, (err, response, body) => {
    let list = JSON.parse(body);
    res.render('index', {list: list});
    console.log(list);
  })
});

module.exports = router;
