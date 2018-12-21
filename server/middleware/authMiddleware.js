import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          status: 403,
          error: 'Invalid token, you have to login first',
        });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      req.user = decoded;
      return next();
    });
  } else {
    res.json({
      status: 403,
      error: 'Unauthorized!, you have to login first',
    });
  }
};

export default authMiddleware;
