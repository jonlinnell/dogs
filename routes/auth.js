const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const User = require('../models/user.model');

const verifyToken = require('../helpers/auth/verifyToken');

const { SECRET } = process.env;

router.get('/me', verifyToken, (req, res) => {
  console.log(req.user);
  User.findById(
    req.user.id,
    'username permissions givenName',
    (error, result) => (error ? res.status(500).send(error) : res.send(result))
  );
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (error, existingUser) => {
    if (!existingUser) {
      res.status(400).json({
        authorised: false,
        type: 'username',
        message: 'User does not exist.',
      });
    } else if (bcrypt.compareSync(password, existingUser.password)) {
      jwt.sign(
        {
          username,
          permissions: existingUser.permissions,
        },
        SECRET,
        {
          expiresIn: '12H',
        },
        (err, token) => res.json({ authorised: true, token })
      );
    } else {
      res.status(403).json({
        authorised: false,
        type: 'password',
        message: 'Password incorrect.',
      });
    }
  });
});

module.exports = router;
