const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  addr1: {
    type: String,
    default: 'Demovägen 1',
    required: true
  },

  addr2: {
    type: String
  },

  post: {
    type: String,
    default: '000-00',
    require: true
  },

  city: {
    type: String,
    default: 'Demostad',
    required: true
  },

  country: {
    type: String,
    default: 'Sverige',
    required: true
  },

  name: {
    type: String,
    default: 'Demoföretag AB',
    required: true
  },

  owner: {
    type: String,
    default: 'Demo Demos',
    required: true
  },

  phone: {
    type: String,
    default: '073-0000000',
    required: true
  },

  org: {
    type: String,
    default: '00000000-0000',
    required: true
  },

  bankacc: {
    type: String,
    default: 'BG 000-0000',
    required: true
  }
},
  {
    _id: false,
    versionKey: false
  });

module.exports = mongoose.model('Company', CompanySchema);
