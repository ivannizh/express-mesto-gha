const routerCard = require('express').Router();
const {
  dislikeCard, getCards, createCard, likeCard, deleteCard,
} = require('../controllers/cards');

routerCard.get('', getCards);
routerCard.post('', createCard);
routerCard.delete('/:cardId', deleteCard);
routerCard.put('/:cardId/likes', likeCard);
routerCard.delete('/:cardId/likes', dislikeCard);

module.exports = routerCard;
