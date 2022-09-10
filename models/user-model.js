const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    require: 'Name is Required'
  },
  hashed_password: {
    type: String,
    required: 'Password is Required'
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  bikes: {
    type: [String],
    default: [],
  },
});

UserSchema.methods = {
  authenticate: (plainText) => {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: (password, salt) => {
    if (!password) return ''
    try {
      const userHash = crypto.createHmac('sha256', salt)
                             .update(password)
                             .digest('hex');
      return userHash;
    } catch (err) {
      return ''
    }
  }, 
  makeSalt: () => {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

module.exports = mongoose.model('User', UserSchema);