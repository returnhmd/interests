const db = require('../db');
const valid = require('../schemas').users;
// const responces = require('../utlits/responces');
const _ = require('lodash');

module.exports = {
  async getAll(ctx) {
    try {
      const users = await db.select().table('users');
      if (_.isEmpty(users)) {
        // ctx.status = 204;
        ctx.body = { statusCode: 204, message: 'Users do not exist.' };
      } else {
        ctx.status = 200;
        ctx.body = users;
      }
    } catch ({ message }) {
      ctx.status = 400;
      ctx.body = { statusCode: 400, error: message };
    }
  },
  //
  async getByID(ctx) {
    const userId = ctx.params.id;
    let user;
    try {
      user = await db
        .select()
        .table('users')
        .where({ id: userId });

      if (_.isEmpty(user)) {
        // ctx.status = 204;
        ctx.body = { statusCode: 204, message: 'Users do not exist.' };
      } else {
        ctx.body = [user];
      }
    } catch ({ message }) {
      ctx.status = 400;
      ctx.body = { statusCode: 400, error: message };
    }
  },

  async post(ctx) {
    try {
      const { body } = ctx.request;
      await valid.validate(body);
      await db('users').insert(body);
      ctx.status = 201;
      ctx.body = { statusCode: 201, message: 'Successful' };
    } catch ({ message }) {
      ctx.status = 400;
      ctx.body = { statusCode: 400, error: message };
    }
  },
  async delByID(ctx) {
    try {
      const { id } = ctx.params;

      const del = await db('users')
        .where('id', id)
        .del();

      if (del) {
        ctx.status = 202;
        ctx.body = { statusCode: 202, message: 'Successful' };
      } else {
        ctx.body = { statusCode: 204, message: 'User do not exist.' };
      }
    } catch ({ message }) {
      ctx.status = 400;
      ctx.body = { statusCode: 400, error: message };
    }
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
