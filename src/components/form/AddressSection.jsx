import FormInput from './FormInput';

const AddressSection = ({ 
  title, 
  type, 
  address, 
  onChange, 
  errors 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <FormInput
        label="Street 1"
        required
        value={address.street1}
        onChange={(e) => onChange(type, 'street1', e.target.value)}
        error={errors[`${type}Street1`]}
      />
      <FormInput
        label="Street 2"
        required
        value={address.street2}
        onChange={(e) => onChange(type, 'street2', e.target.value)}
        error={errors[`${type}Street2`]}
      />
    </div>
  );
};

export default AddressSection;