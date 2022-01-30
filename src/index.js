const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use('/blog', routes);
    app.use('/article', routes);

    app.listen(5000, () => {
      console.log('Server has started');
    });
  })
  .catch((error) => {
    console.log(error);
  });
