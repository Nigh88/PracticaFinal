var express = require('express');
var router = express.Router();
var anuncios = require('../models/Anuncio');

router.get('/', function(req, res, next) {
  res.locals.anuncios = [];
  const perPage = 4;
  const page = req.query.page || 1;
  anuncios.find({}).skip((perPage * page) - perPage).limit(perPage).exec(function(err, data) {
    res.locals.anuncios = data;
    anuncios.count().exec(function(err, count) {
      if (err) return next(err);
    res.render('index', { title: 'SellOrBuy', current: page, pages: Math.ceil(count / perPage) })
    })
  })
});

module.exports = router;
