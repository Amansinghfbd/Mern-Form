import { useState } from 'react';
import axios from 'axios';
import useForm from '../hooks/useForm';
import { validateCandidateForm } from '../utils/validators';
import FormInput from './form/FormInput';
import AddressSection from './form/AddressSection';
import DocumentUpload from './form/DocumentUpload';
import Button from './ui/Button';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: '',
  residentialAddress: { street1: '', street2: '' },
  permanentAddress: { street1: '', street2: '' },
  sameAsResidential: false,
  documents: [
    { fileName: '', fileType: '', file: null },
    { fileName: '', fileType: '', file: null }
  ]
};

const CandidateForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    formData,
    errors,
    handleChange,
    handleNestedChange,
    setFormData,
    validateForm
  } = useForm(initialState, validateCandidateForm);

  const handleSameAddress = (e) => {
    const { checked } = e.target;
    setFormData(prev => ({
      ...prev,
      sameAsResidential: checked,
      permanentAddress: checked ? prev.residentialAddress : { street1: '', street2: '' }
    }));
  };

  const handleDocumentChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map((doc, i) => 
        i === index ? { ...doc, [field]: value } : doc
      )
    }));
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const isImageType = file.type.startsWith('image/');
      const isPdfType = file.type === 'application/pdf';
  
      // Check if selected file type matches the selected option
      if (
        (formData.documents[index].fileType === 'image' && !isImageType) ||
        (formData.documents[index].fileType === 'pdf' && !isPdfType)
      ) {
        alert("Please upload a valid file type. Selected type and file type don't match.");
        return;
      }
  
      handleDocumentChange(index, 'file', file);
      handleDocumentChange(index, 'fileName', file.name);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Append basic fields
      Object.keys(formData).forEach(key => {
        if (key !== 'documents' && key !== 'residentialAddress' && 
            key !== 'permanentAddress') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append address fields
      Object.entries(formData.residentialAddress).forEach(([key, value]) => {
        formDataToSend.append(`residentialAddress[${key}]`, value);
      });

      if (!formData.sameAsResidential) {
        Object.entries(formData.permanentAddress).forEach(([key, value]) => {
          formDataToSend.append(`permanentAddress[${key}]`, value);
        });
      }

      // Append documents
      formData.documents.forEach((doc) => {
        formDataToSend.append('documents', doc.file);
      });

      await axios.post('http://localhost:5000/api/candidates', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Form submitted successfully!');
      setFormData(initialState);
    } catch (error) {
      alert('Error submitting form: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          name="firstName"
          required
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          error={errors.firstName}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          required
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          error={errors.lastName}
        />
      </div>

      <FormInput
        label="Email"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
      />

      <FormInput
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        required
        value={formData.dateOfBirth}
        onChange={(e) => handleChange('dateOfBirth', e.target.value)}
        error={errors.dateOfBirth}
      />

      <AddressSection
        title="Residential Address"
        type="residentialAddress"
        address={formData.residentialAddress}
        onChange={handleNestedChange}
        errors={errors}
      />

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.sameAsResidential}
            onChange={handleSameAddress}
            className="mr-2"
          />
          <span>Same as Residential Address</span>
        </label>
      </div>

      {!formData.sameAsResidential && (
        <AddressSection
          title="Permanent Address"
          type="permanentAddress"
          address={formData.permanentAddress}
          onChange={handleNestedChange}
          errors={errors}
        />
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Upload Documents</h3>
        {formData.documents.map((doc, index) => (
          <DocumentUpload
            key={index}
            document={doc}
            index={index}
            onDocumentChange={handleDocumentChange}
            onFileChange={handleFileChange}
            error={errors.documents}
          />
        ))}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default CandidateForm;