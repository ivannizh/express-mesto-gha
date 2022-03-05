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

  Card.create({ name, link, owner: req.user._id }).then(() => {
    res.sendStatus(200);
  });
}

function deleteCard(req, res) {
  Card.findOneAndRemove(req.params.cardId).then(() => {
    res.sendStatus(200);
  });
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    res.send({ card });
  });
}

function dislikeCard(req, res) { //  — убрать лайк с карточки
  Card.findByIdAndUpdate(
    req.params.cardId,
    { pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    res.send({ card });
  });
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
