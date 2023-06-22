const CustomError = require('../helpers/custom-error');
const {
  AUTHORIZATION_ERROR,
} = require('../enums/error-codes');
const userTypes = require('../enums/user-types');
const roles = require('../enums/admin-roles');



const isActivated = (req, res, next) => {
  const { user } = req;

  if (user.status) {
    next();
  } else {
    throw new CustomError(403, 'You don\'t have enough permission to access resource.', AUTHORIZATION_ERROR);
  }
};




module.exports = {
  
  isActivated,
};
