var config = {
  production: {
    authorization: {
      jwt_secret: '',
      jwt_expiry: '12h'
    },
    database: {
      string: ''
    }
  },

  developement: {
    authorization: {
      jwt_secret: '',
      jwt_expiry: '12h'
    },
    database: {
      string: ''
    }
  },

  test: {
    authorization: {
      jwt_secret: '',
      jwt_expiry: '12h'
    },
    database: {
      string: ''
    }
  }
};

exports.get = function get(env) {
  return config[env] || config.developement;
};
