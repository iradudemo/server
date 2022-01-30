const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
// const dotenv = require('dotenv');

// dotenv.config();

mongoose.connect('mongodb+srv://claude-db:claude@cluster0.uqtac.mongodb.net/firstMongoDb?retryWrites=true&w=majority', { useNewUrlParser: true }).then(()=>{
    
    const app = express();
    app.use(express.json())
    app.use("/blog",routes)
    
    app.listen(5000, () => {
      console.log('Server has started');
    });
});

