const { db } = require('../config');
const _ = require('lodash');
const { posts } = require('../schemas');

module.exports = {
  async getByID(ctx) {
    try {
      const postID = ctx.params.id;
      console.log(postID);

      if (!_.parseInt(postID)) {
        ctx.throw(400, 'ID must be Integer');
      }

      const [post] = await db
        .select()
        .table('posts')
        .where({ id: postID });

      if (_.isEmpty(post)) {
        ctx.throw(400, 'Post does not exist.');
      }
      ctx.body = post;
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },
  async myPosts(ctx) {
    // sorting
    try {
      const { id } = ctx.state.user;

      const myPosts = await db
        .select()
        .table('posts')
        .where({ from_id: id });

      if (_.isEmpty(myPosts)) {
        ctx.throw(204, 'Posts do not exist.');
      }
      ctx.body = myPosts;
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },
  async post(ctx) {
    try {
      const { body } = ctx.request;
      await posts.validate(body);

      const { id } = ctx.state.user;
      console.log(id);

      body.from_id = id;

      await db.table('posts').insert(body);
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },
};
