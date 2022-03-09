const routerCard = require('express').Router();
const {
  dislikeCard, getCards, createCard, likeCard, deleteCard,
} = require('../controllers/cards');
const {
  cardIdInParamsData,
  createCardData,
} = require('../middlewares/validatons');

routerCard.get('', getCards);
routerCard.post('', createCardData, createCard);
routerCard.delete('/:cardId', cardIdInParamsData, deleteCard);
routerCard.put('/:cardId/likes', cardIdInParamsData, likeCard);
routerCard.delete('/:cardId/likes', cardIdInParamsData, dislikeCard);

module.exports = routerCard;
