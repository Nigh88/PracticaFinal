'use strict';

const mongoose = require('mongoose');
const nodemailerTransport = require('../lib/nodemailerConfigure');

const userSchema = mongoose.Schema({
  name: {  type: String, required: true },
  surname: {  type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});


userSchema.methods.sendEmail = function(from, subject, body) {
  return nodemailerTransport.sendMail({
    from: from,
    to: this.email,
    subject: subject,
    html: body
  })
}

const User = mongoose.model('User', userSchema);

module.exports = User;