const { db } = require('../config');
const { signUp, logIn } = require('../schemas').users;
const { createToken } = require('../lib/utils');
// const responces = require('../utlits/responces');
const _ = require('lodash');

module.exports = {
  async logIn(ctx) {
    try {
      const { body } = ctx.request;

      await logIn.validate(body);
      const [user] = await db
        .select()
        .table('users')
        .where({ nickname: body.nickname });

      if (_.isEmpty(user)) {
        ctx.throw(400, 'Such a user does not exist');
      }
      if (user.password !== body.password) {
        ctx.throw(400, 'Wrong password');
      }

      ctx.body = {
        token: createToken(_.pick(user, ['id', 'nickname'])),
      };
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },

  async getAll(ctx) {
    console.log('---->', ctx.state);
    try {
      const users = await db.select().table('users');
      if (_.isEmpty(users)) {
        ctx.throw(204, 'Users do not exist.');
      }
      ctx.body = users;
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },

  async getByID(ctx) {
    try {
      const userID = ctx.params.id;
      if (!_.parseInt(userID)) {
        ctx.throw(400, 'ID must be Integer');
      }
      const [user] = await db
        .select()
        .table('users')
        .where({ id: userID });

      if (_.isEmpty(user)) {
        ctx.throw(400, 'User does not exist.');
      }
      ctx.body = user;
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },

  async signUp(ctx) {
    try {
      const { body } = ctx.request;
      await signUp.validate(body);
      const { rowCount } = await db('users').insert(body);
      ctx.body = `Inserted ${rowCount} column.`;
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },

  async delByID(ctx) {
    try {
      const { id } = ctx.params;
      if (!_.parseInt(id)) {
        ctx.throw(400, 'ID must be Integer');
      }

      const del = await db('users')
        .where('id', id)
        .del();

      if (!del) {
        ctx.throw(400, `Deleted ${del} entry`);
      }
      ctx.body = 'Successful';
    } catch ({ message }) {
      ctx.throw(400, message);
    }

    // try {
    //   const { id } = ctx.params;

    //   const del = await db('users')
    //     .where('id', id)
    //     .del();

    //   if (del) {
    //     ctx.status = 202;
    //     ctx.body = { statusCode: 202, message: 'Successful' };
    //   } else {
    //     ctx.body = { statusCode: 204, message: 'User do not exist.' };
    //   }
    // } catch ({ message }) {
    //   ctx.status = 400;
    //   ctx.body = { statusCode: 400, error: message };
    // }
  },
  // async getByName(ctx) {
  //   const { name } = ctx.params;
  //   console.log(ctx.params);
  //   try {
  //     const users = await db
  //       .table('users')
  //       .where('nickname', 'like', `${name}%`);

  //     ctx.body = users;
  //   } catch (e) {
  //     ctx.body = { statusCode: 404, error: e.message };
  //   }
  // },
};
