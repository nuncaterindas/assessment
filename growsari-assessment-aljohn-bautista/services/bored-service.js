const axios = require('axios');
const qs = require('qs');

class BoredService {
  constructor() {
    this.session = axios.create({
      baseURL: 'https://www.boredapi.com/api',
      //https://www.boredapi.com/documentation#endpoints-random
    });
  }

  async get({ 
      key,
      type,
      participants,
      price,
      minprice,
      maxprice,
      accessibility
  }) {

    const searchParams = {
      key,
      type,
      participants,
      price,
      minprice,
      maxprice,
      accessibility
    }
  
    const queryString = qs.stringify(searchParams);

    const results = await this.session.get(`/activity?${queryString}`);

    return results.data;
  }

  
}

module.exports = BoredService;
