const AuthenticationRouter = require('./authentication-router');
const ContactRouter = require('./contact-router');
const ConversationRouter = require('./conversation-router');
const MessageRouter = require('./message-router');
const BoredApiRouter= require('./bored-router');

class Routes {
  constructor(router, services) {
    this.router = router;
    this.services = services;
  }

  register() {
    new AuthenticationRouter(this.router, this.services).routes();
    new ContactRouter(this.router, this.services).routes();
    new ConversationRouter(this.router, this.services).routes();
    new MessageRouter(this.router, this.services).routes();
    new BoredApiRouter(this.router, this.services).routes();


    return this.router;
  }
}

module.exports = Routes;
