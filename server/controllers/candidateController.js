const Candidate = require('../models/Candidate');
const { validateDocuments } = require('../utils/validators');
const path = require('path')

const candidateController = {
  async createCandidate(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        residentialAddress,
        permanentAddress,
        sameAsResidential
      } = req.body;

      // Process uploaded documents
      const documents = req.files.map(file => ({
        fileName: file.originalname,
        fileType: path.extname(file.originalname).substring(1),
        filePath: file.path
      }));

      if (!validateDocuments(documents)) {
        return res.status(400).json({ error: 'Minimum two documents are required' });
      }

      const candidate = new Candidate({
        firstName,
        lastName,
        email,
        dateOfBirth,
        residentialAddress,
        permanentAddress: sameAsResidential ? residentialAddress : permanentAddress,
        sameAsResidential,
        documents
      });

      await candidate.save();
      res.status(201).json({
        message: 'Candidate submission successful',
        data: candidate
      });
    } catch (error) {
      next(error);
    }
  },

  async getCandidates(req, res, next) {
    try {
      const candidates = await Candidate.find().select('-documents.filePath');
      res.json({ data: candidates });
    } catch (error) {
      next(error);
    }
  },

  async getCandidate(req, res, next) {
    try {
      const candidate = await Candidate.findById(req.params.id);
      if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
      }
      res.json({ data: candidate });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = candidateController;