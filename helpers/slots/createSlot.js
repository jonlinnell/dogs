const Slot = require('../../models/slot.model');

module.exports = request => new Promise((resolve, reject) => {
  const newSlot = new Slot(request);

  newSlot
    .save((err, result) => (
      err
        ? reject(err)
        : resolve(result)
    ));
});
