/* eslint-disable func-names */
const moment = require('moment');
require('moment-timezone');

module.exports = (sequelize, DataTypes) => {
  const UserContact = sequelize.define('user_contact', {
    created_at: {
      type: DataTypes.STRING,
    },
    updated_at: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      /* eslint-disable no-param-reassign */
      beforeBulkCreate: (userContact) => {
        userContact.forEach((contact) => {
          if (contact) {
            contact.created_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
            contact.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
          }
        });
      },
      beforeBulkUpdate: (userContact) => {
        userContact.forEach((contact) => {
          if (contact) {
            contact.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
          }
        });
      },
      beforeCreate: (userContact) => {
        userContact.created_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
        userContact.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
      },
      beforeUpdate: (userContact) => {
        userContact.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
      },
      /* eslint-enable no-param-reassign */
    },
  });

  UserContact.associate = function (models) {
    UserContact.belongsTo(models.User, { foreignKey: 'user_id' });
    UserContact.belongsTo(models.Contact, { foreignKey: 'contact_id' });
  };

  return UserContact;
};
