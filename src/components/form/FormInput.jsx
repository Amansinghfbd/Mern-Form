import ErrorMessage from '../ui/ErrorMessage';

const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  error, 
  required = false,
  ...props 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}{required && '*'}
      </label>
      <input
        type={type}
        name={name}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2
          focus:ring-blue-500"
        {...props}
      />
      <ErrorMessage message={error} />
    </div>
  );
};

export default FormInput;