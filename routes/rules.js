const express = require('express');
const router = express.Router();
const rulesCtrl = require('../controllers/rules');

router.post('/:id', rulesCtrl.create);
router.post('/:mId/:rId', rulesCtrl.toast);


module.exports = router;
