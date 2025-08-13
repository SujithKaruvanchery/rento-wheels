const ownerDB = require("../models/ownerModel")
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");

const registerOwner = async (req, res) => {
    try {
        const { name, email, mobile, password, companyName, location } = req.body;

        if (!name || !email || !mobile || !password || !companyName || !location) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingEmail = await ownerDB.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: 'Email is already registered.' });
        }

        const existingMobile = await ownerDB.findOne({ mobile });
        if (existingMobile) {
            return res.status(409).json({ error: 'Mobile number is already in use.' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newOwner = new ownerDB({ name, email, mobile, password: hashedPassword, companyName, location });
        const savedOwner = await newOwner.save();

        res.status(201).json({ message: 'Owner registered successfully.', data: savedOwner });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const loginOwner = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const owner = await ownerDB.findOne({ email });
        if (!owner) {
            return res.status(404).json({ error: 'Owner not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, owner.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        if (!owner.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        const token = generateToken(owner, "owner");

        res.cookie("ownerToken", token, {
            sameSite: "Lax",
            secure: false,
            httpOnly: true,
        });

        const { password: hashedPassword, ...ownerData } = owner._doc;

        res.status(200).json({ message: 'Login successful.', data: ownerData });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const getOwnerProfile = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const owner = await ownerDB.findById(ownerId).select('-password');

        if (!owner) {
            return res.status(404).json({ error: 'Owner not found.' });
        }

        if (!owner.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        res.status(200).json({ message: 'Profile fetched successfully.', data: owner });
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const logoutOwner = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const owner = await ownerDB.findById(ownerId).select('-password');

        if (!owner) {
            return res.status(404).json({ error: 'Owner not found.' });
        }

        if (!owner.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        res.clearCookie('ownerToken', {
            sameSite: "Lax",
            secure: false,
            httpOnly: true,
        });

        res.status(200).json({ message: 'Logged out successfully.', data: owner });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const verifyOwner = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const owner = await ownerDB.findById(ownerId);

        if (!owner) {
            return res.status(404).json({ error: 'Owner not found.' });
        }

        if (!owner.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        res.status(200).json({ message: 'Owner verified successfully.', data: owner });
    } catch (error) {
        console.error("Verify Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const updateOwnerProfile = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const { name, mobile, email, companyName, location } = req.body;

        if (!name && !mobile && !email && !companyName && !location) {
            return res.status(400).json({ error: "Nothing to update." });
        }

        const updateFields = {};
        if (name) updateFields.name = name;
        if (companyName) updateFields.companyName = companyName;
        if (location) updateFields.location = location;
        if (mobile) updateFields.mobile = mobile;

        if (mobile) {
            const existingMobileOwner = await ownerDB.findOne({ mobile });
            if (existingMobileOwner && existingMobileOwner._id.toString() !== ownerId) {
                return res.status(409).json({ error: "Mobile number is already in use." });
            }
        }

        if (email) {
            const existingEmailOwner = await ownerDB.findOne({ email });
            if (existingEmailOwner && existingEmailOwner._id.toString() !== ownerId) {
                return res.status(409).json({ error: "Email is already in use." });
            }
            updateFields.email = email.toLowerCase();
        }

        const updatedOwner = await ownerDB.findByIdAndUpdate(
            ownerId,
            { $set: updateFields },
            { new: true, runValidators: true, context: 'query' }
        ).select("-password");

        if (!updatedOwner) {
            return res.status(404).json({ error: "Owner not found." });
        }

        res.status(200).json({ message: "Profile updated successfully.", data: updatedOwner });

    } catch (error) {
        console.error("Update Owner Profile Error:", error.message);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const changePassword = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Current and new passwords are required." });
        }

        const owner = await ownerDB.findById(ownerId);
        if (!owner) {
            return res.status(404).json({ error: "Owner not found." });
        }

        const isMatch = await bcrypt.compare(currentPassword, owner.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Current password is incorrect." });
        }

        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        owner.password = hashedNewPassword;
        await owner.save();

        res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
        console.error("Change Password Error:", error.message);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

module.exports = {
    registerOwner,
    loginOwner,
    getOwnerProfile,
    logoutOwner,
    verifyOwner,
    updateOwnerProfile,
    changePassword
}