var express = require('express');

var IndexController = require('../controller/index');
var router = express.Router();

/**
 *
 */
router.get('/', IndexController.index, function (req, res) {});

module.exports = router;
