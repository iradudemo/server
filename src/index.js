//Import using ES6
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import documentation from '../documentation';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config();
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Backend to my brand',
      version: '1.0.0',
      description:
        'This api is the backend of my brand website. I develop it with NodeJs using Mongo database with Mongoose as the ORM. I am using JWT for authentications and Validate form from the user with JOI before they are sent to the server and also i use Bcrypt for hashing passwords stored in the database. and this api can be tested in the postman and mocha',
      contact: {
        name: 'Jean Claude Iradukunda',
      },
      servers: ['http://127.0.0.1:5001'],
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

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
app.use('/docs', swaggerUI.serve, swaggerUI.setup(documentation));

/**
 * @swagger
 * /post:
 *  get:
 *      description: use to request all posts
 *      responses:
 *          '200'
 *
 *
 * components:
 *   schemas:
 *     post:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *
 */

//port connection
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server running on port:${port}`);
});
