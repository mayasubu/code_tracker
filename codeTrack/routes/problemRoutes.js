const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');

router.get('/api/problems', problemController.getAllProblems);
router.get('/api/problems/:id', problemController.getProblem);
router.post('/api/problems', problemController.createProblem);
router.put('/api/problems/:id', problemController.updateProblem);
router.delete('/api/problems/:id', problemController.deleteProblem);

module.exports = router;
