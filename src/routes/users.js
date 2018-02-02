const Router = require('koa-router');
const ctrl = require('../controllers').users;
const auth = require('../middleware/auth-required-middleware');

const router = new Router();

router.post('/login', ctrl.logIn);
router.get('/users', auth, ctrl.getAll);
router.get('/users/:id', auth, ctrl.getByID);
// router.get('/users/:name');

router.post('/signup', auth, ctrl.signUp);

router.del('/users/:id', auth, ctrl.delByID);

module.exports = router.routes();
