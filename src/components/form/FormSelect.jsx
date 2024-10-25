import ErrorMessage from '../ui/ErrorMessage';

const FormSelect = ({ 
  label, 
  name, 
  options, 
  error, 
  required = false,
  ...props 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}{required && '*'}
      </label>
      <select
        name={name}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2
          focus:ring-blue-500"
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage message={error} />
    </div>
  );
};

export default FormSelect;