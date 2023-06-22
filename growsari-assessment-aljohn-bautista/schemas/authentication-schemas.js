const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().required(),
  mobile_number: Joi.string().regex(
    /(0|(\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)))\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/,
  ).error(() => 'mobile_number should follow format: +639XXXXXXXXX or 09XXXXXXXXX').required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  middlename: Joi.string().required(),
  name_extension: Joi.string(),
  address: Joi.string(),
}).or(['username', 'email', 'mobile_number']);

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const refreshTokenSchema = Joi.object({
  refresh_token: Joi.string().required(),
});

const verifyTokenSchema = Joi.object({
  token: Joi.string().required(),
});

const changePasswordSchema = Joi.object({
  current_password: Joi.string().required(),
  new_password: Joi.string().required(),
  confirm_password: Joi.string().required(),
});

module.exports = {
  '/api/signup': signupSchema,
  '/api//signin': signinSchema,
  '/api/change_password': changePasswordSchema,
};
