const AuthenticationSchemas = require('./authentication-schemas');
const UserSchemas = require('./user-schema');

module.exports = {
  ...AuthenticationSchemas,
  ...UserSchemas,
};
