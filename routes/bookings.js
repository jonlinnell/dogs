const router = require('express').Router();

const createBooking = require('../helpers/bookings/createBooking');
const deleteBooking = require('../helpers/bookings/deleteBooking');
const findBookings = require('../helpers/bookings/findBookings');
const findBookingsBySlot = require('../helpers/bookings/findBookingsBySlot');
const findBookingByField = require('../helpers/bookings/findBookingByField');

const sendEmail = require('../helpers/email/sendEmail');

const verifyToken = require('../helpers/auth/verifyToken');

router.post('/', (req, res) =>
  createBooking(req.body)
    .then(result => {
      const { name, email, slot } = result;

      if (process.env.AWS_ACCESS_KEY_ID) {
        sendEmail({ name, email, slot })
          .then(data =>
            console.log(
              `Sent email to ${email}. MessageId: ${data.MessageId}\n`
            )
          )
          .catch(error => console.error(error));
      }

      res.send(result);
    })
    .catch(error => res.status(500).send(error))
);

router.get('/', verifyToken, (req, res) =>
  findBookings()
    .then(result => res.send(result))
    .catch(error => res.status(500).send(error))
);

router.get('/byEmail/:email', (req, res) =>
  findBookingByField('email', req.params.email, true)
    .then(result => res.send(result))
    .catch(error => res.status(500).send(error))
);

router.get('/:id', (req, res) =>
  findBookingByField('_id', req.params.id)
    .then(result => res.send(result))
    .catch(error => res.status(500).send(error))
);

router.get('/slot/:slotId', (req, res) =>
  findBookingsBySlot(req.params.slotId)
    .then(result => res.send(result))
    .catch(error => res.status(500).send(error))
);

router.delete('/:id', verifyToken, (req, res) =>
  deleteBooking(req.params.id)
    .then(result => res.send(result))
    .catch(error => res.status(500).send(error))
);

module.exports = router;
