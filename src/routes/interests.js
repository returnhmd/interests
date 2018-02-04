const Router = require('koa-router');
const { interests } = require('../controllers');
const auth = require('../middleware/auth-required-middleware');

const router = new Router();

router.get('/interests', auth, interests.getAll);
router.get('/interests/:id', auth, interests.getByID);

router.post('/interests', interests.post);

router.del('/interests/:id', interests.delByID);

module.exports = router.routes();
