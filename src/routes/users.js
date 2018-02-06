const Router = require('koa-router');
const ctrl = require('../controllers').users;
const auth = require('../middleware/auth-required-middleware');

const router = new Router();

router.get('/users', auth, ctrl.getAll);
router.get('/user/:id', auth, ctrl.getByID);
// router.get('/users/:name', auth, ctrl.getByName);

router.post('/login', ctrl.logIn);
router.post('/signup', auth, ctrl.signUp);
router.post('/user', auth, ctrl.follow);

router.put('/user', auth, ctrl.putByID);

router.del('/users/:id', auth, ctrl.delByID);

router.get('/users/:id/interests', ctx => {
  console.log('12321', ctx.params);
});

module.exports = router.routes();
