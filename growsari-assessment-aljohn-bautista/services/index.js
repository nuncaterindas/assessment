const Authentication = require('./authentication-service');
const Contact = require('./contact-service');
const Conversation = require('./conversation-service');
const Message = require('./message-service');
const BoredApi = require('./bored-service');
// Third Party

class Service {
  constructor(database) {
    this.database = database;
  }

  register() {
    return {
      auth: new Authentication(this.database),
      contact: new Contact(this.database),
      conversation: new Conversation(this.database),
      message: new Message(this.database),
      bored: new BoredApi(this.database),
    };
  }
}

module.exports = Service;
