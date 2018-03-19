const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  description: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
    default: ''
  },

  amount: {
    type: Number,
    required: true,
    default: ''
  },

  price: {
    type: Number,
    required: true,
    default: ''
  },

  sum: {
    type: Number,
    required: true,
    default: ''
  },
  _id: false,
},
  {
    versionKey: false
  });

module.exports = mongoose.model('Item', ItemSchema);
