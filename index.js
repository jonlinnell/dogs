require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const permissions = require('./constants/permissions');

const auth = require('./routes/auth');
const bookings = require('./routes/bookings');
const slots = require('./routes/slots');

const User = require('./models/user.model');
const createUser = require('./helpers/auth/createUser');

const { DB_HOST, DB_NAME, DEFAULT_ADMIN_PW } = process.env;

const app = express();

app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/bookings', bookings);
app.use('/slots', slots);

mongoose
  .connect(`mongodb://${DB_HOST}/${DB_NAME}`, { useNewUrlParser: true })
  .then(() => {
    User.find((error, result = []) => {
      if (error) {
        throw error;
      } else if (result.length === 0) {
        console.log('No admin account exists. Creating it based one.');
        createUser({
          username: 'admin',
          password: DEFAULT_ADMIN_PW,
          givenName: 'Admin',
          permissions: permissions.ALL,
        })
          .then(newAdminUser =>
            console.log(
              `Created user ${newAdminUser.username} with id ${
                newAdminUser._id
              }`
            )
          )
          .catch(newUserError => {
            throw new Error(newUserError);
          });
      } else {
        console.log('DB connection established.');
      }
    });
  })
  .catch(err => {
    throw err;
  });

app.listen(3000, () => {
  console.log('Listening...');
});
