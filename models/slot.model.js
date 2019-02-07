const mongoose = require('mongoose');

const Slot = mongoose.model('Slot', {
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

module.exports = Slot;
