const routerCard = require('express').Router();
const {
  dislikeCard, getCards, createCard, likeCard, deleteCard,
} = require('../controllers/cards');

routerCard.get('/cards', getCards);
routerCard.post('/cards', createCard);
routerCard.delete('/cards/:cardId', deleteCard);
routerCard.put('/cards/:cardId/likes', likeCard);
routerCard.delete('/cards/:cardId/likes', dislikeCard);

module.exports = routerCard;
