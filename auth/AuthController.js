const config = require('../config.js').get(process.env.NODE_ENV);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.use(bodyParser.json());
const User = require('../user/User');

/**
 * [PUBLIC]
 * Authenticates user and generates
 * @param "email" in POST-body
 * @param "password" in POST-body
 * @return JWT Authorization token
 */
router.post('/', function (req, res) {
  // No email or password specified
  if (!req.body.email && !req.body.password) {
    return res.status(400).json({ 'error': 'Email or username field was not specified' });
  }

  // Look for user with a specific email in database
  User.findOne({ email: req.body.email }, 'password active', function (err, user) {
    const incorrectCredentials = { 'error': 'Login failed. Incorrect email or password' };

    // No user with provided email was found
    if (!user) return res.status(404).json(incorrectCredentials);

    // Compare password from the database with the one that was sent by user
    bcrypt.compare(req.body.password, user.password, function (err, result) {

      // Password was incorrect
      if (!result) return res.status(403).json(incorrectCredentials);

      // User account is not activated or was suspsneded
      if (!user.active) return res.status(401).json({ 'error': 'Your account is not yet activated or was suspended. Contact support for more information' });

      let claims = {
        sub: user.id,
        iss: 'invoice.maciejsiwek.com'
      };

      let options = {
        expiresIn: config.authorization.jwt_expiry
      };

      // Create and the bearer token and return it
      jwt.sign(claims, new Buffer(config.authorization.jwt_secret, 'base64'), options, function (err, token) {
        return res.status(200).json({ 'token': token });
      });
    });
  });
});

module.exports = router;
