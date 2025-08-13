const userDB = require("../models/userModel");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");

const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingEmail = await userDB.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: 'Email is already registered.' });
        }

        const existingMobile = await userDB.findOne({ mobile });
        if (existingMobile) {
            return res.status(409).json({ error: 'Mobile number is already in use.' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userDB({ name, email, mobile, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User registered successfully.', data: savedUser });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const user = await userDB.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        const token = generateToken(user, "user");

        res.cookie("userToken", token, {
            sameSite: "Lax",
            secure: false,
            httpOnly: true,
        });

        const { password: hashedPassword, ...userData } = user._doc;

        res.status(200).json({ message: 'Login successful.', data: userData });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userDB.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        res.status(200).json({ message: 'Profile fetched successfully.', data: user });
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const logoutUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userDB.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        res.clearCookie('userToken', {
            sameSite: "Lax",
            secure: false,
            httpOnly: true,
        });

        res.status(200).json({ message: 'Logged out successfully.', data: user });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const verifyUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userDB.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (!user.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        res.status(200).json({ message: 'User verified successfully.', data: user });
    } catch (error) {
        console.error("Verify Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, mobile, email } = req.body;

        if (!name && !mobile && !email) {
            return res.status(400).json({ error: "Nothing to update." });
        }

        const updateFields = {};
        if (name) updateFields.name = name;

        if (mobile) {
            const existingMobileUser = await userDB.findOne({ mobile });
            if (existingMobileUser && existingMobileUser._id.toString() !== userId) {
                return res.status(409).json({ error: "Mobile number is already in use." });
            }
            updateFields.mobile = mobile;
        }

        if (email) {
            const existingEmailUser = await userDB.findOne({ email: email.toLowerCase() });
            if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
                return res.status(409).json({ error: "Email is already in use." });
            }
            updateFields.email = email.toLowerCase();
        }

        const updatedUser = await userDB.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true, context: 'query' }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ message: "Profile updated successfully.", data: updatedUser });

    } catch (error) {
        console.error("Update Profile Error:", error.message);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}

const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Current and new passwords are required." });
        }

        const user = await userDB.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Current password is incorrect." });
        }

        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
        console.error("Change Password Error:", error.message);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
    verifyUser,
    updateUserProfile,
    changePassword
};
