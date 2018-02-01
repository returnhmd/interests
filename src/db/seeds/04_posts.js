/* eslint-disable */
const faker = require('faker');
const _ = require('lodash');

function getPosts() {
  const posts = [];
  for (let i = 0; i < 4; i++) {
    _.times(_.random(1, 6), () => {
      posts.push({
        from_id: i,
        interest_id: _.random(0, 3),
        grade: _.random(1, 10),
        description: faker.lorem.sentence(),
      });
    });
  }
  return posts;
}

// faker.lorem.sentece();

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  //console.log(getPosts());
  const posts = getPosts();
  console.log(posts);
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert(posts);
    });
};
