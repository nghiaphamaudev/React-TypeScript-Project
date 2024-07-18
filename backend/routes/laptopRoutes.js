const express = require('express');
const laptopController = require('./../controllers/laptopController');
const laptopRouter = express.Router();

laptopRouter
  .route('/')
  .get(laptopController.getAllLatops)
  .post(
    laptopController.uploadLaptopImages,
    laptopController.resizeImages,
    laptopController.createLaptop
  );

laptopRouter
  .route('/:id')
  .get(laptopController.getLaptop)
  .delete(laptopController.deleteLaptop)
  .patch(
    laptopController.uploadLaptopImages,
    laptopController.resizeImages,
    laptopController.updateLaptop
  );

module.exports = laptopRouter;
