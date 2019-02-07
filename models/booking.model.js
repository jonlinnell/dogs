const mongoose = require('mongoose');

const Booking = mongoose.model('Booking', {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return /.+@(student\.)?lboro\.ac\.uk/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`,
    },
    unique: true,
  },
  slot: {
    type: String,
    required: true,
  },
});

module.exports = Booking;
