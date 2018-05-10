const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  addr1: {
    type: String,
    default: 'Demovägen 1',
    required: true,
    trim: true
  },

  addr2: {
    type: String,
    trim: true
  },

  post: {
    type: String,
    default: '000-00',
    required: true,
    trim: true
  },

  city: {
    type: String,
    default: 'Demostad',
    required: true,
    trim: true
  },

  country: {
    type: String,
    default: 'Sverige',
    required: true,
    trim: true
  },

  name: {
    type: String,
    default: 'Demoföretag AB',
    required: true,
    trim: true
  },

  holder: {
    type: String,
    default: 'Demo Demos',
    required: true,
    trim: true
  },

  phone: {
    type: String,
    default: '073-0000000',
    required: true,
    trim: true
  },

  org: {
    type: String,
    default: '00000000-0000',
    required: true,
    trim: true
  },

  bankacc: {
    type: String,
    default: 'BG 000-0000',
    required: true,
    trim: true
  }
},
  {
    _id: false,
    versionKey: false
  });

module.exports = mongoose.model('Company', CompanySchema);
