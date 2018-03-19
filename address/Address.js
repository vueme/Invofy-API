const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },

  address: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150
  }
});

module.exports = mongoose.model('Address', AddressSchema);
