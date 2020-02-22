'use strict';
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {

  async loginJWT(req, res, next) {
    try {
      
      const email = req.body.user.email;
      const password = req.body.user.password;

      const user = await User.findOne({ email: email });
     
      if (!user || !user || !bcrypt.compareSync(password, user.password)) {
        res.json({ success: false, error: res.__('Invalid credentials') });
        return;
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
      });

      res.json({ success: true, token: token });

    } catch(err) {
      next(err);
    }
  }

}

module.exports = new LoginController();