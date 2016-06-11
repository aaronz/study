var express = require('express');
var configStore = require('../configStore');
var router = express.Router();

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  var name = req.params.name;
  res.send(configStore.get(name));
});

module.exports = router;