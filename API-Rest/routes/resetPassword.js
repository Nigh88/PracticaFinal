const User = require('../models/User');

class ResetPassword {

    async updatePassword(req, res, next) {
      const password = req.body.password;
      try {
        if (await User.findOne({ token: req.body.resetPasswordToken })) {
          res.json({ success: false, error: res.__('This email is already in use.') });
          return;
        }
  
        const newPassword = new Password(password);
  
        if (password.password) {
            newPassword.password = bcrypt.hashSync(user.password, 10);
        }
  
        await newPassword.save();
  
      
  
        res.json({ success: true, password: newPassword });
  
      } catch(err) {
        next(err);
      }
    }
  
  }
  
  module.exports = new ResetPassword();