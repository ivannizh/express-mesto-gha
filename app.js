const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routerCard = require('./routes/cards');
const routerUser = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error-handler');
const {
  createUserData,
  loginData,
} = require('./middlewares/validatons');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const app = express();
app.use(logger);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', loginData, login);
app.post('/signup', createUserData, createUser);

app.use(auth);

app.use('/users', routerUser);
app.use('/cards', routerCard);

app.use(errors());
app.use(errorHandler);

app.use((req, res) => {
  res.status(404);
  res.json({ message: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
