const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require('../address/Address');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
  },

  password: {
    type: String,
    required: true
  },

  active: {
    type: Boolean,
    default: true
  },

  company: {
    type: String,
    maxlength: 100
  },

  addresses: [Address.schema],
  invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }]
},
  {
    versionKey: false
  });

module.exports = mongoose.model('User', UserSchema);
