const ConversationController = require('../controllers/conversation-controller');

class ConversationRouter {
  constructor(router, services) {
    this.router = router;
    this.conversation = new ConversationController(services);
  }

  routes() {
    //add
    this.router
      .post('/create_conversation', async (req, res) => this.conversation.create(req, res));

    //get
    this.router
      .get('/conversations', async (req, res) => this.conversation.get(req, res));
  
  }
}

module.exports = ConversationRouter;
