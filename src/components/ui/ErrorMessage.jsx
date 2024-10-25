const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return <span className="text-red-500 text-sm mt-1">{message}</span>;
  };
  
  export default ErrorMessage;