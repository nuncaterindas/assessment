/* eslint-disable func-names */
const moment = require('moment');
require('moment-timezone');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: {
      type: DataTypes.TEXT('long'),
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

  

  Message.associate = function (models) {
    Message.belongsTo(models.Conversation, { foreignKey: 'conversation_id' });
    Message.belongsTo(models.Contact, { foreignKey: 'sender_id' });
  };

  return Message;
};
