const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require('../user/User');

const AddressSchema = new Schema({
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
  },

  owner: {
    type: String,
    required: true
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
