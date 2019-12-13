const jwt = require('jsonwebtoken');

module.exports = {
  authenticationVerifier(req, res, next) {
    if (req.headers.authorization) {
      try {
        const authorization = req.headers.authorization.split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).send({
            error: 'Bad token provided'
          });
        }
        req.jwt = jwt.verify(authorization[1], process.env.JWTSECRET);
        return next();
      } catch (err) {
        return res.status(403).send({
          error: 'Unvalid token provided'
        });
      }
    } else {
      return res.status(401).send({
        error: 'No token provided'
      });
    }
  }
};
