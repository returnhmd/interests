const Router = require('koa-router');

const api = new Router();

const users = require('./users');
const interests = require('./interests');
const posts = require('./posts');

api.use(users);
api.use(interests);
api.use(posts);

module.exports = api.routes();
