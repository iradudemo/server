//Import using ES6
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import documentation from '../documentation';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config();
const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My-Blog Api',
      version: '1.0.0',
      description:
        'My-Blog api is background engine for my portfolio website. it runs on NodeJs using MongoDB as database with Mongoose as the ORM. I am using JWT for handling authentications and JOI for Validating inputs from the user before they are sent to the server and Bcrypt for hashing passwords stored in the database.',
    },
    servers: [
      {
        url: 'http://127.0.0.1:5000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJsDoc(options);

// Import Routes

const contact = require('./routes/routes');
const article = require('./routes/routes');
const user = require('./routes/routes');

//Database connection
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db successfull conected');
  })
  .catch((error) => {
    console.log(error);
  });

// Route
app.use(express.json());
app.use('/api', contact);
app.use('/api', article);
app.use('/api', user);
app.use('/', swaggerUI.serve, swaggerUI.setup(documentation));

//port connection
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port:${port}`);
});
