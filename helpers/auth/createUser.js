const bcrypt = require('bcrypt');

const User = require('../../models/user.model');

module.exports = newUserDetails =>
  new Promise((resolve, reject) => {
    const newUser = new User(
      Object.assign({}, newUserDetails, {
        password: bcrypt.hashSync(newUserDetails.password, 5),
      })
    );

    newUser.save((error, result) => (error ? reject(error) : resolve(result)));
  });
