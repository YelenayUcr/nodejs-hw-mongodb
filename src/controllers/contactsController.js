const {
  getAllContacts,
  getContactById,
  createNewContact,
  updateContactById,
  deleteContactById,
} = require('../services/contactsService');

const createError = require('http-errors');

const getContacts = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const getContact = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) throw createError(404, 'Contact not found');
  res.status(200).json({
    status: 200,
    message: 'Successfully found contact!',
    data: contact,
  });
};

const createContact = async (req, res) => {
  const contact = await createNewContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

const updateContact = async (req, res) => {
  const contact = await updateContactById(req.params.contactId, req.body);
  if (!contact) throw createError(404, 'Contact not found');
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

const deleteContact = async (req, res) => {
  const result = await deleteContactById(req.params.contactId);
  if (!result) throw createError(404, 'Contact not found');
  res.status(204).send(); // No content
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
