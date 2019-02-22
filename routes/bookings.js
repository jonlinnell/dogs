const router = require('express').Router();

const createBooking = require('../helpers/bookings/createBooking');
const deleteBooking = require('../helpers/bookings/deleteBooking');
const findBookings = require('../helpers/bookings/findBookings');
const findBookingsBySlot = require('../helpers/bookings/findBookingsBySlot');
const findBookingByField = require('../helpers/bookings/findBookingByField');

const verifyToken = require('../helpers/auth/verifyToken');

router.post('/', (req, res) =>
  createBooking(req.body)
    .then(result => res.send(result))
    .catch(error => res.status(500).send(error))
);

router.get('/', (req, res) =>
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
