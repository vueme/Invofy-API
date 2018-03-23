const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const isAuthorized = require('../middleware/AuthMiddleware');

const User = require('./User');

router.use(bodyParser.json());

/**
 * [PUBLIC]
 * Creates new user account
 * @param "email" in body
 * @param "password" in body
 */
router.post('/', function (req, res) {
  const plainTextPassword = req.body.password;
  const email = req.body.email.trim();

  if (plainTextPassword.length < 8) return res.status(400).send({ 'error': 'Password has to be at least 8 characters long' });

  bcrypt.hash(plainTextPassword, 10, function (err, hashedPassword) {
    const user = new User({
      email: email,
      password: hashedPassword
    });

    user.save(function (err) {
      // Validation error
      if (err && err.name == 'ValidationError') return res.status(400).send({ 'error': err.message });
      // Duplicate email
      if (err && err.code == 11000) return res.status(409).send({ 'error': 'User with that email already exists' });
      // Other errors
      if (err) return res.status(500).send({ 'error': 'Something went wrong. Try again later' });

      return res.status(200).send();
    });
  });
});

module.exports = router;
