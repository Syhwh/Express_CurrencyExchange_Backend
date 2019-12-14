const { Router } = require('express');

const router = Router();
const api = require('../controllers/apiController');
const {
  authenticationVerifier
} = require('../middlewares/authenticationVerifier');

router.post('/api/convert', authenticationVerifier, api.convert);

module.exports = router;
