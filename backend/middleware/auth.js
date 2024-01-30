// /backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authorizationHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, '192736565850940383654546');
        console.log(token);
        req.user = { userId: decodedToken.userId, email: decodedToken.email };

        next();
    } catch(err) {
        console.log('Error: ', err);
        return res.status(401).json({ message: 'Authentication failed' });
    }
};
