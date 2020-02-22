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
      password: 'aaa23'
    },
    {
      name: 'Snowy',
      email: 'sun@example.com',
      password: 'lol11'
    },
    {
      name: 'Firechicken',
      email: 'egg@example.com',
      password: '091fi'
    }
  ]);
}


mongoose.connect('mongodb://localhost/sellorbuy', { useNewUrlParser: true });


