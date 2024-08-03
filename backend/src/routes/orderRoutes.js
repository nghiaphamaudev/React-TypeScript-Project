const express = require('express');
const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authController');
const cartController = require('./../controllers/cartController');

const orderRouter = express.Router({ mergeParams: true });

orderRouter.use(authController.protect, authController.restrictTo('user'));

orderRouter
  .route('/')
  .post(cartController.getCartMiddleware, orderController.createOrderFromCart)
  .get(orderController.getOrderUser);

orderRouter
  .route('/:id')
  .patch(orderController.updateOrder)
  .get(orderController.getOrderById);

module.exports = orderRouter;
