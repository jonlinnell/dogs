const jwt = require('jsonwebtoken');

const User = require('../../models/user.model');

const { SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res
      .status(400)
      .json({ message: 'No token provided. Remember to set x-access-token.' });
  } else {
    jwt.verify(token, SECRET, (error, decodedToken) => {
      if (error) {
        res.status(403).json({ message: 'Invalid token provided.' });
      } else {
        User.findOne({ username: decodedToken.username })
          .then(existingUser => {
            if (existingUser) {
              req.user = {
                id: existingUser._id,
                username: decodedToken.username,
                permissions: existingUser.permissions,
              };

              next();
            } else {
              res.status(403).json({
                message: 'This token is for a user that does not exist.',
              });
            }
          })
          .catch(existingUserError =>
            res.status(500).json({ message: existingUserError })
          );
      }
    });
  }
};
