const MessageController = require('../controllers/message-controller');

class MessageRouter {
  constructor(router, services) {
    this.router = router;
    this.conversation = new MessageController(services);
  }

  routes() {
    //add
    this.router
      .post('/create_message', async (req, res) => this.conversation.create(req, res));

    //get
    this.router
      .get('/messages/:id', async (req, res) => this.conversation.get(req, res));
  
  }
}

module.exports = MessageRouter;
