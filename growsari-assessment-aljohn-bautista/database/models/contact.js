/* eslint-disable func-names */
const moment = require('moment');
require('moment-timezone');

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('contact', {
    profile_image: {
      type: DataTypes.STRING,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    middlename: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    name_extension: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    mobile_number: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.STRING,
    },
    updated_at: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      /* eslint-disable no-param-reassign */
      beforeBulkCreate: (contacts) => {
        contacts.forEach((contact) => {
          if (contact) {
            contact.created_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
            contact.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
          }
        });
      },
      beforeBulkUpdate: (contacts) => {
        contacts.forEach((contact) => {
          if (contact) {
            contact.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
          }
        });
      },
      /* eslint-disable no-param-reassign */
      beforeCreate: (contact) => {
        contact.created_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
        contact.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
      },
      beforeUpdate: (contact) => {
        contact.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
      },
      /* eslint-enable no-param-reassign */
    },
  });

  Contact.prototype.getFullname = function () {
    return `${this.firstname} ${this.lastname}`;
  };

  Contact.associate = function (models) {
    Contact.hasMany(models.RefreshToken);
    Contact.belongsTo(models.User, { foreignKey: 'user_id' });
    Contact.belongsToMany(models.User, { through: models.UserContact, foreignKey: 'contact_id', as: 'users' });
  };

  return Contact;
};
