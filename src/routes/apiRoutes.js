const { Router } = require('express');

const router = Router();
const api = require('../controllers/apiController');
const {
  authenticationVerifier
} = require('../middlewares/authenticationVerifier');

router.post('/api/convert', authenticationVerifier, api.convert);
router.get('/api/rates', api.getRates);
router.get('/api/me', authenticationVerifier, api.getUserExchanges);
module.exports = router;
