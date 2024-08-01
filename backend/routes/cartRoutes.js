const express = require('express');
const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authController');
const cartRouter = express.Router({ mergeParams: true });

cartRouter.use(authController.protect);

cartRouter
  .route('/')
  .get(cartController.getAllCartByUser)
  .post(
    cartController.getCartMiddleware,
    authController.restrictTo('user'),
    cartController.addToCart
  )
  .patch(cartController.getCartMiddleware, cartController.updateQuantityCart);

cartRouter
  .route('/:id')
  .delete(cartController.getCartMiddleware, cartController.deleteProductCart);

module.exports = cartRouter;
