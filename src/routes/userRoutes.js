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
// Edit an user
// router.put('/user/:id', user.edit);
// // delete an user
// router.delete('/user/:id', user.delete);
// // verify token
// router.post('/verify', user.verify);
// // get user info
// router.get('/user/:id', user.getUser);

module.exports = router;
