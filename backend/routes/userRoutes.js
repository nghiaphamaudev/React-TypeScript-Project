const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

userRouter.use(authController.protect);

userRouter.patch('/updatePassword', authController.updatePassword);

userRouter
  .route('/')
  .get(authController.restrictTo('admin'), userController.getAllUser);

userRouter.patch('/update-me', authController.protect, userController.updateMe);
userRouter.get('/get-me', userController.getMe, userController.getUser);

// for admin
userRouter.patch(
  '/:id',
  authController.restrictTo('admin'),
  userController.updateMe
);

module.exports = userRouter;
