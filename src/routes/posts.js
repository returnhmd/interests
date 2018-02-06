const Router = require('koa-router');
const { posts } = require('../controllers');
const auth = require('../middleware/auth-required-middleware');

const router = new Router();

router.get('/posts/:id', auth, posts.getByID);
router.get('/myposts', auth, posts.myPosts);
router.post('/posts', posts.post);

module.exports = router.routes();
