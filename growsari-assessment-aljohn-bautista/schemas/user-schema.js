const Joi = require('joi');

const createAdminUser = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  middlename: Joi.string(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  role_id: Joi.string().required(),
});

const updateAdminUser = Joi.object({
  firstname: Joi.string().allow(''),
  lastname: Joi.string().allow(''),
  middlename: Joi.string().allow(''),
  password: Joi.string().allow(''),
  email: Joi.string().email().allow(''),
  role_id: Joi.string().allow(''),
});

module.exports = {
  '/v1/admins/admin-users/(\\d+)': updateAdminUser,
  '/v1/admins/admin-users': createAdminUser,
};
