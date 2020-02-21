'use strict';

const data = require('./data/anuncios.json');
const Anuncio = require('./models/Anuncio');
const User = require('./models/User');
const mongoose = require('mongoose');
const conn = mongoose.connection;


conn.once('open', async () => {
  console.log('Creating DB in', mongoose.connection.name);
  await Anuncio.deleteMany({});
  Anuncio.insertMany(data);
  await initUsers();
});

async function initUsers() {
  await User.collection.drop();
  await User.deleteMany();
  await User.insertMany([
    {
      name: 'Rehis',
      surname: 'Rejas Mollejas',
      email: 'user@example.com',
      password: '1234'
    }
  ]);
}


mongoose.connect('mongodb://localhost/sellorbuy', { useNewUrlParser: true });


