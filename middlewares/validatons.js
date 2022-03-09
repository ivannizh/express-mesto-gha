const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const bodyValidation = {
  name: Joi.string().min(2).max(30).messages({
    'string.min': 'Минимальная длина поля "name" - 2',
    'string.max': 'Максимальная длина поля "name" - 30',
  }),
  link: Joi.string().custom((value, helpers) => {
    if (validator.isURL(value)) {
      return value;
    }
    return helpers.message('Невалидный link url');
  }),

  about: Joi.string().min(2).max(30).messages({
    'string.min': 'Минимальная длина поля "about" - 2',
    'string.max': 'Максимальная длина поля "about" - 30',
  }),
  avatar: Joi.string().custom((value, helpers) => {
    if (validator.isURL(value)) {
      return value;
    }
    return helpers.message('Невалидный avatar url');
  }),
  email: Joi.string().required().custom((value, helpers) => {
    if (validator.isEmail(value)) {
      return value;
    }
    return helpers.message('Невалидный email');
  }),
  password: Joi.string().required().min(6).messages({
    'string.min': 'Минимальная длина поля "password" - 6',
  }),
};

const paramsValidation = {
  userId: Joi.string().required().custom((value, helpers) => {
    if (ObjectId.isValid(value)) {
      return value;
    }
    return helpers.message('Невалидный id');
  }),
  cardId: Joi.string().required().custom((value, helpers) => {
    if (ObjectId.isValid(value)) {
      return value;
    }
    return helpers.message('Невалидный id');
  }),
};

const createUserData = celebrate({
  body: Joi.object().keys({
    name: bodyValidation.name,
    about: bodyValidation.about,
    avatar: bodyValidation.avatar,
    email: bodyValidation.email,
    password: bodyValidation.password,
  }),
});

const loginData = celebrate({
  body: Joi.object().keys({
    email: bodyValidation.email,
    password: bodyValidation.password,
  }),
});

const getUserByIdData = celebrate({
  params: Joi.object().keys({
    userId: paramsValidation.userId,
  }),
});

const updateAvatarData = celebrate({
  body: Joi.object().keys({
    avatar: bodyValidation.avatar,
  }),
});

const updateUserData = celebrate({
  body: Joi.object().keys({
    name: bodyValidation.name,
    about: bodyValidation.about,
  }),
});

const createCardData = celebrate({
  body: Joi.object().keys({
    name: bodyValidation.name,
    link: bodyValidation.link,
  }),
});

const cardIdInParamsData = celebrate({
  params: Joi.object().keys({
    cardId: paramsValidation.cardId,
  }),
});

// const createUserData = celebrate({
//   params: Joi.object().keys({
//     //валидаторы параметров адреса
//     // в нашем случае это только id
//   }),
//
//   body: Joi.object().keys({
//     //валидаторы данных передаваемых в body
//   }),
//
//   headers: Joi.object().keys({
//     //валидатор заголовка, требуется проверять только
//     //наличие заголовка authorization, в запросов которые требуют авторизации
//   }).unknown(),
// });
//

module.exports = {
  createUserData,
  loginData,
  getUserByIdData,
  updateAvatarData,
  cardIdInParamsData,
  updateUserData,
  createCardData,
};
