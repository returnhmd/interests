/* eslint-disable */
const bcrypt = require('bcrypt');

const users = [
  {
    nickname: 'sova',
  },
  {
    nickname: 'riwa',
  },
  {
    nickname: 'hmd',
  },
  {
    nickname: 'lefomit',
  },
];

function getUsers() {
  let id = 0;
  return users.map(u => {
    return {
      id: id++,
      nickname: u.nickname,
      email: `${u.nickname}@gmail.com`,
      password: bcrypt.hashSync('qwerty', 10),
    };
  });
}

exports.getUsers = getUsers;

exports.seed = function(knex, Promise) {
  console.log('Сработало начало!');
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      console.log('Вставка');
      return knex('users').insert(getUsers());
    });
};
