const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
        const { adminToken } = req.cookies;

        if (!adminToken) {
            return res.status(401).json({ error: 'Authentication required. No token provided.' });
        }

        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

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

module.exports = { adminAuth }
