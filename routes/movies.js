const express = require('express');
const request = require('request');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');

router.get('/', moviesCtrl.getAll);
router.get('/:id', moviesCtrl.show);
router.post('/:id', moviesCtrl.addToWatched)
router.get('/search/?', moviesCtrl.search);

module.exports = router;