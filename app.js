const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerCard = require('./routes/cards');
const routerUser = require('./routes/users');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62235773a75d06577f6b7020',
  };

  next();
});

app.use(routerUser);
app.use(routerCard);

app.use((req, res) => {
  res.status(404);
  res.json({ message: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
