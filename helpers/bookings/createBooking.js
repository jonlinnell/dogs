const Booking = require('../../models/booking.model');

const findSlots = require('../../helpers/slots/findSlots');
const findBookings = require('../../helpers/bookings/findBookings');

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
            findBookings(newBooking._id)
              .then(populatedNewBooking => resolve(populatedNewBooking))
              .catch(newBookingError => reject(newBookingError));
          }
        });
      } else {
        reject(Error('No such slot.'));
      }
    });
  });
