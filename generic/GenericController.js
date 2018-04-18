const express = require('express');
const router = express.Router();

/**
 * [PUBLIC]
 * Returns generic information about this API
 */
router.get('/', function (req, res) {
  return res.status(200).send("Just an API created by Maciej Siwek. You can find more information about it on https://github.com/vueme/Invofy-API.");
});

module.exports = router;
