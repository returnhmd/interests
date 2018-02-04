const Router = require('koa-router');

const api = new Router();

const users = require('./users');
const interests = require('./interests');

api.use(users);
api.use(interests);

module.exports = api.routes();
