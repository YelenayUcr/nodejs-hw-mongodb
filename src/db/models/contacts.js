import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
});

const Contact = model('Contact', contactSchema);

export default Contact;
