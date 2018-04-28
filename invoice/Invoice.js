const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require('../user/User');
const InvoiceAddress = require('./InvoiceAddress');
const Item = require('./Item');

const InvoiceSchema = new Schema({
  number: {
    type: Number,
    required: true,
    trim: true
  },

  customer: {
    type: InvoiceAddress.schema,
    required: true,
    trim: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  owner: {
    type: String,
    required: true,
    trim: true
  },

  items: {
    type: [Item.schema],
    validate: [hasAtLeastOneItem, 'needs to contain at least one object'],
    required: true,
    trim: true
  }
}, {
    versionKey: false
  });


/**
 * Add invoice ID to the owners invoices-array after an invoice has been created
 */
InvoiceSchema.post('save', function (invoice) {
  User.findByIdAndUpdate(invoice.owner, { $addToSet: { 'invoices': invoice._id } }, function () { });
});

/**
 * Remove invoice ID from owners invoices-array after an invoice has been deleted
 */
InvoiceSchema.post('findOneAndRemove', function (invoice) {
  // Do not execute any queries if no invoice was found/removed
  if (!invoice) return;

  User.findByIdAndUpdate(invoice.owner, { $pull: { invoices: invoice._id } }, function () { });
});

/**
 * Validator. Checks if an array of objects contains at least one object
 */
function hasAtLeastOneItem(val) {
  return val.length >= 1;
}

module.exports = mongoose.model('Invoice', InvoiceSchema);
