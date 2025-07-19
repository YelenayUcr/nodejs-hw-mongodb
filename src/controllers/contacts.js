import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getContactsController = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, sortBy = "name", sortOrder = "asc", isFavourite, type } = req.query;
    
    const filter = {};
    if (isFavourite !== undefined) filter.isFavourite = isFavourite === "true";
    if (type) filter.contactType = type;

    const sortDirection = sortOrder === "desc" ? -1 : 1;

    const pageNum = Number(page);
    const perPageNum = Number(perPage);
    const skip = (pageNum - 1) * perPageNum;

    const result = await getAllContacts({
      filter,
      sortBy,
      sortDirection,
      skip,
      limit: perPageNum
    });
    
    const totalItems = result.totalItems;
    const totalPages = Math.ceil(totalItems / perPageNum);
    const hasPreviousPage = pageNum > 1;
    const hasNextPage = pageNum < totalPages;

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: {
        data: result.contacts,
        page: pageNum,
        perPage: perPageNum,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      throw createHttpError(404, 'Contact not found');
    }

    const contact = await getContactById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const newContact = await createContact(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a new contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      throw createHttpError(404, 'Contact not found');
    }

    const deletedContact = await deleteContact(contactId);

    if (!deletedContact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      throw createHttpError(404, 'Contact not found');
    }

    const updatedContact = await updateContact(contactId, req.body);

    if (!updatedContact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully updated contact with id ${contactId}!`,
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
      throw createHttpError(404, 'Contact not found');
    }

    const patchedContact = await updateContact(contactId, req.body);

    if (!patchedContact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully patched contact with id ${contactId}!`,
      data: patchedContact,
    });
  } catch (error) {
    next(error);
  }
};