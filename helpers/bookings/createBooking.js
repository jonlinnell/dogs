const Booking = require('../../models/booking.model');

const findSlots = require('../../helpers/slots/findSlots');

module.exports = request =>
  new Promise((resolve, reject) => {
    const newBooking = new Booking(request);

    findSlots(request.slot).then(slot => {
      if (slot) {
        newBooking.save((err, result) => {
          if (err) {
            reject(err);
          } else {
            slot.bookings.push(newBooking._id);
            slot.save(slotSaveErr => {
              if (slotSaveErr) {
                reject(slotSaveErr);
              }
            });
            resolve(result);
          }
        });
      } else {
        reject(Error('No such slot.'));
      }
    });
  });
