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
      if (!user) {
        res.status(200).send('Invalid Credential');
      }
      // Decrypts password to comparision
      const isValid = bcrypt.compareSync(req.body.password, user.password);
      if (isValid) {
        const token = jwt.sign({ user: user.email }, config.secret, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
      } else {
        res.status(200).send('Invalid Credential');
      }
    });
  },

  signOut(req, res) { res.status(200).send({ auth: false, token: null }); }

};

module.exports = authenticator;
