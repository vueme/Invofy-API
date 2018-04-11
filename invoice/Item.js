const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  description: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  sum: {
    type: Number,
    required: true
  },
},
  {
    _id: false,
    versionKey: false
  });

module.exports = mongoose.model('Item', ItemSchema);
