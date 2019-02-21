const Slot = require('../../models/slot.model');

module.exports = (id, withDetails) =>
  new Promise((resolve, reject) => {
    let query;

    if (id) {
      query = Slot.findById(id);
    } else {
      query = Slot.find();
    }

    if (withDetails) {
      query.populate('bookings');
    }

    query.exec((error, result) => (error ? reject(error) : resolve(result)));
  });
