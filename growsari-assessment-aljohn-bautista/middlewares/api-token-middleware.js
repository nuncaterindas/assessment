const { API_KEY_HEADER } = require('../config');

const hasValidApiToken = async (req, res, next) => {
  // validate headers
  const { 'x-api-key': apiKey } = req.headers;

  if (!API_KEY_HEADER) {
    return res.status(401).send({ message: 'Unauthorized access.' });
  }

  if (apiKey !== API_KEY_HEADER) {
    return res.status(401).send({ message: 'Unauthorized access.' });
  }

  return next();
};

module.exports = {
  hasValidApiToken,
};
