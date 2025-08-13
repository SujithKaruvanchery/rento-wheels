const { registerUser, loginUser, getUserProfile, logoutUser, verifyUser, updateUserProfile, changePassword } = require('../../controllers/userControllers');
const { userAuth } = require('../../middlewares/userAuth');

const userRouter = require('express').Router();

userRouter.post('/signup', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', userAuth, getUserProfile);
userRouter.get('/logout', userAuth, logoutUser);
userRouter.get('/check', userAuth, verifyUser);
userRouter.put('/profile', userAuth, updateUserProfile);
userRouter.put('/change-password', userAuth, changePassword);

module.exports = userRouter
