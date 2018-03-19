process.env.NODE_ENV = 'test';
const chai = require('chai');
const assert = chai.assert;

const server = require('../server');
const mongoose = require('mongoose');
const User = require('../user/User');
const Invoice = require('../invoice/Invoice');

//Our parent block
describe('Testing Setup', () => {

  /*
  * Remove everything from the database
  */
  describe('Database Cleanup', () => {
    it('it should remove all users', (done) => {
      User.remove({}, function (err) {
        assert.equal(err, undefined);

        User.find({}, (err, users) => {
          assert.equal(err, undefined);
          assert.equal(users.length, 0);

          done();
        });
      });
    });

    it('it should remove all invoices', (done) => {
      Invoice.remove({}, (err) => {
        assert.equal(err, undefined);

        Invoice.find({}, (err, invoices) => {
          assert.equal(err, undefined);
          assert.equal(invoices.length, 0);

          done();
        });
      });
    });
  });
});
