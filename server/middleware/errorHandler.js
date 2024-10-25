const multer = require('multer');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        error: 'File upload error',
        message: err.message
      });
    }
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        message: err.message
      });
    }
  
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  };
  
  module.exports = errorHandler;