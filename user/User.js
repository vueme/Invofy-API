const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = require('../company/Company');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please use a valid email address']
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
    type: Company.schema,
    default: {}
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }]
},
  {
    versionKey: false
  });

module.exports = mongoose.model('User', UserSchema);
