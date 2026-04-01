const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

router.post('/api/submissions', submissionController.createSubmission);
router.get('/api/submissions/my', submissionController.getMySubmissions);
router.get('/api/submissions/all', submissionController.getAllSubmissions);
router.get('/api/submissions/stats', submissionController.getStats);

module.exports = router;
