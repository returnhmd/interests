/* eslint-disable */

const subs = [
  { who: 0, on_whom: 1 },
  { who: 0, on_whom: 2 },
  { who: 0, on_whom: 3 },
  { who: 1, on_whom: 0 },
  { who: 1, on_whom: 3 },
  { who: 3, on_whom: 2 },
];

exports.seed = function(knex, Promise) {
  //getUsers().forEach(data => console.log(data));
  //console.log('=>', knex.select().table('users'));
  return knex('subs')
    .del()
    .then(function() {
      return knex('subs').insert(subs);
    });
};

// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('table_name').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
//       ]);
//     });
// };
