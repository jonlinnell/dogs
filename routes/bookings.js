const router = require('express').Router();

const createBooking = require('../helpers/bookings/createBooking');

router.post('/', (req, res) =>
  createBooking(req.body)
    .then(message => res.send(message))
    .catch(error => res.status(500).send(error))
);

module.exports = router;
