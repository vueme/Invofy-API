const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Invoice = require('../Invoice');
const moment = require('moment');
const User = require('../../user/User');

module.exports = {
  getCompanyData(req, res, next) {
    User.findById(res.locals.userId, 'company -_id', function (err, obj) {
      if (err || !obj || !obj.company) return res.status(500).json({ "error": "Something went wrong" });

      res.locals.company = obj.company;
      next();

    });
  },

  getInvoiceData(req, res, next) {
    let data = {};

    Invoice.findById({ owner: res.locals.userId, _id: req.params.id }, function (err, obj) {
      if (err || !obj || Object.keys(obj).length === 0) return res.status(500).send({ 'error': 'Something went wrong' });

      data = JSON.parse(JSON.stringify(obj));

      // Add and format date
      data.date = moment(obj.date).format('DD-MM-YYYY');

      // Calculate sum for each item
      data.items.forEach((item, index) => {
        data.items[index].sum = item.amount * item.price;
      });

      // Calculate grand total
      data.grandTotal = 0;
      data.items.forEach((item) => {
        data.grandTotal += item.sum;
      });

      // Generate items objects so there's at least a 10 of total
      for (let i = data.items.length; i < 10; i++) {
        data.items.push({});
      }

      res.locals.invoice = data;
      next();
    });
  }
};

