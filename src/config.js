const path = require('path');
const _ = require('lodash');

const ROOT = path.resolve(__dirname, '../');
require('dotenv').config({ path: path.join(ROOT, '.env') });

const knexfile = require('./db/knexfile');
const knex = require('knex');

module.exports = {
  db: knex(knexfile.development),

  bodyParser: { enableTypes: ['json', 'form'] },
  secret: _.defaultTo(process.env.SECRET, 'secret'),
  jwtSecret: _.defaultTo(process.env.JWT_SECRET, 'secret'),
  jwtOptions: {
    expiresIn: '30d',
  },
};
