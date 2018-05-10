const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const isAuthorized = require('../middleware/AuthMiddleware');
const User = require('../user/User');
const Address = require('../address/Address');

router.use(bodyParser.json());

/**
 * [ PROTECTED ]
 * Gets users addresses
 * @return Object of addresses
 */
router.get('/', isAuthorized, function (req, res) {
  Address.find({ owner: res.locals.userId }, '-owner', function (err, obj) {

    if (err) return res.status(500).json({ "error": "Something went wrong" });
    if (obj.length == 0) return res.status(404).json({ "error": "No address was found" });

    return res.status(200).send(obj);
  });
});

/**
 * [ PROTECTED ]
 * Creates new address
 */
router.post('/', isAuthorized, function (req, res) {
  let address = new Address({
    _id: mongoose.Types.ObjectId(),
    displayName: req.body.displayName,
    customer: req.body.customer,
    addr1: req.body.addr1,
    addr2: req.body.addr2,
    post: req.body.post,
    city: req.body.city,
    country: req.body.country,
    ref1: req.body.ref1,
    ref2: req.body.ref2,
    owner: res.locals.userId
  });

  address.save(function (err) {
    // Duplicate
    if (err && err.code == 11000) return res.status(409).send({ 'error': 'Address with that display name already exists' });
    // Validation error
    if (err && err.name == 'ValidationError') return res.status(400).json(err.message);
    // Internal error
    if (err) return res.status(500).json({ "error": "Something went wrong" });

    return res.status(200).send(address);
  });
});

/**
 * [ PROTECTED ]
 * Updates an address
 */
router.put('/:id', isAuthorized, function (req, res) {
  //  Disallow updating sensitive fields
  delete req.body._id;
  delete req.body.owner;

  Address.findOneAndUpdate({ _id: req.params.id, owner: res.locals.userId }, req.body, { runValidators: true, new: true }, function (err, address) {
    // Duplicate
    if (err && err.code == 11000) return res.status(409).send({ 'error': 'Address with that display name already exists' });
    // Validation error
    if (err && err.name == 'ValidationError') return res.status(400).json(err.message);
    // Internal error
    if (err) return res.status(500).send();

    return res.status(200).send(address);
  });
});

/**
 * [ PROTECTED ]
 * Deletes an address
 * @param "id" in URI
 */
router.delete('/:id', isAuthorized, function (req, res) {
  Address.findOneAndRemove({ _id: req.params.id, owner: res.locals.userId }, { select: 'owner' }, function (err, obj) {
    if (err || !obj) return res.status(500).send();

    return res.status(200).send();
  });
});

module.exports = router;
