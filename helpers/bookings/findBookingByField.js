const Booking = require('../../models/booking.model');

module.exports = (field, value, caseInsensitive) =>
  new Promise((resolve, reject) => {
    let condition;

    if (caseInsensitive) {
      const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      condition = { $regex: new RegExp(escapedValue, 'i') };
    } else {
      condition = { $eq: value };
    }

    Booking.find({ [field]: condition })
      .populate('slot')
      .exec((error, result) => (error ? reject(error) : resolve(result[0])));
  });
