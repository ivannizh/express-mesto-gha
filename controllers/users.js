const validator = require('validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

function createUser(req, res) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!validator.isEmail(email)) {
    res.status(400).send({ message: 'Wrong email validation' });
    return;
  }

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, hash,
    })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: 'Некорректные данные' });
        } else {
          res.status(500).send({ message: `Произошла ошибка ${err}` });
        }
      });
  });
}

function login(req, res) {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      res.send({ message: 'Всё верно!' });
      const token = jwt.sign(
        { _id: req.user._id },
        'some-secret-key',
        { expiresIn: '7d', httpOnly: true },
      );
      res.send({ token });
      return Promise.resolve();
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
}

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
}

function getUserById(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id' });
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}` });
      }
    });
}

function updateAvatar(req, res) {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}` });
      }
    });
}

function updateUser(req, res) {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}` });
      }
    });
}

module.exports = {
  createUser, getUsers, getUserById, updateAvatar, updateUser, login,
};
