const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const routes = require('./routes');
const config = require('./config');
const jwt = require('./middleware/jwt-middleware');

const app = new Koa();

app.use(bodyParser(config.bodyParser));
app.use(logger());
app.use(jwt);

app.use(routes);

app.use(ctx => {
  ctx.body = 'Hello, World!';
});

app.listen(3000);
