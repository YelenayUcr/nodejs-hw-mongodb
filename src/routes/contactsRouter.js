const express = require('express');
const router = express.Router();
const { getContacts } = require('../controllers/contactsController');
const { getContact } = require('../controllers/contactsController');
router.get('/:contactId', getContact);
router.get('/', getContacts);
module.exports = router;