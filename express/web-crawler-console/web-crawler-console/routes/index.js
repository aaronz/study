var express = require('express');
var configStore = require('../configStore');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Crawler Console', crawlers: configStore.all() });
});

module.exports = router;
