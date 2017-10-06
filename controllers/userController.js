const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');
const config = require('../jwtConfig/config');

const authenticator = {
  signUp(req, res) {
    // Create a password salt
    const salt = bcrypt.genSaltSync(10);
    // Salt and hash password
    const passwordToSave = bcrypt.hashSync(req.body.password, salt);
    const password = req.body.password;
    const verifyPassword = req.body.verifyPassword;
<<<<<<< HEAD
    if (password !== verifyPassword) {
      res.send('Password do not match');
    } else {
      models.User.create({
        email: req.body.email,
        password: passwordToSave,
        surname: req.body.surname,
        name: req.body.name,
        phone: req.body.phone
      }).then((user) => {
        const token = jwt.sign({ user: user.email }, config.secret, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
      });
    }
  },
  signIn(req, res) {
    models.User.find({
      where: {
        email: req.body.email
      }
    }).then((user) => {
=======
    // Ensure that the provided passwords matches
    if (password !== verifyPassword) {
      res.send('Password do not match');
    } else {
      // Ensure that the email is not already registered
      models.User.find({ where: { email: req.body.email } }).then((user) => {
        if (user) {
          res.status(200).send({ message: 'Email already registered' });
        } else {
          models.User.create({
            email: req.body.email,
            password: passwordToSave,
            surname: req.body.surname,
            name: req.body.name,
            phone: req.body.phone,
          }).then((user) => {
            const token = jwt.sign({ email: user.email }, config.secret, { expiresIn: 1440 });
            res.status(200).send({ auth: true, token });
          });
        }
      });
    }
  },

  signIn(req, res) {
    models.User.find({ where: { email: req.body.email } }).then((user) => {
>>>>>>> Update on development
      if (!user) {
        res.status(200).send('Invalid Credential');
      }
      // Decrypts password to comparision
      const isValid = bcrypt.compareSync(req.body.password, user.password);
      if (isValid) {
<<<<<<< HEAD
        const token = jwt.sign({ user: user.email }, config.secret, { expiresIn: 86400 });
=======
        const token = jwt.sign({ email: user.email }, config.secret, { expiresIn: 1440 });
>>>>>>> Update on development
        res.status(200).send({ auth: true, token });
      } else {
        res.status(200).send('Invalid Credential');
      }
    });
  },

<<<<<<< HEAD
  signOut(req, res) { res.status(200).send({ auth: false, token: null }); }

};

=======
  signOut(req, res) { res.status(200).send({ auth: false, token: null }); },

  deleteUser(req, res) {
    // Retrieves the User before attempting to delete
    models.User.destroy({ where: { id: req.params.userid } }).then((user) => {
      if (user) {
        // Delete operation successful
        res.status(200).json(true);
      } else {
        // Delete operation fails
        res.status(200).json(false);
      }
    });
  },

  changePassword(req, res) {
    const verifyPassword = req.body.verifyPassword;
    const newPassword = req.body.password;
    const currentPassword = req.body.passwordCurrent;

    // Ensure that the provided passwords matches
    if (newPassword !== verifyPassword) {
      res.send('Password do not match');
    } else {
      // Retrieves User By Id
      models.User.find({
        where: {
          id: req.params.userid,
        },
      }).then((user) => {
        // If no user is found for the given id
        if (user) {
          // Ensure that the user provides the correct current password
          const isValid = bcrypt.compareSync(currentPassword, user.password);
          if (!isValid) {
            res.status(200).send('Current Password incorrect');
          } else {
            // Create a password salt
            const salt = bcrypt.genSaltSync(10);
            // Salt and hash password
            const changedPassword = bcrypt.hashSync(newPassword, salt);

            user.updateAttributes({ password: changedPassword });
            res.status(200).json(true);
          }
        } else {
          res.status(401).send('User not found');
        }
      });
    }
  },
};


>>>>>>> Update on development
module.exports = authenticator;
