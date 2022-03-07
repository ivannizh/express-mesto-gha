const Card = require('../models/card');

function getCards(req, res) {
  Card.find({}).then(
    (cards) => {
      res.send({ data: cards });
    },
  ).catch((err) => {
    res.status(500).send({ message: `Произошла ошибка ${err}` });
  });
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id }).then((card) => {
    res.send(card);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные' });
    } else {
      res.status(500).send({ message: `Произошла ошибка ${err}` });
    }
  });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId).then((card) => {
    if (card) {
      res.status(200).send({ message: 'deleted' });
    } else {
      res.status(404).send({ message: 'Card not found' });
    }
  }).catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id' });
    } else {
      res.status(500).send({ message: `Произошла ошибка ${err}` });
    }
  });
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) {
      res.send({ card });
    } else {
      res.status(404).send({ message: 'Card not found' });
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

function dislikeCard(req, res) { //  — убрать лайк с карточки
  Card.findByIdAndUpdate(
    req.params.cardId,
    { pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) {
      res.send({ card });
    } else {
      res.status(404).send({ message: 'Card not found' });
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

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
