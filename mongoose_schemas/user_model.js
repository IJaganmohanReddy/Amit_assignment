const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  age: { type: Number, min: 0 },

  email: { type: String, required: true, unique: true },

  phone: { type: String, required: true, unique: true },
  // considering as string so that +91 case is handled

  state: { type: String, required: true},
  // we can a list of valid states and use it in this schema

  medical_issues_to_be_treated: { type: String },

  past_treatment_history: { type: String },

  discount_percentage: { type: Number, min: 0, max:100}

});

const User = mongoose.model('User', userSchema);

module.exports = User
