const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require('../address/Address');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },

  password: {
    type: String,
    required: true,
    minlength: 8
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
