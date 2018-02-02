const jwt = require('jsonwebtoken');
const { jwtSecret, jwtOptions } = require('../config');

module.exports = {
  createToken(user) {
    return jwt.sign(user, jwtSecret, jwtOptions);
  },
};
