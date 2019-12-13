const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  userName: {
    type: String
  },
  userEmail: {
    type: String,
    unique: true,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  termsAndConditios: {
    type: Boolean,
    default: true,
    require: true
  },
  image: []
});
// validate unique email
UserSchema.plugin(uniqueValidator);

// Encrypt the password
UserSchema.pre('save', function encrypt(next) {
  bcrypt.hash(this.userPassword, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.userPassword = hash;
    return next();
  });
});

// verify that the user exists and the password is correct
UserSchema.statics.authenticate = async (email, password) => {
  const user = await mongoose.model('User').findOne({ userEmail: email });
  if (user) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.userPassword, (err, result) => {
        if (err) reject(err);
        resolve(result === true ? user : null);
      });
    });
  }
  return null;
};

module.exports = mongoose.model('User', UserSchema);
