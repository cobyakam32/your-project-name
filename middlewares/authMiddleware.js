// authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // Assuming the token is sent in the Authorization header

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token not provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
    }

    // Add the decoded user information to the request object for further use in routes
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
