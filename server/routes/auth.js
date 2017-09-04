const express = require('express');
const validator = require('validator');
const passport = require('passport');
const emailAPI = require('../middleware/email');

const router = new express.Router();


function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

// User.findone(referred by) if that isn't in there throw an error
// would also need to import the user model at the top

  // referral email isnt required
  // if (!payload || typeof payload.referrer !== 'string' || !validator.isEmail(payload.referrer)) {
  //   isFormValid = false;
  //   errors.referrer = 'Please provide a correct referral email address.';
  // }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}


function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }


    emailAPI.send({
      from: 'Andrew\'s Referral System <me@samples.mailgun.org>',
      to: req.body.email,
      subject: `Thanks for signing up, ${req.body.name}!`,
      text: `Hey ${req.body.name} - Welcome to the site and thanks for signing up! ${ req.body.referrer ? `Glad to see you took a referral from ${ req.body.referrer }. ` : ``}If your friends sign up and use your email (${req.body.email}) as the referral, you get $5`
    });

    // let the referrer know someone they referred signed up
    if (req.body.referrer) {
      emailAPI.send({
        from: 'Andrew\'s Referral System <me@samples.mailgun.org>',
        to: req.body.referrer,
        subject: `${req.body.name}, a referral of yours, signed up - here's $5!`,
        text: `You referred ${req.body.name}, and they just signed up. Nice work!`
      });      
    }


    return res.status(200).json({
      success: true,
      message: 'Successful signup! Please log in.'
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});


module.exports = router;
