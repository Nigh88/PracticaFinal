const User = require('../models/User');
const jwt = require('jsonwebtoken');

class UpdateUser {

    async update(req, res, next) {
        try {
            const userData = {name : req.body.name, email: req.body.email};
            const token = req.headers.authorization.replace('Bearer ', '');
            var decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded._id });

          if (!user) {
            res.json({ success: false, error: res.__('User not found.') });
            return;
          }
          
          let newData= {
              name: '',
              email: ''
          };
        
          if(userData){
              newData = userData
          }

          user.name = newData.name;
          user.email = newData.email;

          user.save()
            
          res.json({ success: true });
    
        } catch(err) {
          next(err);
        }
      }

}

module.exports = new UpdateUser();