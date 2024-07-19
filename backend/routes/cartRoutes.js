const express = require('express');
const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authController');
const cartRouter = express.Router();

cartRouter.use(authController.protect);

cartRouter
  .route('/')
  .get(authController.restrictTo('user'), cartController.getAllCartByIdUser);
//   .delete(authController.restrictTo('user'), cartController.clearCart);

cartRouter
  .route('/items')
  .post(authController.restrictTo('user'), cartController.addItemToCart);

// cartRouter
//   .route('/items/:itemId')
//   .patch(authController.restrictTo('user'), cartController.updateCartItem)
//   .delete(authController.restrictTo('user'), cartController.removeItemFromCart);

module.exports = cartRouter;
