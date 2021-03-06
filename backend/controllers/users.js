const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictRequestError = require('../errors/conflict-request-error');
const UnauthorizedRequestError = require('../errors/unauthorized-request-error');

const JWT_KEY = 'jwt';
const JWT_OPTIONS = {
  maxAge: 3600000,
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  domain: '.ivannizh.nomoredomains.work',
};
function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!validator.isEmail(email)) {
    next(new BadRequestError('Wrong email validation'));
    return;
  }

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then(({ _id }) => {
        User.findById(_id)
          .then((user) => {
            if (!user) {
              return Promise.reject(new Error('Internal error'));
            }
            res.send(user);
            return Promise.resolve();
          })
          .catch((err) => Promise.reject(err));
        return Promise.resolve();
      })
      .catch((err) => {
        if (err.name === 'MongoServerError' && err.code === 11000) {
          next(new ConflictRequestError('Email уже существует'));
          return;
        }
        if (err.name === 'ValidationError') {
          next(new BadRequestError(`Некорректные данные ${err}`));
        } else {
          next(err);
        }
      });
  });
}

function logout(req, res, next) {
  res.clearCookie(JWT_KEY, JWT_OPTIONS);
  res.end();
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return { matched: bcrypt.compare(password, user.password), user };
    })
    .then(({ matched, user }) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign(
        { _id: user._id },
        process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie(JWT_KEY, token, JWT_OPTIONS);
      res.status(200).send({ message: 'success' });
      return Promise.resolve();
    })
    .catch((err) => {
      next(new UnauthorizedRequestError(err.message));
    });
}

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
}

function getUserById(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        next(new NotFoundError('User not found'));
      }
      return Promise.resolve();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
}

function getMe(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        next(new NotFoundError('User not found'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
}

function updateAvatar(req, res, next) {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Некорректные данные ${err}`));
      } else {
        next(err);
      }
    });
}

function updateUser(req, res, next) {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  createUser, getUsers, getUserById, updateAvatar, updateUser, login, getMe, logout,
};
