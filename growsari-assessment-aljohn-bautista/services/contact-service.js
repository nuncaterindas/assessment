const Sequelize = require('sequelize');
const CustomError = require('../helpers/custom-error');
const { VALIDATION_ERROR, AUTHORIZATION_ERROR, NOT_FOUND_ERROR } = require('../enums/error-codes');

const { Op } = Sequelize;

class ContactService {
  constructor(database) {
    this.database = database;
    this.sequelize = this.database.sequelize;

    Object.assign(this, this.database.models);
  }

   async update({
     userId,
     data,
   }) {

     // Check if user exists
     const contact = await this.Contact.findOne({
       where: {
         user_id: userId,
       },
     });

     if (!contact) {
       throw new CustomError(404, 'profile not found.');
     }

       const profileUpdate = await contact.update({
         ...data,
       })

     return profileUpdate;
   }

   async addContact({
    contactId
  }) {

    // Check if user exists
    const contact = await this.Contact.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!contact) {
      throw new CustomError(404, 'profile not found.');
    }

    await booking.addWallets(wallet);

      const profileUpdate = await contact.update({
        ...data,
      })

    return profileUpdate;
  }


  async getContactByUser({
    userId
  }) {

    // Check if user exists
    const contact = await this.Contact.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!contact) {
      throw new CustomError(404, 'contact not found.');
    }
    
    return contact;
  }


  async getContactById({
    contactId
  }) {

    // Check if user exists
    const contact = await this.Contact.findOne({
      where: {
        id: contactId,
      },
    });

    if (!contact) {
      throw new CustomError(404, 'contact not found.');
    }
    
    return contact;
  }


  async findAllByName({
    filter
  }) {

    // Check if user exists
    const contact = await this.Contact.findAll({
      where: filter
    });

    if (!contact) {
      throw new CustomError(404, 'contact not found.');
    }
    
    return contact;
  }
   
}
module.exports = ContactService;
