const jwt = require('jsonwebtoken');

const generateToken = (user, role) => {
    try {
        const token = jwt.sign({ id: user._id, role: role }, process.env.JWT_SECRET);
        return token
    } catch (error) {
        console.error("Token Generation Error:", error);
        res.status(500).json({ error: 'Failed to generate authentication token. Please try again later.' });
    }
}

module.exports = { generateToken }