'use strict';
const bcrypt = require('bcrypt');
const User = require('../models/User');

class RegisterController {

  async register(req, res, next) {
    const user = req.body.user;
    try {
      if (await User.findOne({ email: user.email })) {
        res.json({ success: false, error: res.__('This email is already in use.') });
        return;
      }
      if (await User.findOne({ name: user.name})) {
        res.json({ success: false, error: res.__('This user is already in use.') });
        return;
      }

      const newUser = new User(user);

      if (user.password) {
          newUser.password = bcrypt.hashSync(user.password, 10);
      }

      await newUser.save();

    

      res.json({ success: true, user: newUser });

    } catch(err) {
      next(err);
    }
  }

}

module.exports = new RegisterController();