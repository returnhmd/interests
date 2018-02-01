const Router = require('koa-router');
const ctrl = require('../controllers').users;

const router = new Router();

router.get('/users', ctrl.getAll);
router.get('/users/:id', ctrl.getByID);
// router.get('/users/:name');

router.post('/users', ctrl.post);

router.del('/users/:id', ctrl.delByID);

module.exports = router.routes();
