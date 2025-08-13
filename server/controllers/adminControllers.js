const adminDB = require("../models/adminModel")
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");

const registerAdmin = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingEmail = await adminDB.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: 'Email is already registered.' });
        }

        const existingMobile = await adminDB.findOne({ mobile });
        if (existingMobile) {
            return res.status(409).json({ error: 'Mobile number is already in use.' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new adminDB({ name, email, mobile, password: hashedPassword });
        const savedAdmin = await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully.', data: savedAdmin });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const admin = await adminDB.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        if (!admin.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        const token = generateToken(admin, "admin");

        res.cookie("adminToken", token, {
            sameSite: "Lax",
            secure: false,
            httpOnly: true,
        });

        const { password: hashedPassword, ...adminData } = admin._doc;

        res.status(200).json({ message: 'Login successful.', data: adminData });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const getAdminProfile = async (req, res) => {
    try {
        const adminId = req.user.id;

        const admin = await adminDB.findById(adminId).select('-password');

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }

        if (!admin.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        res.status(200).json({ message: 'Profile fetched successfully.', data: admin });
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const logoutAdmin = async (req, res) => {
    try {
        const adminId = req.user.id;

        const admin = await adminDB.findById(adminId).select('-password');

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }

        if (!admin.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        res.clearCookie('adminToken', {
            sameSite: "Lax",
            secure: false,
            httpOnly: true,
        });

        res.status(200).json({ message: 'Logged out successfully.', data: admin });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const verifyAdmin = async (req, res) => {
    try {
        const adminId = req.user.id;

        const admin = await adminDB.findById(adminId);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }

        if (!admin.isActive) {
            return res.status(403).json({ error: 'Your account is inactive.' });
        }

        res.status(200).json({ message: 'Admin verified successfully.', data: admin });
    } catch (error) {
        console.error("Verify Error:", error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

const updateAdminProfile = async (req, res) => {
    try {
        const adminId = req.user.id;
        const { name, mobile, email } = req.body;

        if (!name && !mobile && !email) {
            return res.status(400).json({ error: "Nothing to update." });
        }

        const updateFields = {};
        if (name) updateFields.name = name;

        if (mobile) {
            const existingMobileAdmin = await adminDB.findOne({ mobile });
            if (existingMobileAdmin && existingMobileAdmin._id.toString() !== adminId) {
                return res.status(409).json({ error: "Mobile number is already in use." });
            }
            updateFields.mobile = mobile;
        }

        if (email) {
            const existingEmailAdmin = await adminDB.findOne({ email: email.toLowerCase() });
            if (existingEmailAdmin && existingEmailAdmin._id.toString() !== adminId) {
                return res.status(409).json({ error: "Email is already in use." });
            }
            updateFields.email = email.toLowerCase();
        }

        const updatedAdmin = await adminDB.findByIdAndUpdate(
            adminId,
            { $set: updateFields },
            { new: true, runValidators: true, context: 'query' }
        ).select("-password");

        if (!updatedAdmin) {
            return res.status(404).json({ error: "Admin not found." });
        }

        res.status(200).json({ message: "Profile updated successfully.", data: updatedAdmin });

    } catch (error) {
        console.error("Update Profile Error:", error.message);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}


const changePassword = async (req, res) => {
    try {
        const adminId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Current and new passwords are required." });
        }

        const admin = await adminDB.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found." });
        }

        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Current password is incorrect." });
        }

        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        admin.password = hashedNewPassword;
        await admin.save();

        res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
        console.error("Change Password Error:", error.message);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    logoutAdmin,
    verifyAdmin,
    updateAdminProfile,
    changePassword
}