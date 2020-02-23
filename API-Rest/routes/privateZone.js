const User = require('../models/User');
const jwt = require('jsonwebtoken');

class PrivateZone {

  async getUserId(req, res, next) {
    try {
      if(!req.headers.authorization){
        res.json({ success: false, error: res.__('User not found.') });
        return;
      }
      const token = req.headers.authorization.replace('Bearer ', '');
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decoded._id });
      
      if(!user){
        res.json({ success: false, error: res.__('User not found.') });
        return;
      } else {
        res.json({ success: true, user: user});
      }


    } catch(err) {
      next(err);
    }
  }

}

module.exports = new PrivateZone();