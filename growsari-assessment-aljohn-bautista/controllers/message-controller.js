const {Op} = require('sequelize');
const CustomError = require('../helpers/custom-error');
const {
  NOT_FOUND_ERROR, VALIDATION_ERROR,
} = require('../enums/error-codes');


class Message {
  constructor(services) {
    this.services = services;
  }

  async create(req, res) {
    const { 
      user:{ 
        id: userId
       }, 
      body:{
        conversation_id:conversationId,
        text
    }
    } = req;

    if(!conversationId ){  
      return res.status(400).send({
        message: 'conversation_id is required',
      });
    }

    const contact = await this.services.contact.getContactByUser({
      userId
    });

    if(!contact){  
        return res.status(400).send({
          message: 'contact_id is required',
        });
      }

    const  results = await this.services.message.create({
      conversationId,
      contactId:contact.id,
      text
    });

    res.status(200).send({
      message: 'Success!',
      results
    });
  }


  async get(req, res) {
    const { 
      user:{ 
        id: userId
       },
       params:{ id :conversationId }
    } = req;

    const  results = await this.services.message.findAll({
      conversationId,
    });

    res.status(200).send({
      message: 'Success!',
      results
    });
  }

}

module.exports = Message;
