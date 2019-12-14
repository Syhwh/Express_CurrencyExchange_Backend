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
        res.status(401).json({ message: 'Invalid user or password' });
        return;
      }
      const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
        expiresIn: 1000 * 60 * 60
      });
      req.userId = user._id;
      res.status(200).json({ message: 'User logged', token, user });
    } catch (error) {
      res.status(403).send({ error });
    }
  },

  // Logout Request
  async logout(req, res) {
    try {
      req.userId = null;
      res.status(200).json({ message: 'User logged out' });
    } catch (error) {
      res.status(403).send({ error });
    }
  }

  // async getUser(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const user = await User.findOne({ _id: id });
  //     res.status(200).json({ user });
  //   } catch (error) {
  //     res.status(401).json(error.message);
  //   }
  // },
};
