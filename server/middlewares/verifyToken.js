const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({
        message: "Un authorized"
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_KEY);


    if (!decoded) {
      return res.status(403).json({ message: "Unauthorized! Token invalid" });
    }

    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(403).json({ message: "Unauthorized! Token invalid" });
  }
}

module.exports = authenticated;
