var config = {
  production: {
    authorization: {
      jwt_secret: 'RandomLongSecretkeyLikePasswordOrAdmin',
      jwt_expiry: '24h'
    },
    database: {
      string: ''
    }
  },

  developement: {
    authorization: {
      jwt_secret: 'RandomLongSecretkeyLikePasswordOrAdmin',
      jwt_expiry: '24h'
    },
    database: {
      string: ''
    }
  },

  test: {
    authorization: {
      jwt_secret: 'RandomLongSecretkeyLikePasswordOrAdmin',
      jwt_expiry: '24h'
    },
    database: {
      string: ''
    }
  }
};

exports.get = function get(env) {
  return config[env] || config.developement;
};
