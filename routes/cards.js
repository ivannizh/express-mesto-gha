const Card = require('../models/card');

function getCards(req, res) {
  Card.find({}).then(
    (cards) => {
      res.send({ data: cards });
    },
  );
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id }).then((card) => {
    res.send(card);
  }).catch((err) => res.status(400).send({message: err.message}));
}

function deleteCard(req, res) {
  Card.findOneAndRemove(req.params.cardId).then((card) => {
    if (card) {
      res.status(200).send({message: 'deleted'});
    } else {
      res.status(400).send({message: 'Card not found'});
    }
  }).catch((err) => res.status(400).send({message: err.message}));
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (card) {
      res.send({card});
    } else {
      res.status(404).send({message: 'Card not found'});
    }
  })
    .catch((err) => res.status(400).send({ message: `${err}` }));
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
    res.status(404).send({message: 'Card not found'});
  }
  })
    .catch((err) => res.status(400).send({ message: `${err}` }));
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
