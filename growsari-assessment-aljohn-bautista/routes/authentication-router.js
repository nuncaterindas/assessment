const AuthenticationController = require('../controllers/authentication-controller');

class AuthenticationRouter {
  constructor(router, services) {
    this.router = router;
    this.auth = new AuthenticationController(services);
  }

  routes() {
    this.router
      .post('/signup', async (req, res) => this.auth.signUp(req, res));

    this.router
      .post('/signin', async (req, res) => this.auth.signIn(req, res));

    this.router
      .post('/change_password', async (req, res) => this.auth.changePassword(req, res));
  }
}

module.exports = AuthenticationRouter;
