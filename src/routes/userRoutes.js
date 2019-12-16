const { Router } = require('express');

const router = Router();
const user = require('../controllers/userController');
const {
  authenticationVerifier
} = require('../middlewares/authenticationVerifier');

// Create an user
router.post('/register', user.register);
// Login an user
router.post('/login', user.login);
// Logout an user
router.post('/logout', authenticationVerifier, user.logout);

// verify token
router.post('/verify', authenticationVerifier, user.verify);

module.exports = router;
