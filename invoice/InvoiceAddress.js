const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceAddressSchema = new Schema({
  displayName: {
    type: String,
    required: true,
    trim: true
  },

  customer: {
    type: String,
    required: true,
    trim: true
  },

  addr1: {
    type: String,
    required: true,
    trim: true
  },

  addr2: {
    type: String,
    trim: true
  },

  post: {
    type: String,
    required: true,
    trim: true
  },

  city: {
    type: String,
    required: true,
    trim: true
  },

  country: {
    type: String,
    required: true,
    trim: true
  },

  ref1: {
    type: String,
    trim: true
  },

  ref2: {
    type: String,
    trim: true
  }
}, {
    _id: false,
    versionKey: false
  });

module.exports = mongoose.model('InvoiceAddress', InvoiceAddressSchema);
