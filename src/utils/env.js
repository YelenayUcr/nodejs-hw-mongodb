const dotenv = require('dotenv');
dotenv.config();

const env = (name, defaultValue) => {
  const value = process.env[name];
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Environment variable ${name} is not set`);
};

module.exports = { env };