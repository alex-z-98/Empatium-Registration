const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Telephone: {
    type: String,
    required: true
  },
  Mail: {
    type: String,
    required: true
  },
  PsychGender: {
    type: String,
    required: true
  },
  PsychAge: {
    type: String,
    required: true
  },
  Education: {
    type: String,
    required: true
  },
  Specialization: {
    type: String,
    required: true
  },
  Exp: {
    type: String,
    required: true
  },
  Region: {
    type: String,
    required: true
  },
  Schedule: {
    type: String
  },
  Cost: {
    type: String,
    required: true
  },
  Time: {
    type: String,
    required: true
  },
  Pref: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
});

const Doctors = mongoose.model('Doctors', DoctorSchema);

module.exports =  Doctors;