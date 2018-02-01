// Update with your config settings.
const path = require('path');

const ROOT = path.resolve(__dirname, '../../');
require('dotenv').config({ path: path.join(ROOT, '.env') });

const { DB_CLIENT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    client: DB_CLIENT || 'postgresql',
    connection: {
      database: DB_NAME || 'interests',
      user: DB_USERNAME || 'hmd',
      password: DB_PASSWORD || 'root',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(ROOT, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(path.join(ROOT, 'src', 'db', 'seeds')),
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
