/* eslint-disable no-console */
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const mongoose = require('mongoose');

const permissions = require('./constants/permissions');

const auth = require('./routes/auth');
const bookings = require('./routes/bookings');
const slots = require('./routes/slots');

const User = require('./models/user.model');
const createUser = require('./helpers/auth/createUser');

const {
  DB_HOST,
  DB_NAME,
  DEFAULT_ADMIN_PW,
  NODE_ENV = 'development',
  SSL_KEY,
  SSL_CERT,
} = process.env;

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
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
      return false;
    });
  })
  .catch(err => {
    throw err;
  });

let server;

if (NODE_ENV === 'production') {
  server = https.createServer(
    {
      key: fs.readFileSync(SSL_KEY, 'utf-8'),
      cert: fs.readFileSync(SSL_CERT, 'utf-8'),
    },
    app
  );
} else {
  server = http.createServer(app);
}

server.listen(port);
server.once('listening', () => {
  console.log(`Listening on ${port} in ${NODE_ENV} mode.`);
});
