
/* global process */
const express = require('express');
const cors = require('cors');
const pino = require('pino-http')();

function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pino);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
    
  const contactsRouter = require('./routes/contactsRouter');
  app.use('/contacts', contactsRouter);
}

module.exports = setupServer;