const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = chai.assert;

const mongoose = require('mongoose');
const User = require('../user/User');

chai.use(chaiHttp);

describe('Testing UserController Routes ', () => {

  describe('[POST] /api/user - Registering new User', () => {
    it('successfully creating new user', (done) => {
      var userData = {
        username: "demo",
        password: "password"
      };

      chai.request(server).post('/api/user').send(userData).end((err, res) => {
        assert.equal(res.status, 200);

        User.find({ username: userData.username }, function (err, users) {
          assert.equal(err, undefined);
          assert.equal(users.length, 1);

          done();
        });
      });
    });

    it('should not be able to register user with duplicate username', (done) => {
      var userData = {
        username: "demo",
        password: "password"
      };

      chai.request(server).post('/api/user').send(userData).end((err, res) => {
        assert.equal(res.status, 409);
        assert.exists(res.body.error);

        User.find({ username: userData.username }, function (err, users) {
          assert.notExists(err);
          assert.equal(users.length, 1);

          done();
        });
      });
    });

    it('should return error when not providing all data required', (done) => {
      var userData = {
        username: "demo",
        password: ""
      };

      chai.request(server).post('/api/user').send(userData).end((err, res) => {
        assert.equal(res.status, 400);
        assert.exists(res.body.error);

        User.find({ username: 'demo' }, function (err, users) {
          assert.notExists(err);
          assert.equal(users.length, 1);

          chai.request(server).post('/api/user').send('sd3wtgsd').end((err, res) => {
            assert.equal(res.status, 400);
            assert.exists(res.body.error);

            User.find({ username: 'demo' }, function (err, users) {
              assert.notExists(err);
              assert.equal(users.length, 1);
              done();
            });
          });
        });
      });


    });
  });
});
