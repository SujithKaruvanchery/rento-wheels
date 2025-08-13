const { registerAdmin, loginAdmin, getAdminProfile, logoutAdmin, verifyAdmin, updateAdminProfile, changePassword } = require('../../controllers/adminControllers');
const { adminAuth } = require('../../middlewares/adminAuth');

const adminRouter = require('express').Router();

adminRouter.post('/signup', registerAdmin);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/profile', adminAuth, getAdminProfile);
adminRouter.get('/logout', adminAuth, logoutAdmin);
adminRouter.get('/check', adminAuth, verifyAdmin);
adminRouter.put('/profile', adminAuth, updateAdminProfile);
adminRouter.put('/change-password', adminAuth, changePassword);

module.exports = adminRouter
