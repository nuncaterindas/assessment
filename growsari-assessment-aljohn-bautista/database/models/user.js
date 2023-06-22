/* eslint-disable func-names */
const bcrypt = require('bcryptjs');
const moment = require('moment');
require('moment-timezone');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    mobile_number: {
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.STRING,
    },
    updated_at: {
      type: DataTypes.STRING,
    },
  }, {
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      },
    },
    hooks: {
      /* eslint-disable no-param-reassign */
      beforeBulkCreate: (users) => {
        users.forEach((user) => {
          if (user) {
            user.created_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
            user.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
          }
        });
      },
      beforeBulkUpdate: (users) => {
        users.forEach((user) => {
          if (user) {
            user.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
          }
        });
      },
      /* eslint-disable no-param-reassign */
      beforeCreate: (user) => {
        user.created_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
        user.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
        user.password = bcrypt.hashSync(user.password);
      },
      beforeUpdate: (user) => {
        user.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
      },
      /* eslint-enable no-param-reassign */
    },
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.setPassword = function (password) {
    this.password = bcrypt.hashSync(password);
  };

  User.prototype.getFullname = function () {
    return `${this.firstname} ${this.lastname}`;
  };

  User.associate = function (models) {
    User.hasMany(models.RefreshToken);
    User.hasOne(models.Contact);
    User.belongsToMany(models.Contact, { through: models.UserContact, foreignKey: 'user_id', as: 'contacts' });
  };

  return User;
};
