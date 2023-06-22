const {Op} = require('sequelize');
const CustomError = require('../helpers/custom-error');
const {
  NOT_FOUND_ERROR, VALIDATION_ERROR,
} = require('../enums/error-codes');


class ConversationController {
  constructor(services) {
    this.services = services;
  }

  async create(req, res) {
    const { 
      user:{ 
        id: userId
       }, 
      body:{
        receiver_id : receiverId
    }
    } = req;

    if(!receiverId){  
        return res.status(400).send({
          message: 'receiver_id is required',
        });
      }

    const contact = await this.services.contact.getContactByUser({
      userId
    });

    const  results = await this.services.conversation.findOrCreate({
      contactId: contact.id,
      receiverId
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
    } = req;


    const contact = await this.services.contact.getContactByUser({
      userId
    });

    const  results = await this.services.conversation.findAll({
      contactId:userId,
    });



    res.status(200).send({
      message: 'Success!',
      results
    });
  }

}

module.exports = ConversationController;
