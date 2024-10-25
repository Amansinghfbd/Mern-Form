const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: [true, 'First name is required'] 
  },
  lastName: { 
    type: String, 
    required: [true, 'Last name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  dateOfBirth: { 
    type: Date, 
    required: [true, 'Date of birth is required'] 
  },
  residentialAddress: {
    street1: { type: String, required: [true, 'Residential street 1 is required'] },
    street2: { type: String, required: [true, 'Residential street 2 is required'] }
  },
  permanentAddress: {
    street1: { type: String },
    street2: { type: String }
  },
  sameAsResidential: { 
    type: Boolean, 
    default: false 
  },
  documents: [{
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    filePath: { type: String, required: true }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);