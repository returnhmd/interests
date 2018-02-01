const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const routes = require('./routes');

const app = new Koa();

app.use(bodyParser());
app.use(logger());

app.use(routes);

app.use(ctx => {
  ctx.body = 'Hello, World!';
});

app.listen(3000);
