const Slot = require('../../models/slot.model');

module.exports = id =>
  new Promise((resolve, reject) => {
    if (id) {
      Slot.findById(id)
        .populate('bookings')
        .exec((error, result) => (error ? reject(error) : resolve(result)));
    } else {
      Slot.find()
        .populate('bookings')
        .exec((error, result) => (error ? reject(error) : resolve(result)));
    }
  });
