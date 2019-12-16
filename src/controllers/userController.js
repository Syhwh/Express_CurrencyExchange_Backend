/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../database/models/userSchema');
const { getDataForm } = require('../utils/getUserDataForm');

// const CurrencyRate = require('../database/models/currencyRateSchemma');

module.exports = {
  // register a new user
  async register(req, res) {
    const userData = getDataForm(req.body);
    try {
      const user = await User.create(userData);
      const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
        expiresIn: 1000 * 60 * 60
      });
      res.status(200).json({ message: 'User Created', token });
    } catch (error) {
      res.status(403).json({ error });
    }
  },
  // login an user
  async login(req, res) {
    try {
      const user = await User.authenticate(
        req.body.userEmail,
        req.body.userPassword
      );
      if (!user) {
        res.status(401).json({ error: 'Invalid user or password' });
        return;
      }
      const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
        expiresIn: 1000 * 60 * 60
      });
      req.userId = user._id;
      res.status(200).json({ message: 'User logged', token, user });
    } catch (error) {
      res.status(403).json({ error });
    }
  },

  // Logout Request
  logout(req, res) {
    try {
      req.userId = null;
      res.status(200).json({ message: 'User logged out' });
    } catch (error) {
      res.status(403).json({ error });
    }
  },
  // verify token
  async verify(req, res) {
    if (req.headers.authorization) {
      try {
        const authorization = req.headers.authorization.split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).send({
            error: 'Bad token provided'
          });
        }
        const decoded = jwt.verify(authorization[1], process.env.JWTSECRET);
        return res.status(200).send(decoded.id);
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

// async getUser(req, res) {
//   const { id } = req.params;
//   try {
//     const user = await User.findOne({ _id: id });
//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(401).json(error.message);
//   }
// },
