export const validateCandidateForm = (formData) => {
  const errors = {};

  if (!formData.firstName) errors.firstName = "First name is required";
  if (!formData.lastName) errors.lastName = "Last name is required";
  if (!formData.email) errors.email = "Email is required";
  if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth is required";

  // Age validation
  if (formData.dateOfBirth) {
    const age =
      new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
    if (age < 18) errors.dateOfBirth = "Must be at least 18 years old";
  }

  // Address validation
  if (!formData.residentialAddress.street1) {
    errors.residentialStreet1 = "Residential street 1 is required";
  }
  if (!formData.residentialAddress.street2) {
    errors.residentialStreet2 = "Residential street 2 is required";
  }

  if (!formData.sameAsResidential) {
    if (!formData.permanentAddress.street1) {
      errors.permanentStreet1 = "Permanent street 1 is required";
    }
    if (!formData.permanentAddress.street2) {
      errors.permanentStreet2 = "Permanent street 2 is required";
    }
  }
  // Document validation
  const documentsValid = formData.documents.every(
    (doc) => doc.fileName && doc.fileType && doc.file
  );
  if (!documentsValid) {
    errors.documents = "All document fields are required";
  }

  return errors;
};
