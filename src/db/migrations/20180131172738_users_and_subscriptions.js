/* eslint-disable */
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id');
      table
        .string('nickname')
        .unique()
        .notNullable();
      // table.string('first_name').notNullable();
      // table.string('last_name').notNullable();
      table
        .string('email')
        .unique()
        .notNullable();
      table.string('password').notNullable();
    })
    .createTable('subs', table => {
      table.increments('id');
      table
        .integer('who')
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE');
      table
        .integer('on_whom')
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE');
      table.unique(['who', 'on_whom']);
    })
    .createTable('interests', table => {
      table.increments('id');
      table
        .string('name')
        .unique()
        .notNullable();
      table.text('description').notNullable();
    })
    .createTable('posts', table => {
      table.increments('id');
      table
        .integer('interest_id')
        .references('interests.id')
        .notNullable()
        .onDelete('CASCADE');
      table
        .integer('from_id')
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE');
      table.integer('grade').notNullable();
      table.text('description').notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('posts')
    .dropTableIfExists('interests')
    .dropTableIfExists('subs')
    .dropTableIfExists('users');
};
