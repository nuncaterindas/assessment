const BoredApiController = require('../controllers/bored-controller');

class BoredApiRouter {
  constructor(router, services) {
    this.router = router;
    this.bored = new BoredApiController(services);
  }

  routes() {
    
    //get
    this.router
      .get('/activities', async (req, res) => this.bored.get(req, res));
  
  }
}

module.exports = BoredApiRouter;
