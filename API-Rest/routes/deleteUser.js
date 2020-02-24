const User = require('../models/User');

class DeleteUser {

    async deleteData(req, res, next) {
      const user = req.body.name;
      try {
        const account = await User.findOne({ name: user });

        account.delete()
        
        res.json({ success: true });
  
      } catch(err) {
        next(err);
      }
    }
  }
  
  module.exports = new DeleteUser();