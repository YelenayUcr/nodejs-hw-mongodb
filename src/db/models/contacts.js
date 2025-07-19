import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: { 
    type: String,
    required: true,
  },
  email: String,
  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    enum: ['work', 'family', 'friends'],
    required: true,
  },
});

const Contact = model('Contact', contactSchema);

export default Contact;
