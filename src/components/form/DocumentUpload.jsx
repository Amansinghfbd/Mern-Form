import FormInput from './FormInput';
import FormSelect from './FormSelect';
import ErrorMessage from '../ui/ErrorMessage';

const DocumentUpload = ({ 
  document, 
  index, 
  onDocumentChange, 
  onFileChange,
  error 
}) => {
  const fileTypes = [
    { value: 'image', label: 'Image' },
    { value: 'pdf', label: 'PDF' }
  ];

  return (
    <div className="border p-4 rounded mb-4">
      <FormInput
        label="File Name"
        required
        value={document.fileName}
        readOnly
      />
      <FormSelect
        label="Type of File"
        required
        options={fileTypes}
        value={document.fileType}
        onChange={(e) => onDocumentChange(index, 'fileType', e.target.value)}
      />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload Document*
        </label>
        <input
          type="file"
          accept={document.fileType === 'image' ? 'image/*' : '.pdf'}
          onChange={(e) => onFileChange(index, e)}
          className="w-full"
        />
      </div>
      <ErrorMessage message={error} />
    </div>
  );
};

export default DocumentUpload;