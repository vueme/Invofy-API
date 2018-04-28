const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const isAuthorized = require('../middleware/AuthMiddleware');

router.use(bodyParser.json());

const Address = require('../address/Address');
const Invoice = require('../invoice/Invoice');

/**
 * [PROTECTED]
 * Gets invoices of the authorized user
 */
router.get('/', isAuthorized, function (req, res) {
  Invoice.find({ owner: res.locals.userId }, 'number customer.displayName date', function (err, obj) {

    if (err) return res.status(500).json({ 'error': 'Something went wrong' });
    if (obj.length == 0) return res.status(404).json({ 'error': 'No invoices were found' });

    return res.status(200).send(obj);
  });

});

/**
 * [PROTECTED]
 * Creates new invoice for the authorized user
 * @param "number" in body
 * @param "customer" in body
 * @param "items" in body 
 */
router.post('/', isAuthorized, function (req, res) {
  delete req.body.date;
  delete req.body.owner;

  if (!req.body.customer) return res.status(400).json({ 'error': 'Customer field is required' });

  let addressFields = 'displayName customer addr1 addr2 post city country ref1 ref2 -_id';

  Address.findOne({ _id: req.body.customer, owner: res.locals.userId }, addressFields, function (err, obj) {
    if (err || !obj) return res.status(500).json({ 'error': 'Something went wrong' });

    let invoice = new Invoice({
      _id: mongoose.Types.ObjectId(),
      number: req.body.number,
      customer: obj,
      items: req.body.items,
      owner: res.locals.userId,
    });

    invoice.save(function (err) {
      // Validation error
      if (err && err.name == 'ValidationError') return res.status(400).json(err.message);
      // Internal error
      if (err) return res.status(500).json({ 'error': 'Something went wrong' });

      return res.status(200).send(invoice);
    });
  });
});

/**
 * [PROTECTED]
 * Change invoice details 
 * @param "id" in URL
 */
router.put('/:id', isAuthorized, function (req, res) {
  delete req.body._id;
  delete req.body.date;
  delete req.body.owner;

  Invoice.findOneAndUpdate({ _id: req.params.id, owner: res.locals.userId }, req.body, { runValidators: true, new: true, select: '-owner' }, function (err, invoice) {

    if (err && err.name == 'ValidationError') return res.status(400).json(err.message);
    if (err) return res.status(500).send();

    return res.status(200).send(invoice);
  });
});

/**
 * [PROTECTED]
 * Delete an invoice
 * Reference in users invoices-array is deleted in 'findOneAndRemove' mongoose middleware
 * @param "id" in URI
 */
router.delete('/:id', isAuthorized, function (req, res) {
  Invoice.findOneAndRemove({ _id: req.params.id, owner: res.locals.userId }, { select: 'owner' }, function (err, invoice) {

    if (err || !invoice) return res.status(500).send();

    return res.status(200).send();
  });
});

module.exports = router;
