const User = require('../models/User');
const bcrypt = require('bcrypt');

class ResetPassword {

    async updatePassword(req, res, next) {
      try {
        const password = req.body.password;
        const user = await User.findOne({ resetPasswordToken: req.body.token });
        if (!user) {
          res.json({ success: false, error: res.__('Invalid token.') });
          return;
        }
        
        let newPassword = '';

        if (password) {
            newPassword = bcrypt.hashSync(password, 10);
        }
  
        
        user.password = newPassword;
        user.resetPasswordToken = '';
        user.resetPasswordExpires = undefined;

        user.save()
          
        res.json({ success: true });
  
      } catch(err) {
        next(err);
      }
    }
  
  }
  
  module.exports = new ResetPassword();