const nodemailer = require('nodemailer');
const User = require('../models/User');
const crypto = require('crypto')

class ForgotPassword {
    async  recoverPassword(req, res, next) {
      try{
          if (req.body.email === '') {
            res.status(400).send('email required');
          }
          const user = await User.findOne({
            
              email: req.body.email,
          
          }) 
          if (user === null) {
            res.status(403).send('email not in db');
          } else {
            const token = crypto.randomBytes(20).toString('hex');
            
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 3600000;

              user.save()

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
              user: `${process.env.EMAIL_ADDRESS}`,
              pass: `${process.env.EMAIL_PASSWORD}`,
            },
            tls: {
              rejectUnauthorized: false
          }
          });

          const mailOptions = {
            from: 'nigh.lord.universe@gmail.com',
            to: `${user.email}`,
            subject: 'Link To Reset Password',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
              + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
              + `http://localhost:3000/reset/${token}\n\n`
              + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          };

          console.log('sending mail');

          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
            next(err);
            } else {
              console.log('here is the res: ', response);
              res.status(200).json('recovery email sent');
              }
            });
          }
        } catch(err) {
          next(err);
      }
  };
};

module.exports = new ForgotPassword();