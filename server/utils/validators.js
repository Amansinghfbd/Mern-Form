const validateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();  

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--; 
  }

  return age >= 18;
};

const validateDocuments = (documents) => {
  return documents && documents.length >= 2;
};

module.exports = {
  validateAge,
  validateDocuments
};
