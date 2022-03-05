const router = require('express').Router(); // создали роутер
const {
  createUser, getUsers, getUserById, updateAvatar, updateUser,
} = require('./routes/users');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('./routes/cards');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
