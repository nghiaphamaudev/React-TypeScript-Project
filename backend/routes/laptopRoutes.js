const express = require('express');
const laptopController = require('./../controllers/laptopController');
const laptopRouter = express.Router();

laptopRouter
  .route('/')
  .get(laptopController.getAllLatops)
  .post(laptopController.createLaptop);

laptopRouter
  .route('/:id')
  .get(laptopController.getLaptop)
  .delete(laptopController.deleteLaptop)
  .patch(laptopController.updateLaptop);

module.exports = laptopRouter;
