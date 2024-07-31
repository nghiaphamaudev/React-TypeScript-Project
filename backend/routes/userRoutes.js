const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const userRouter = express.Router();

//Authen
userRouter.post('/signup', authController.signup);
userRouter.post('/signin', authController.login);
userRouter.get('/logout', authController.logout);
userRouter.get('/:id', userController.getUser);
userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

userRouter.use(authController.protect);

// Address form User
userRouter.patch('/updatePassword', authController.updatePassword);
userRouter.post('/address', userController.addAddress);
userRouter.patch('/address/:id', userController.updateAddress);
userRouter.patch(
  '/update-status-address/:id',
  userController.updateStatusAddress
);

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
