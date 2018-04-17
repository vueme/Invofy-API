const config = require('./config.js').get(process.env.NODE_ENV);
const express = require('express');
const app = express();
const db = require('./db');

if (process.env.NODE_ENV == 'production') {
  console.log('*** YOU ARE RUNNING ON PRODUCTION CONIFIG ***');
}

/**
 * Handles generic operations
 * Available routes:
 * [GET] /api/ - Generic API information
 */
const GenericController = require('./generic/GenericController');
app.use('/api/', GenericController);

/**
 * Handles authentication operations
 * Available routes:
 * [POST] /api/auth - Authorization
 */
const AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

/**
 * Handles registration
 * Available routes:
 * [POST] /api/user - Registration
 */
const UserController = require('./user/UserController');
app.use('/api/user', UserController);

/**
 * Handles address operations
 * Available routes:
 * [GET] /api/address - Gets token-owners addresses
 * [POST] /api/address - Cretes new address
 * [DELETE] /api/address/:id - Deletes an address
 * [PUT] /api/address/:id - Edits an address
 */
const AddressController = require('./address/AddressController');
app.use('/api/address', AddressController);

/**
 * Handles company operations
 * Available routes:
 * [GET] /api/company - Gets company info
 */
const CompanyController = require('./company/CompanyController');
app.use('/api/company', CompanyController);

/**
 * Handles invoice operations
 * Available routes:
 * [GET] /api/invoice -
 * [POST] /api/invoice -
 * [DELETE] /api/invoice/:id -
 * [PUT] /api/invoice/:id -
 */
const InvoiceController = require('./invoice/InvoiceController');
app.use('/api/invoice', InvoiceController);

/**
 * Invalid JSON error handler/app-wide middleware
 */
app.use(function (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ "error": "JSON is not valid" });
  }
});

module.exports = app;
