const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/api/auth/login', authController.postLogin);
router.post('/api/auth/register', authController.postRegister);
router.post('/api/auth/logout', authController.logout);
router.get('/api/auth/session', authController.getSession);

module.exports = router;
