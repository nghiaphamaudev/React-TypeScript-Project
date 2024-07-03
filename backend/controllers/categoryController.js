const catchAsync = require('../utils/catchAsync');
const Category = require('./../models/categoryModel');
const AppError = require('./../utils/appError');

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  return res.status(200).json({
    status: 'success',
    data: categories,
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError('The ID categorynot exsited!', 400));
  }
  return res.status(200).json({
    status: 'success',
    data: category,
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new AppError('The ID categorynot exsited!', 400));
  }
  return res.status(200).json();
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    return next(new AppError('The ID categorynot exsited!', 400));
  }
  return res.status(200).json({
    status: 'success',
    data: category,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newCategory,
  });
});
