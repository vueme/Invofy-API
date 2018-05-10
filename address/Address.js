const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require('../user/User');

const AddressSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId
  },

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
  },

  owner: {
    type: String,
    trim: true
  }
}, {
    versionKey: false
  });

/**
* Add Address ID to the owners address-array
*/
AddressSchema.post('save', function (address) {
  User.findByIdAndUpdate(address.owner, { $addToSet: { 'addresses': address._id } }, function () { });
});

/**
 * Remove address ID from owners address-array
 */
AddressSchema.post('findOneAndRemove', function (address) {
  // Don't run if no address was found
  if (!address) return;

  User.findByIdAndUpdate(address.owner, { $pull: { addresses: address._id } }, function () { });
});

module.exports = mongoose.model('Address', AddressSchema);
