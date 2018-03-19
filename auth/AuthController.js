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
 * @param "username" in POST-body
 * @param "password" in POST-body
 * @return JWT Authorization token
 * FIXME: Make bcrypt compare async
 */
router.post('/', function (req, res) {
  // No username or password
  if (!req.body.username && !req.body.password) {
    return res.status(400).json();
  }

  // Look for user with a specific username in database
  User.findOne({ username: req.body.username }, 'password', function (err, user) {

    const incorrectCredentials = { "error": "Login failed. Incorrect username or password" };

    // No user with provided username was found
    if (!user) {
      return res.status(403).json(incorrectCredentials);
    }

    // User was found but password was incorrect
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(403).json(incorrectCredentials);
    }

    // Password was correct
    let claims = {
      sub: user.id,
      iss: 'invoice.maciejsiwek.com'
    };

    let options = {
      expiresIn: config.authorization.jwt_expiry
    };

    // Create and the bearer token and return it together with users username
    jwt.sign(claims, new Buffer(config.authorization.jwt_secret, 'base64'), options, function (err, token) {
      return res.status(200).send({ "token": token });
    });
  });
});

module.exports = router;
