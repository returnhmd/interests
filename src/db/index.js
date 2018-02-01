const path = require('path');

const ROOT = path.resolve(__dirname, '../../');
require('dotenv').config({ path: path.join(ROOT, '.env') });

const { NODE_ENV } = process.env;

const db = require('knex')(require('./knexfile')[NODE_ENV || 'development']);

module.exports = db;
