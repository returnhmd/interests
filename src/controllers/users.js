const { db } = require('../config');
const { signUp, logIn, change } = require('../schemas').users;
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
      // hash
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

  async getAll(ctx) {
    console.log('---->', ctx.state);
    console.log(ctx.params);
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
      if (!_.parseInt(userID) && userID !== '0') {
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
  async getByName(ctx) {
    try {
      const { name } = ctx.params;

      const users = await db('users').where('nickname', 'like', `${name}%`);

      if (_.isEmpty(users)) {
        ctx.throw(400, 'User does not exist.');
      }
      ctx.body = users;
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },
  async putByID(ctx) {
    try {
      const { body } = ctx.request;
      const { id } = ctx.state.user;
      await change.validate(body);
      const col = await db('users')
        .where('id', id)
        .update(body);

      ctx.body = col;
    } catch ({ message }) {
      ctx.throw(400, message);
    }
  },
  async follow(ctx) {
    const myID = ctx.state.user.id;
    const { id } = ctx.request.body;

    if (!_.parseInt(id) && id !== '0') {
      ctx.throw(400, 'ID must be Integer');
    }

    await db('subs').insert({ who: myID, on_whom: id });
  },

  async delByID(ctx) {
    try {
      const { id } = ctx.params;
      if (!_.parseInt(id) && id !== '0') {
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
  },
};
