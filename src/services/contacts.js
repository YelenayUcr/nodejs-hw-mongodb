import Contact from '../db/models/contacts.js';

export const getAllContacts = async (options = {}) => {
  const {
    filter = {},
    sortBy = 'name',
    sortDirection = 1,
    skip = 0,
    limit = 10
  } = options;

  const totalItems = await Contact.countDocuments(filter);

  const contacts = await Contact.find(filter)
    .sort({ [sortBy]: sortDirection })
    .skip(skip)
    .limit(limit);

  return {
    contacts,
    totalItems
  };
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createContact = async (payload) => {
  return await Contact.create(payload);
};

export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};

export const updateContact = async (contactId, payload) => {
  return await Contact.findByIdAndUpdate(contactId, payload, { new: true });
};