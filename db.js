const config = require('./config.js').get(process.env.NODE_ENV);
const mongoose = require('mongoose');

mongoose.connect(config.database.string);