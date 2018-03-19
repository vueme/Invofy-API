const app = require('./app');
const ip = process.env.IP || '127.0.0.1';
const port = process.env.PORT || 3000;

const server = app.listen(port, ip, function () {
  console.log('ExpressJS listening on ' + ip + ':' + port + ' in ' + process.env.NODE_ENV + ' mode');
});

module.exports = app;
