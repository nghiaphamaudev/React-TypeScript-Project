const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOrderUser = catchAsync(async (req, res, next) => {
  const idUser = req.user._id;
  const orders = await Order.find({ user: idUser });
  res.status(200).json({
    status: 'success',
    data: orders,
  });
});

exports.createOrderFromCart = catchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const cart = req.currentCart;
  const userId = currentUser._id;
  //Lấy ra địa chỉ được chọn bởi user
  const addressUser = currentUser.addresses.find(
    (address) => address.isDefault === true
  );
  //Destructuring
  const { name, phone, address } = addressUser;
  const { payment } = req.body;
  // lấy giỏ hàng của người dùng

  //Lấy ra cart

  if (!cart) {
    return next(new AppError('You did not selected product!', 400));
  }

  // lọc các sản phẩm được chọn

  const selectedItems = cart.orderItems.filter((item) => item.isSelected);

  //lọc các sản phẩm không được chọn để cập nhật giỏ hàng
  const unSelectedItems = cart.orderItems.filter((item) => !item.isSelected);

  if (selectedItems.length === 0) {
    return next(new AppError('No items selected in the cart.', 400));
  }

  // tạo đơn hàng mới
  const orderItems = selectedItems.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.price,
  }));

  const newOrder = await Order.create({
    user: userId,
    payment,
    products: orderItems,
    address: address,
    name: name,
    phone: phone,
  });
  //Cập nhật lại giỏ hàng
  cart.orderItems = unSelectedItems;
  await cart.save();

  // trả về phản hồi thành công
  res.status(201).json({
    status: 'success',
    data: newOrder,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const idOrder = req.params.id;
  const order = await Order.findByIdAndUpdate(
    { _id: idOrder },
    { isActive: false },
    { new: true }
  );
  if (!order)
    return next(new AppError('The ID order not existed. Try again!', 400));
  return res.status(200).json({
    status: 'success',
    data: order,
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const idOrder = req.params.id;
  const order = await Order.findOne({ _id: idOrder });
  if (!order)
    return next(new AppError('The ID order not existed. Try again!', 400));
  return res.status(200).json({
    status: 'success',
    data: order,
  });
});
