const express = require('express');
const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authController');
const cartRouter = express.Router({ mergeParams: true });

cartRouter.use(authController.protect, authController.restrictTo('user'));

cartRouter
  .route('/')
  .get(cartController.getAllCartByUser)
  .post(cartController.getCartMiddleware, cartController.addToCart);

cartRouter
  .route('/:id')
  .delete(cartController.getCartMiddleware, cartController.deleteProductCart);

module.exports = cartRouter;
