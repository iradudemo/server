const express = require('express');
const Contact = require('../models/Contact');
const Articles = require('../models/Articles');
const tokenAuth = require('../controller/tokenMiddleWare');

const router = express.Router();

// get all message of contacts

router.get('/message', tokenAuth, async (req, res) => {
  console.log(req.user);
  const messages = await Contact.find({});
  res.send(messages);
});

// send a message
router.post('/message', async (req, res) => {
  const message = new Contact({
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
  });
  await message.save();
  res.send(message);
});

// get individual message

// router.get('/message/:id', async (req, res) => {
//   try {
//     const message = await Contact.findOne({ _id: req.params.id });
//     res.send(message);
//   } catch {
//     res.status(404);
//     res.send({ error: "Message doesn't exist!" });
//   }
// });

router.get('/article', async (req, res) => {
  console.log(req.user);
  const articles = await Articles.find();
  res.send(articles);
});

router.post('/article', async (req, res) => {
  const article = new Articles({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    date_created: req.body.date_created,
  });
  await article.save();
  res.send(article);
});

router.get('/article/:id', async (req, res) => {
  try {
    const article = await Articles.findOne({ _id: req.params.id });
    res.send(article);
  } catch {
    res.status(404);
    res.send({ error: "Article doesn't exist!" });
  }
});

router.patch('/article/:id', async (req, res) => {
  try {
    const article = await Articles.findOne({ _id: req.params.id });

    if (req.body.title) {
      article.title = req.body.title;
    }

    if (req.body.content) {
      article.content = req.body.content;
    }

    await article.save();
    res.send(article);
  } catch {
    res.status(404);
    res.send({ error: "Article doesn't exist!" });
  }
});

router.delete('/article/:id', async (req, res) => {
  try {
    await Articles.deleteOne({ _id: req.params.id });
    if (res.status(204)) {
      res.send({warning:'article deleted'});
    }
  } catch {
    res.status(404);
    res.send({ error: "Article doesn't exist!" });
  }
});

module.exports = router;
