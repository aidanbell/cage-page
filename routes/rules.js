const express = require('express');
const router = express.Router();
const rulesCtrl = require('../controllers/rules');

router.post('/movies/:id/rules', rulesCtrl.create);

module.exports = router;