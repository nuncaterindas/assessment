const {Op} = require('sequelize');
const CustomError = require('../helpers/custom-error');
const {
  NOT_FOUND_ERROR, VALIDATION_ERROR,
} = require('../enums/error-codes');


class BoredApi {
  constructor(services) {
    this.services = services;
  }




  async get(req, res) {
    const { 
       query: {
        key,
        type,
        participants,
        price,
        minprice,
        maxprice,
        accessibility
      },
    } = req;

    const  results = await this.services.bored.get({
      key,
      type,
      participants,
      price,
      minprice,
      maxprice,
      accessibility
    });

    res.status(200).send({
      message: 'Success!',
      results
    });
  }

}

module.exports = BoredApi;
