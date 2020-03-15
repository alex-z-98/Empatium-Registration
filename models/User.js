const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Mail: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  Telephone: {
    type: String,
    required: true
  },
  PatientGender: {
    type: String,
    required: true
  },
  Region: {
    type: String,
    required: true
  },
  PatientAge: {
    type: String,
    required: true
  },
  Money: {
    type: String,
    required: true
  },
  Shedule: {
    type: String
  },
  Time: {
    type: String,
    required: true
  },
  PrimaryProblem: {
    type: String,
    required: true
  },
  PsychGender: {
    type: String,
    required: true
  },
  Other: {
    type: String,
    required: true
  },
  PsychAge: {
    type: String,
    required: true
  },
  links:[{type: mongoose.Types.ObjectId,
          ref: 'Link'
        }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
