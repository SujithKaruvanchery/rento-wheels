const jwt = require('jsonwebtoken');

const ownerAuth = (req, res, next) => {
    try {
        const { ownerToken } = req.cookies;

        if (!ownerToken) {
            return res.status(401).json({ error: 'Authentication required. No token provided.' });
        }

        const decoded = jwt.verify(ownerToken, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token. Authorization denied.' });
        }

        req.user = decoded;
        next();

    } catch (error) {
        console.error("Authentication Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
}

module.exports = { ownerAuth }
