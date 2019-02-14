const Slot = require('../../models/slot.model');

module.exports = id =>
  new Promise((resolve, reject) =>
    Slot.findByIdAndDelete(id, (error, result) =>
      error ? reject(error) : resolve(result)
    )
  );
