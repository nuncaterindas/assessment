const {Op} = require('sequelize');
const CustomError = require('../helpers/custom-error');
const {
  NOT_FOUND_ERROR, VALIDATION_ERROR,
} = require('../enums/error-codes');

const serializeContact = async (contact) => {
    const {
      id,
      profile_image: profileImage,
      firstname,
      middlename,
      lastname,
      email,
      name_extension: nameExtension,
      mobile_number: mobileNumber,
    } = contact;
  
    
    return {
      id,
      profile_image: profileImage,
      firstname,
      middlename,
      lastname,
      name_extension: nameExtension,
      email,
      mobile_number: mobileNumber,
    };
  };

class ContactController {
  constructor(services) {
    this.services = services;
  }

  
  async updateProfile(req, res) {
    const { 
      user:{ id: userId}, 
      body } = req;

    const updateProfile = await this.services.contact.update({
      userId,
      data: { ...body },
    });

    res.status(200).send({
      message: 'updated successfully!',
      results: updateProfile,
    });
  }

  async addContact(req, res) {
    const { 
      user:{ id: userId}, 
      body:{
        contact_id : contactId
    }
    } = req;

    if(!contactId){  
        return res.status(400).send({
          message: 'contact_id is required',
        });
      }

    const  user = await this.services.auth.getUser(userId);

    if(!user){  
        return res.status(400).send({
          message: 'Something went wrong',
        });
      }

    const contact = await this.services.contact.getContactById({
        contactId
    }); 

    await user.addContact(contact)

    const results =  await user.getContacts()

    res.status(200).send({
      message: 'Added successfully!',
      results: await Promise.all(results.map((row) => serializeContact(row))),
    });
  }

  async getContactList(req, res) {
    const { 
      user:{ id: userId },
      query: {
        name,
      },
    } = req;

    const filter = [];

      if (name) {
        const splitName = name.split(' ');
        filter.push(
          {
            [Op.or]: [{
              firstname: { [Op.like]: `%${name}%` },
            },
            {
              lastname: { [Op.like]: `%${name}%` },
            },
            {
              [Op.and]: [
                {
                  firstname: { [Op.like]: `%${splitName[0]}%` },
                  lastname: { [Op.like]: `%${splitName[1]}%` },
                },
              ],
  
            },
            ],
          },
        );
      }

    const  user = await this.services.auth.getUser(userId);

    if(!user){  
        return res.status(400).send({
          message: 'Something went wrong',
        });
      }

      const results =  await user.getContacts({where:filter})

    res.status(200).send({
      message: 'Success',
      results: await Promise.all(results.map((row) => serializeContact(row))),
    });
  }
  
  async searchContact(req, res) {
    const {
        user:{ id: userId }, 
        query: {
          name,
        },
      } = req;

      const filter = [];

      if (name) {
        const splitName = name.split(' ');
        filter.push(
          {
            [Op.or]: [{
              firstname: { [Op.like]: `%${name}%` },
            },
            {
              lastname: { [Op.like]: `%${name}%` },
            },
            {
              [Op.and]: [
                {
                  firstname: { [Op.like]: `%${splitName[0]}%` },
                  lastname: { [Op.like]: `%${splitName[1]}%` },
                },
              ],
  
            },
            ],
          },
        );
      }
      

      const results = await this.services.contact.findAllByName({
        filter
      });
  
      return res.status(200).send({
        results: await Promise.all(results.map((row) => serializeContact(row))),
      });
  }


  async removeContact(req, res) {
    const { 
      user:{ id: userId },
      body: {
        contact_id:contactId,
      },
    } = req;

    const filter = [];

    if(!contactId){  
        return res.status(400).send({
          message: 'contact_id is required',
        });
      }
      
    const  user = await this.services.auth.getUser(userId);

    if(!user){  
        return res.status(400).send({
          message: 'Something went wrong',
        });
      }

    const contact = await this.services.contact.getContactById({
        contactId
    }); 

    await user.removeContact(contact)

    const results =  await user.getContacts()

    res.status(200).send({
      message: 'Success',
      results: await Promise.all(results.map((row) => serializeContact(row))),
    });
  }

}

module.exports = ContactController;
