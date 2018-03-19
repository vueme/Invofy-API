const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const isAuthorized = require('../middleware/AuthMiddleware');
const User = require('../user/User');

router.use(bodyParser.json());

/**
 * [ PROTECTED ]
 * Gets users addresses
 * @return Object of addresses
 */
router.get('/', isAuthorized, function (req, res) {
  User.findById(res.locals.userId, 'addresses -_id', function (err, obj) {
    // Internal error
    if (err) return res.status(500).send();

    // No addresses were found
    if (obj.addresses.length == 0) return res.status(404).json({ "error": "You have no addresses" });

    return res.status(200).send(obj.addresses);
  });
});

/**
 * [ PROTECTED ]
 * Creates new address
 * @param "name" in POST-body
 * @param "address" in POST-body
 */
router.post('/', isAuthorized, function (req, res) {
  User.findByIdAndUpdate(res.locals.userId, { $addToSet: { 'addresses': { 'name': req.body.name, 'address': req.body.address } } },
    { new: true, runValidators: true }, function (err, obj) {

      // Validation error
      if (err && err.name == 'ValidationError') return res.status(400).json(err.message);
      // Internal error
      if (err) return res.status(500).send();

      // Return all addresses
      return res.status(200).send(obj.addresses);
    });
});

/**
 * [ PROTECTED ]
 * Updates an address
 * @param "name" in PUT-body
 * @param "address" in PUT-body
 */
router.put('/:id', isAuthorized, function (req, res) {
  // Find the record and update it
  User.findOneAndUpdate({ _id: res.locals.userId, 'addresses.id': req.params.id }, {
    $set: { "addresses.$.name": req.body.name, "addresses.$.address": req.body.address }
  },
    { new: true, runValidators: true }, function (err, obj) {

      // Validation error
      if (err && err.name == "ValidationError") return res.status(400).json(err.message);

      // Internal error
      if (err) return res.status(500).send();

      return res.status(200).send(obj.addresses);
    });
});

/**
 * [ PROTECTED ]
 * Deletes an address
 * @param "id" in URI
 */
router.delete('/:id', isAuthorized, function (req, res) {
  // Deletes an address using its ID
  User.findByIdAndUpdate(res.locals.userId, { $pull: { addresses: { _id: req.params.id } } }, { new: true }, function (err, obj) {

    // Internal error
    if (err) return res.status(500).json({ "error": "Something went wrong" });

    // Returns new addresses
    return res.status(200).send(obj.addresses);
  });
});

module.exports = router;
