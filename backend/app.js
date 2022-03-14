const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const routerCard = require('./routes/cards');
const routerUser = require('./routes/users');
const { login, createUser, logout } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error-handler');
const {
  createUserData,
  loginData,
} = require('./middlewares/validatons');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {});

const app = express();

const corsOptions = {
  origin: ['https://ivannizh.nomoredomains.work', 'http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginData, login);
app.post('/signup', createUserData, createUser);
app.post('/signout', logout);

app.use(auth);

app.use('/users', routerUser);
app.use('/cards', routerCard);

app.use((req, res, next) => {
  next(new NotFoundError('Not found'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
