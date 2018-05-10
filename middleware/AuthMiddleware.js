const config = require('../config.js').get(process.env.NODE_ENV);
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.use(cookieParser());

router.use(function (req, res, next) {
  let token = req.headers.token || req.cookies.token;
  let errorMsg = { "error": "Authorization Error" };

  // No token was sent
  if (!token) {
    return res.status(403).json({ "error": "Missing token" });
  }

  jwt.verify(token, new Buffer(config.authorization.jwt_secret, 'base64'), function (err, decoded) {
    // Failed token verification
    if (err) return res.status(401).send(errorMsg);

    // Pass user ID to the next route and continue execution
    res.locals.userId = decoded.sub;
    next();
  });
});

module.exports = router;
