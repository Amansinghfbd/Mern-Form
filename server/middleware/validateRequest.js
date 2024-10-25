const { validateAge } = require('../utils/validators');

const validateCandidateRequest = (req, res, next) => {
  const errors = [];

  // Required fields validation
  const requiredFields = ['firstName', 'lastName', 'email', 'dateOfBirth'];
  requiredFields.forEach(field => {
    if (!req.body[field]) {
      errors.push(`${field} is required`);
    }
  });

  // Age validation
  if (req.body.dateOfBirth && !validateAge(req.body.dateOfBirth)) {
    errors.push('Candidate must be at least 18 years old');
  }

  // Address validation
  if (!req.body.residentialAddress?.street1 || !req.body.residentialAddress?.street2) {
    errors.push('Residential address is required');
  }

  if (!req.body.sameAsResidential && 
      (!req.body.permanentAddress?.street1 || !req.body.permanentAddress?.street2)) {
    errors.push('Permanent address is required when not same as residential');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  validateCandidateRequest
};