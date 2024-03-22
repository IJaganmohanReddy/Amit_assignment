const Joi = require('joi');

// Define Joi schema for user data
const userSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().min(0),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+\d{1,3}\d{10}$/).required(),
  state: Joi.string().required(), // Assuming limited states A, B, C
  medical_issues_to_be_treated: Joi.string(),
  past_treatment_history: Joi.string(),
});

module.exports = userSchema;