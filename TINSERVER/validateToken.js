const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
      });
}

module.exports = { validateToken }