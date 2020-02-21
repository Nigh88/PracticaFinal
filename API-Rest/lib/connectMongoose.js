'use strict';

const data = require('../data/anuncios.json');
const Anuncio = require('../models/Anuncio');

// Library
const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.set('useFindAndModify', false);

// Conexion events
conn.on('error', err => {
  console.log('Conexion error', err);
  process.exit(1);
});

conn.once('open', async () => {
  console.log('Connected to MongoDB in', conn.name);
  const res = await Anuncio.deleteMany({});
  Anuncio.insertMany(data);
});

// Conexion
mongoose.connect('mongodb://localhost/sellorbuy', { useNewUrlParser: true });

// Export conexion 
module.exports = conn;
