const express = require('express');
const bearerToken = require('express-bearer-token');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

require('express-async-errors');

const {
  PORT,
  UNAUTHED_ROUTES,
} = require('./config');
const { sequelize, models } = require('./database');
const Services = require('./services');
const Routes = require('./routes');
const handleError = require('./middlewares/error-handler-middleware');
const authRequired = require('./middlewares/authentication-middleware');
const SchemaValidator = require('./middlewares/schema-validator-middleware');

const services = new Services({ sequelize, models }).register();
const routes = new Routes(express.Router(), services).register();


const validateSchema = SchemaValidator();

const startServer = async () => {
  const app = express();

  app.use(morgan('tiny'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bearerToken());
  app.use(cors());

  // Enforce authentication EXCEPT for these routes
  app.use(
    authRequired.unless({
      path: UNAUTHED_ROUTES,
    }),
  );

  // SchemaValidator
  app.use(validateSchema);

  // Mount all API related routes
  app.use('/api', routes);

  // Capture thrown Errors
  app.use((err, req, res, next) => {
    handleError(err, res, next);
    next();
  });

  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
};

startServer();
