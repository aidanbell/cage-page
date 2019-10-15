var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/users');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

module.exports = router;
