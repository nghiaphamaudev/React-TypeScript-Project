const catchAsync = require('../utils/catchAsync');
const Laptop = require('./../models/laptopModel');
const AppError = require('./../utils/appError');

exports.getAllLatops = catchAsync(async (req, res, next) => {
  const laptops = await Laptop.find().populate('category');
  return res.status(200).json({
    status: 'success',
    data: laptops,
  });
});

exports.getLaptop = catchAsync(async (req, res, next) => {
  const laptop = await Laptop.findById(req.params.id).populate('category');
  if (!laptop) {
    return next(new AppError('The ID laptop not exsited!', 400));
  }
  return res.status(200).json({
    status: 'success',
    data: laptop,
  });
});

exports.deleteLaptop = catchAsync(async (req, res, next) => {
  const laptop = await Laptop.findByIdAndDelete(req.params.id);
  if (!laptop) {
    return next(new AppError('The ID laptop not exsited!', 400));
  }
  return res.status(200).json();
});

exports.updateLaptop = catchAsync(async (req, res, next) => {
  const laptop = Laptop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!laptop) {
    return next(new AppError('The ID laptop not exsited!', 400));
  }
  return res.status(200).json({
    status: 'success',
    data: laptop,
  });
});

exports.createLaptop = catchAsync(async (req, res, next) => {
  const newlaptop = await Laptop.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newlaptop,
  });
});
