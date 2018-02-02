const koaJwt = require('koa-jwt');
const { jwtSecret } = require('../config');

module.exports = koaJwt({
  getToken(ctx) {
    const { authorization } = ctx.header;

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      return authorization.split(' ')[1];
    }

    if (authorization && authorization.split(' ')[0] === 'Token') {
      return authorization.split(' ')[1];
    }

    return null;
  },
  passthrough: true,
  secret: jwtSecret,
  key: 'user',
});
