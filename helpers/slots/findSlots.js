const Slot = require('../../models/slot.model');

module.exports = id =>
  new Promise((resolve, reject) => {
    if (id) {
      Slot.findById(id, (error, result) =>
        error ? reject(error) : resolve(result)
      );
    } else {
      Slot.find((error, result) => (error ? reject(error) : resolve(result)));
    }
  });
