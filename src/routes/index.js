const Router = require('koa-router');

const api = new Router();

const users = require('./users');

api.use(users);

module.exports = api.routes();
