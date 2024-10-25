const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const upload = require('../config/multer');
const { validateCandidateRequest } = require('../middleware/validateRequest');

router.post(
  '/candidates',
  upload.array('documents', 5),
  validateCandidateRequest,
  candidateController.createCandidate
);

router.get('/candidates', candidateController.getCandidates);
router.get('/candidates/:id', candidateController.getCandidate);

module.exports = router;
