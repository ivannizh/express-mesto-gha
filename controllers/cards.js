const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

function getCards(req, res, next) {
  Card.find({}).then(
    (cards) => {
      res.send({ data: cards });
    },
  ).catch((err) => {
    next(err);
  });
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id }).then((card) => {
    res.send(card);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      next(BadRequestError('Некорректные данные'));
    } else {
      next(err);
    }
  });
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId).then((card) => {
    if (card) {
      if (card.owner.equals(req.user._id)) {
        Card.findByIdAndDelete(req.params.cardId).then(() => {
          res.status(200).send({ message: 'deleted' });
          return Promise.resolve();
        }).catch((err) => {
          next(err);
        });
      } else {
        next(ForbiddenError('User is not owner'));
      }
    } else {
      next(NotFoundError('Card not found'));
    }
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(BadRequestError('Невалидный id'));
    } else {
      next(err);
    }
  });
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) {
      res.send({ card });
    } else {
      next(NotFoundError('Card not found'));
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
}

function dislikeCard(req, res, next) { //  — убрать лайк с карточки
  Card.findByIdAndUpdate(
    req.params.cardId,
    { pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) {
      res.send({ card });
    } else {
      next(NotFoundError('Card not found'));
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
