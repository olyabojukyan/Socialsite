const express = require('express');
const { index } = require('../Controllers/indexController');
const router = express.Router();

/* GET home page. */
router.get('/', index)
module.exports = router;
