const ContactController = require('../controllers/contact-controller');

class ContactRouter {
  constructor(router, services) {
    this.router = router;
    this.contact = new ContactController(services);
  }

  routes() {
    this.router
      .put('/update_profile', async (req, res) => this.contact.updateProfile(req, res));

    this.router
      .post('/add_contact', async (req, res) => this.contact.addContact(req, res));

    this.router
      .get('/contact_list', async (req, res) => this.contact.getContactList(req, res));

    this.router
      .get('/search_contact', async (req, res) => this.contact.searchContact(req, res))

    this.router
      .post('/remove_contact', async (req, res) => this.contact.removeContact(req, res))
  }
}

module.exports = ContactRouter;
