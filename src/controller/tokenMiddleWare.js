var jwt = require('jsonwebtoken');

const tokenMiddleWare = (req, res, next) => {
  if (req.body.token) {
    const token = req.body.token;
    try {
      var tokenData = jwt.verify(token, 'myScret');
      req.user = tokenData;
      next();
    } catch (err) {
      return res.send('invalid Token!');
    }
  } else {
    return res.send('Provide Token!');
  }
};

module.exports = tokenMiddleWare;
