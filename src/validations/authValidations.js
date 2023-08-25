const Joi = require("joi");

// Define a validation schema for user registration
const userRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = {
  userRegistrationSchema,
};
