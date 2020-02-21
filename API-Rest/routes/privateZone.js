const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class PrivateZone {

  async getUserId(req, res, next) {
    try {
      
      const token = req.body.user.token;

    //   const user = await User.findOne({ token: token });

      const okToken = jwt.decode({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
      });

      res.json({ success: true, token: okToken });

    } catch(err) {
      next(err);
    }
  }

}

module.exports = new PrivateZone();