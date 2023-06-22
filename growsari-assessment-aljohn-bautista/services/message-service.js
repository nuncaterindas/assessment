const Sequelize = require('sequelize');
const CustomError = require('../helpers/custom-error');
const { VALIDATION_ERROR, AUTHORIZATION_ERROR, NOT_FOUND_ERROR } = require('../enums/error-codes');

const { Op } = Sequelize;

class MessageService {
  constructor(database) {
    this.database = database;
    this.sequelize = this.database.sequelize;

    Object.assign(this, this.database.models);
  }

   
   async create({
    conversationId,
    contactId,
    text
  }) {

      const message = await this.Message.create( 
        {
        conversation_id:conversationId,
        sender_id: contactId,
        text
        }
      );

    return message;
  }
 
   
  async findAll({
    conversationId,
  }) {

    const conversation = await this.Message.findAll({
      where:
          {
            conversation_id: conversationId,
        },
    });

    return conversation;
  }
}

module.exports = MessageService;
