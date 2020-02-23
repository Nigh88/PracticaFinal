'use strict';

const data = require('./data/adverts.json');
const Advert = require('./models/Advert');
const User = require('./models/User');
const mongoose = require('mongoose');
const conn = mongoose.connection;


conn.once('open', async () => {
  console.log('Creating DB in', mongoose.connection.name);
  await Advert.deleteMany({});
  Advert.insertMany(data);
  await initUsers();
});

async function initUsers() {
  await User.collection.drop();
  await User.deleteMany();
  await User.insertMany([
    {
      name: 'KickBill',
      email: 'ball@example.com',
      password: '$2b$10$70anus594rxPP2MJw4YwH.a5zWhlICjF1B62uLoeX.zdq0MA9cYym'
    },
    {
      name: 'Snowy',
      email: 'sun@example.com',
      password: '$2b$10$VQ1UEO6aoFblw9Mp9e6gIelHwHXby9f/rVCYLORoavnHO1w3TSOZC'
    },
    {
      name: 'Firechicken',
      email: 'egg@example.com',
      password: '$2b$10$p5qLgXOTAalb740vtmjfXebz56bfSJVYDgI4XXt7.Reuuluwbowsa' 
    }
  ]);
}


mongoose.connect('mongodb://localhost/sellorbuy', { useNewUrlParser: true });


