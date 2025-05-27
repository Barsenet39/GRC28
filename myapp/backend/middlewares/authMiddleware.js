// authMiddleware.js
import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; // Attach user information to the request object
    next(); // If the token is valid, proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authenticateUser;
