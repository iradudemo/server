import message from '../models/contactModel';
import { contactFormValidation } from '../validation/contactform';
import User from '../models/userModel';

class ContactController {
  static sendMessage = async (req, res) => {
    const { error } = contactFormValidation(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const ContactMessage = new message({
        name: req.body.name.trim(),
        email: req.body.email.trim(),
        message: req.body.message.trim(),
      });
      await ContactMessage.save();
      res.status(200).send(ContactMessage);
    }
  };

  // view single messages

  static readSingleMessage = async (req, res) => {
    //check if is admin
    let userId = req.user.id;
    const loggedUser = await User.findById(userId);
    const userRole = loggedUser.userRole;

    if (userRole == 'user')
      return res.status(401).send("Access denied! you're not authorized");
    try {
      const ContactMessage = await message.findById(req.params.id);
      res
        .status(200)
        .json({ message: 'Message recieved succesfuly!', ContactMessage });
    } catch {
      res.status(404).send('message not found');
    }
  };

  // liste of all messages

  static readAllMessage = async (req, res) => {
    //verify if users is admin
    let userId = req.user.id;
    const loggedUser = await User.findById(userId);
    const userRole = loggedUser.userRole;

    if (userRole == 'user') return res.status(401).send('Access denied!');

    try {
      const ContactMessage = await message.find();
      res.status(200).send({ ContactMessage });
    } catch {
      res.status(404).send('message not found');
    }
  };

  //deleting a post

  static dropMessage = async (req, res) => {
    //check if is admin
    let userId = req.user.id;
    const loggedUser = await User.findById(userId);
    const userRole = loggedUser.userRole;
    if (userRole == 'user') return res.status(401).send('Access denied!');

    const ContactMessage = message.findOne({ _id: req.params.id });
    try {
      if (!ContactMessage) {
        res.send({ message: 'Message not found' });
      } else {
        await ContactMessage.remove();
        res.status(200).send('message deleted successfully');
      }
    } catch {
      res.status(404).send('message not found');
    }
  };
}

export default ContactController;
