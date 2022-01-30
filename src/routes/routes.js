const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// get all message of contacts

router.get('/message', async (req, res) => {
  const messages = await Contact.find();
  res.send(messages);
});
module.exports = router;

// send a message
router.post('/message', async (req, res) => {
  const message = new Contact({
    names: req.body.name,
    email: req.body.email,
    content: req.body.content,
  });
  await message.save();
  res.send(message);
});

// get individual message

router.get("/message/:id", async (req, res) => {
	try {
		const message = await Contact.findOne({ _id: req.params.id })
		res.send(message)
	} catch {
		res.status(404)
		res.send({ error: "message doesn't exist!" })
  }
})


