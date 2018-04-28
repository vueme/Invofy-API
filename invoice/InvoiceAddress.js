const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceAddressSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },

  customer: {
    type: String,
    required: true
  },

  addr1: {
    type: String,
    required: true
  },

  addr2: {
    type: String,
  },

  post: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  country: {
    type: String,
    required: true
  },

  ref1: {
    type: String,
  },

  ref2: {
    type: String,
  }
}, {
    _id: false,
    versionKey: false
  });

module.exports = mongoose.model('InvoiceAddress', InvoiceAddressSchema);
