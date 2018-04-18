const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const isAuthorized = require('../middleware/AuthMiddleware');

const User = require('../user/User');

router.use(bodyParser.json());

/**
 * [ PROTECTED ]
 * Gets users company data
 * @return Object with company data
 */
router.get('/', isAuthorized, function (req, res) {
  User.findById(res.locals.userId, 'company -_id', function (err, obj) {
    if (err) return res.status(500).json({ "error": "Something went wrong" });

    return res.status(200).send(obj.company);
  });
});

/**
 * [ PROTECTED ]
 * Updates company object
 */
router.put('/', isAuthorized, function (req, res) {
  User.findByIdAndUpdate(res.locals.userId, { $set: { company: req.body } }, { new: true }, function (err, obj) {
    // Validation error
    if (err && err.name == 'ValidationError') return res.status(400).json(err.message);
    // Internal error
    if (err) return res.status(500).send();

    return res.status(200).send();
  });
});

module.exports = router;
