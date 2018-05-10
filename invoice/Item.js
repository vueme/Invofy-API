const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },

  amount: {
    type: Number,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true,
    trim: true
  }
},
  {
    _id: false,
    versionKey: false
  });

module.exports = mongoose.model('Item', ItemSchema);
