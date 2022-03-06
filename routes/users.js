const User = require('../models/user');

function createUser(req, res) {
  const { name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(400).send({message: err.message});
    });
}

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({data: users}))
    .catch((err) => res.status(500).send({message: `Произошла ошибка ${err}`}));
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
    .catch((err) => res.status(400).send({ message: `${err}` }));
}

function updateAvatar(req, res) {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `${err}` }));
}

function updateUser(req, res) {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `${err}` }));
}

module.exports = {
  createUser, getUsers, getUserById, updateAvatar, updateUser,
};
