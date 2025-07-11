const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contactsController');

router.get('/', ctrl.getContacts);
router.get('/:contactId', ctrl.getContact);
router.post('/', ctrl.createContact);
router.patch('/:contactId', ctrl.updateContact);
router.delete('/:contactId', ctrl.deleteContact);

module.exports = router;
