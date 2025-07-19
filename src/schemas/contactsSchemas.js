import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(20).required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'family', 'friends').optional()
});

export const contactUpdateSchema = contactAddSchema.fork(['name', 'email', 'phone'], field => field.optional());
