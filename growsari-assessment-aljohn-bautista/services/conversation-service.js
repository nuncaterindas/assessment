const Sequelize = require('sequelize');
const CustomError = require('../helpers/custom-error');
const { VALIDATION_ERROR, AUTHORIZATION_ERROR, NOT_FOUND_ERROR } = require('../enums/error-codes');

const { Op } = Sequelize;

class ConversationService {
  constructor(database) {
    this.database = database;
    this.sequelize = this.database.sequelize;

    Object.assign(this, this.database.models);
  }

   
   async findOrCreate({
    contactId,
    receiverId
  }) {

    const conversation = await this.Conversation.findOne({
      where: {
        [Op.and]: [
          {
            sender_id: contactId,
          },
          {
            receiver_id: receiverId,
          },
        ],
      },
    });


    if (!conversation) {
      const result = await this.Conversation.create( 
        {
        sender_id: contactId,
        receiver_id: receiverId,
        }
      );

      return result;
    }

    
    return conversation;
  }

   
  async findAll({
    contactId,
  }) {

    const conversation = await this.Conversation.findAll({
      where:
          {
            sender_id: contactId,
        },
    });

    
    return conversation;
  }
}

module.exports = ConversationService;
