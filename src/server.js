
/* global process */
const express = require('express');
const cors = require('cors');
const pino = require('pino-http')();

const contactsRouter = require('./routes/contacts');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pino);

  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Contacts API' });
  });

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = setupServer;
