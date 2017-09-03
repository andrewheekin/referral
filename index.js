const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./server/models').connect('mongodb://localhost/refertut');

const app = express();

app.use(express.static('./client/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// check the api routes against the authCheck to make sure user is logged in
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


app.listen(3000, () => { console.log('running at http://localhost:3000') });