'use strict';

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');


const sendToQueue = require('../../rabbitmq/rabbitConnect')
const Anuncio = require('../../models/Anuncio');
const jwtAuth = require('../../lib/jwtAuth');
// const upload = multer({dest: './public/uploads/'})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
  }
})

var upload = multer({ storage: storage });

router.get('/', async (req, res, next) => {
    try {

        const name = req.query.name;
        const sell = req.query.sell;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const tags = req.query.tags;
        const sort = req.query.sort;
        const price = req.query.price;

        const filter = {};

        if (name) {
            filter.name = name;
        }

        if (name) {
          filter.name = new RegExp('^' + name, "i");
      }

        if (typeof sell !== 'undefined') {
            filter.sell = sell;
        }

        if (typeof tags !== 'undefined') {
          filter.tags = tags;
        }

        if (typeof price !== 'undefined') {
          var priceorder = price.split('-');
          if (priceorder[0] === '') {
            filter.price = { '$lte': priceorder[1]};
          }

          else if (priceorder.length === 1) {
            filter.price = priceorder[0];
          }

          else if (priceorder[1] === ''){
            filter.price = { '$gte': priceorder[0]};
          }

          else if (priceorder[0] !== '' && priceorder[1] !== '') {
            filter.price = { '$gte': priceorder[0], '$lte': priceorder[1]};
          }
        }
      

        const anuncios = await Anuncio.list({ filter: filter, skip, limit, tags, sort});

        res.json({ success: true, results: anuncios });

        } catch (err) {
        next(err);
        }
    });

    router.get('/:id', async (req, res, next) => {
      try {
        const _id = req.params.id;
    
        const anuncio = await Anuncio.findById(_id).exec();
    
        if (!anuncio) {
          res.status(404).json({ success: false });
          return;
        }
    
        res.json({ success: true, result: anuncio});
    
      } catch(err) {
        next(err);
      }
    });

    

    router.post('/', upload.single('photo'), async (req, res, next) => {
      try {
        const data = req.body;
        data.photo = req.file.filename;
        const anuncio = new Anuncio(data);
    
        const saved = await anuncio.save();

        await sendToQueue('Resize', data.photo);
    
        res.json({ success: true, result: saved });
      } catch (err) {
        next(err);
      }
    });

    module.exports = router;