require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const slots = require('./routes/slots');
const bookings = require('./routes/bookings');

const app = express();

app.use(bodyParser.json());

app.use('/slots', slots);
app.use('/bookings', bookings);

mongoose.connect('mongodb://localhost/slotbook', { useNewUrlParser: true })
  .then(() => console.log('DB connection established.'))
  .catch((err) => { throw err; });

app.listen(3000, () => { console.log('Listening...'); });
