const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  let token = req.header('x-auth-token');

  // Also support standard Authorization header with Bearer scheme
  const authHeader = req.header('Authorization');
  if (!token && authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7); // Remove 'Bearer ' prefix
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ success: false, error: 'Token is not valid' });
  }
};

module.exports = auth;