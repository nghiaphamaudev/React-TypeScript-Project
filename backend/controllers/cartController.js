const Laptop = require('../models/laptopModel');
const catchAsync = require('../utils/catchAsync');
const Cart = require('./../models/cartModel');
const AppError = require('./../utils/appError');

exports.getAllCartByIdUser = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const cart = await Cart.findOne({ user: req.user._id })
    .populate({
      path: 'user',
      select: 'name email', // Chọn các trường cần thiết từ mô hình User
    })
    .populate({
      path: 'items.product',
      select: 'name monitor coverImg version category',
    });
  return res.status(200).json({
    status: 'success',
    data: cart,
  });
});

// exports.getCategory = catchAsync(async (req, res, next) => {
//   const category = await Category.findById(req.params.id);
//   if (!category) {
//     return next(new AppError('The ID categorynot exsited!', 400));
//   }
//   return res.status(200).json({
//     status: 'success',
//     data: category,
//   });
// });

// exports.deleteCategory = catchAsync(async (req, res, next) => {
//   const category = await Category.findByIdAndDelete(req.params.id);
//   if (!category) {
//     return next(new AppError('The ID categorynot exsited!', 400));
//   }
//   return res.status(200).json();
// });

// exports.updateCategory = catchAsync(async (req, res, next) => {
//   const category = Category.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!category) {
//     return next(new AppError('The ID categorynot exsited!', 400));
//   }
//   return res.status(200).json({
//     status: 'success',
//     data: category,
//   });
// });

const mongoose = require('mongoose');
const Cart = require('./models/cart'); // đảm bảo đường dẫn đúng đến mô hình Cart
const catchAsync = require('./utils/catchAsync'); // đảm bảo bạn có hàm catchAsync

exports.addItemToCart = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const { productId, quantity } = req.body;

  // tìm giỏ hàng hiện tại của người dùng
  let currentCart = await Cart.findOne({ user: req.user._id });

  if (!currentCart) {
    // nếu chưa có giỏ hàng, tạo giỏ hàng mới
    currentCart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity, price: req.body.price }],
    });
  } else {
    // nếu đã có giỏ hàng, kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const productIndex = currentCart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      // nếu sản phẩm đã tồn tại, tăng số lượng lên
      currentCart.items[productIndex].quantity += quantity;
    } else {
      // nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
      currentCart.items.push({
        product: productId,
        quantity,
        price: req.body.price,
      });
    }

    // lưu giỏ hàng đã cập nhật
    await currentCart.save();
  }

  res.status(201).json({
    status: 'success',
    data: currentCart,
  });
});
