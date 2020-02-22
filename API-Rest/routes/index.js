var express = require('express');
var router = express.Router();
var adverts = require('../models/Advert');

router.get('/', function(req, res, next) {
  res.locals.adverts = [];
  const perPage = 4;
  const page = req.query.page || 1;
  adverts.find({}).skip((perPage * page) - perPage).limit(perPage).exec(function(err, data) {
    res.locals.adverts = data;
    adverts.count().exec(function(err, count) {
      if (err) return next(err);
    res.render('index', { title: 'SellOrBuy', current: page, pages: Math.ceil(count / perPage) })
    })
  })
});

module.exports = router;
