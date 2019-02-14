const mongoose = require('mongoose');

const permissions = Object.values(require('../constants/permissions.js'));

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  givenName: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    enum: permissions,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = User;
