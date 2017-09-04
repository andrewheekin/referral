const express = require('express');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');
const emailAPI = require('../middleware/email');



const router = new express.Router();

// enter an email to refer
router.post('/refer', (req, res, next) => {
  if (!req.body.referralEmail || !validator.isEmail(req.body.referralEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email.'
    });
  }

  User.find({ 'email': req.body.referralEmail })
    .then(user => {
      if (user.length > 0) {
        console.log('user from refer query: ', user, !!user);
        return res.status(400).json({
          success: false,
          message: 'A user with this email exists.'
        });        
      }
      else {
        emailAPI.send({
          from: 'Andrew\'s Referral System <me@samples.mailgun.org>',
          to: req.body.referralEmail,
          subject: `Your friend ${req.user.name} has referred you`,
          text: `Hi! You've been referred by your friend ${req.user.name}. Sign up at the link below, and you'll each receive $5.`
        });
        return res.status(200).json({
          success: true,
          successMessage: 'Thanks for the referral!'
        }); 
      }
    }); 
});

router.get('/dashboard', (req, res) => {
  // get all users this user has referred
  let referrals;
  User.find({ 'referrer': req.user.email }).select('email')
    .then(users => {

      // put the list of referrals into a comma separated string
      let str = users.map(el => el.email);
      str = str.join(', ');

      // return the json res within the then() resolve of the async mongoose query
      res.status(200).json({
        email: req.user.email,
        name: req.user.name,
        referrer: req.user.referrer,
        referrals: str,
        referrals_count: users.length,
        message: 'You are logged in'
      });

    })
    .catch(err => console.log(err));
});

module.exports = router;
