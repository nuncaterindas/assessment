/* eslint-disable func-names */
const moment = require('moment');
require('moment-timezone');

module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('conversation', {
    created_at: {
      type: DataTypes.STRING,
    },
    updated_at: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      /* eslint-disable no-param-reassign */
      beforeBulkCreate: (conversation) => {
        conversation.forEach((convo) => {
          if (convo) {
            convo.created_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
            convo.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
          }
        });
      },
      beforeBulkUpdate: (conversation) => {
        conversation.forEach((convo) => {
          if (convo) {
            convo.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
          }
        });
      },
      beforeCreate: (conversation) => {
        conversation.created_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
        conversation.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
      },
      beforeUpdate: (conversation) => {
        conversation.updated_at = moment().tz('Asia/Manila').format('YYYY-MM-DD HH:mm:ss');
      },
      /* eslint-enable no-param-reassign */
    },
  });

  Conversation.associate = function (models) {
    Conversation.belongsTo(models.Contact, { foreignKey: 'sender_id', as: 'sender' });
    Conversation.belongsTo(models.Contact, { foreignKey: 'receiver_id', as: 'receiver' });
    Conversation.hasOne(models.Message);
  };

  return Conversation;
};
