/* eslint-disable */

const interests = [
  { name: 'games' },
  { name: 'serials' },
  { name: 'books' },
  { name: 'films' },
];

function getInterests() {
  let id = 0;
  return interests.map(i => {
    return {
      id: id++,
      name: i.name,
      description: `Some description about ${i.name}`,
    };
  });
}

exports.getInterests = getInterests;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('interests')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('interests').insert(getInterests());
    });
};
