const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const isAuthorized = require('../middleware/AuthMiddleware');

const User = require('./User');

router.use(bodyParser.json());

/**
 * [PUBLIC]
 * Registers an new user
 * @param "username" in body
 * @param "password" in body
 * @FIXME: Make password hashing async
 */
router.post('/', function (req, res) {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  user.save(function (err) {
    // Validation error
    if (err && err.name == 'ValidationError') return res.status(400).send({ 'error': err.message });
    // Duplicate username
    if (err && err.code == 11000) return res.status(409).send({ 'error': 'User with that username already exists' });
    // Other errors
    if (err) return res.status(500).send({ 'error': 'Something went wrong. Try again later' });

    return res.status(200).send();
  });
});

module.exports = router;
