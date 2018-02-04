const schema = require('../schemas/interests');
const _ = require('lodash');
const { db } = require('../config');

module.exports = {
  //   async post(ctx) {},
  //   async get(ctx) {},
  //   async getByID(ctx) {},
  //   async delByID(ctx) {},
  async delByID(ctx) {
    try {
      const { id } = ctx.params;
      // no check row with id 0, must be corected
      if (!_.parseInt(id)) {
        ctx.throw(400, 'ID must be Integer');
      }

      const del = await db('interests')
        .where('id', id)
        .del();

      if (!del) {
        ctx.throw(400, `Deleted ${del} entry`);
      }
      ctx.body = 'Successful';
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },

  async post(ctx) {
    try {
      const { body } = ctx.request;
      await schema.validate(body);
      const { rowCount } = await db('interests').insert(body);
      ctx.body = `Inserted ${rowCount} column.`;
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },

  async getAll(ctx) {
    // console.log('---->', ctx.state);
    try {
      const interests = await db.select().table('interests');
      if (_.isEmpty(interests)) {
        ctx.throw(204, 'Interests do not exist.');
      }
      ctx.body = interests;
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },

  async getByID(ctx) {
    try {
      const idInterest = ctx.params.id;
      if (!_.parseInt(idInterest)) {
        ctx.throw(400, 'ID must be Integer');
      }
      const [interest] = await db
        .select()
        .table('interests')
        .where({ id: idInterest });

      if (_.isEmpty(interest)) {
        ctx.throw(400, 'Interest does not exist.');
      }

      ctx.body = interest;
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },
};
