const mongoose = require('mongoose');
const Contact = require('../db/models/contactModel');

const getAllContacts = () => Contact.find();

const getContactById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Contact.findById(id);
};

const createNewContact = (data) => Contact.create(data);

const updateContactById = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Contact.findByIdAndUpdate(id, data, { new: true });
};

const deleteContactById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Contact.findByIdAndDelete(id);
};

module.exports = {
  getAllContacts,
  getContactById,
  createNewContact,
  updateContactById,
  deleteContactById,
};
