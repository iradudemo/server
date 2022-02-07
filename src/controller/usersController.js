import User from '../models/userModel';
import { validateRegister, validateLogin } from '../validation/userValidation';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserController {
  // Create user Controller
  static createUser = async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const emailValidation = await User.findOne({ email: req.body.email });
      try {
        if (emailValidation) {
          res.send('user exist');
        } else {
          await user.save();
          res.status(200).send(user);
        }
      } catch (error) {
        res.status(500).send('server error', error);
      }
    }
  };

  // login controller

  static login = async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const email = req.body.email;
    const user = await User.findOne({ email: email });
    // res.send(user)
    if (!user) {
      return res.send('user not found');
    }

    try {
      const password = user.password;
      if (await bcrypt.compare(req.body.password, password)) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

        const userRole = user.userRole;
        if (userRole == 'admin')
          return res.set('auth-token', token).send({'token':token});
        if (userRole == 'user') {
          return res
            .set('auth-token', token)
            .send({'token':token});
        }

        //admin validation
      } else {
        res.send('not allowed');
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  static findAllUsers = async (req, res) => {
    let userId = req.user.id;
    const loggedUser = await User.findById(userId);
    const userRole = loggedUser.userRole;
    if (userRole == 'user')
      return res.status(401).send('Only admin can view the users');

    const user = await User.find();
    res.send(user);
  };
}
export default UserController;
