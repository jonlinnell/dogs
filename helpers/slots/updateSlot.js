const Slot = require('../../models/slot.model');

module.exports = (id, newData) =>
  new Promise((resolve, reject) => {
    Slot.findByIdAndUpdate(id, { $set: { ...newData } }, (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
