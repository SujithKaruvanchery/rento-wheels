const { registerOwner, loginOwner, getOwnerProfile, logoutOwner, verifyOwner, updateOwnerProfile, changePassword } = require('../../controllers/ownerControllers');
const { ownerAuth } = require('../../middlewares/ownerAuth');

const ownerRouter = require('express').Router();

ownerRouter.post('/signup', registerOwner);
ownerRouter.post('/login', loginOwner);
ownerRouter.get('/profile', ownerAuth, getOwnerProfile);
ownerRouter.get('/logout', ownerAuth, logoutOwner);
ownerRouter.get('/check', ownerAuth, verifyOwner);
ownerRouter.put('/profile', ownerAuth, updateOwnerProfile);
ownerRouter.put('/change-password', ownerAuth, changePassword);

module.exports = ownerRouter