require('dotenv').config();

const appConfig = require('./app-config');
const dbConfig = require('./db-config');
const tokensConfig = require('./tokens-config');

module.exports = {
  ...appConfig,
  ...tokensConfig,
  // Third Party
  // Business Rules
  // Database
  DB: dbConfig,
};
