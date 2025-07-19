
import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  updateContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { contactAddSchema, contactUpdateSchema } from "../schemas/contactsSchemas.js";

const router = Router();


router.get('/', ctrlWrapper(getContactsController)); // isValidId YOK
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController)); // isValidId VAR
router.post('/', validateBody(contactAddSchema), ctrlWrapper(createContactController));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.put('/:contactId', isValidId, validateBody(contactUpdateSchema), ctrlWrapper(updateContactController));
router.patch('/:contactId', isValidId, validateBody(contactUpdateSchema), ctrlWrapper(patchContactController));

export default router;