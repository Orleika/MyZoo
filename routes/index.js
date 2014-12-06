var express = require('express'),
  router = express.Router();

/**
 * Module dependencies.
 */
var index = require('../controllers/index.server.controller');

/* GET home page. */
router.get('/', index.read);

module.exports = router;
