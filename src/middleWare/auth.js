import jwt from 'jsonwebtoken';

module.exports = function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('provide Valid token');
  } else {
    try {
      const authorized = jwt.verify(token, process.env.SECRET_KEY);
      req.user = authorized;
      next();
    } catch (error) {
      res.status(500).send({ error: 'check your credential' });
    }
  }
};
