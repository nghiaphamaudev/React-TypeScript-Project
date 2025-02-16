const Laptop = require('../models/laptopModel');
const catchAsync = require('../utils/catchAsync');
const Cart = require('./../models/cartModel');

// GET cart By User
//routes {{API}}/carts
exports.getCartMiddleware = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  req.currentCart = cart;
  next();
});

exports.getAllCartByUser = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        model: Laptop,
        select: '_id name monitor coverImg version ratingsAverage price ',
      },
    })
    .populate({
      path: 'user',
      select: '_id email username fullName addresses', // các trường bạn muốn lấy từ user
    });
  return res.status(200).json({
    status: 'success',
    data: cart,
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  const currentCart = req.currentCart;
  const { product, quantity, price } = req.body;

  //Create Cart
  //Situation 1: ID User not  exsited! => Create new cart
  //API {{API}}/carts
  if (!currentCart) {
    const newCart = await Cart.create({
      user,
      orderItems: [
        {
          product,
          quantity,
          price,
        },
      ],
    });
    return res.status(201).json({
      status: 'success',
      data: newCart,
    });
  }
  ////Situation 2: ID User exsited => Check ID Product(true) => ++ Quantity Product
  const productExsited = currentCart.orderItems.find(
    (item) => item.product == product
  );
  let newCart = [];
  if (productExsited) {
    newCart = currentCart.orderItems.map((item) =>
      item.product == product
        ? { product, quantity: item.quantity + quantity, price }
        : item
    );
  } else {
    newCart = [...currentCart.orderItems, { product, quantity, price }];
  }

  const cart = await Cart.findByIdAndUpdate(
    currentCart._id,
    { orderItems: newCart },
    { new: true }
  );

  return res.status(200).json({
    status: 'success',
    data: cart,
  });
});

// Delete ID Product from Cart
//API {{API}}/carts/:id
exports.deleteProductCart = catchAsync(async (req, res, next) => {
  const idProduct = req.params.id;
  const currentCart = req.currentCart;
  const newCart = currentCart.orderItems.filter(
    (item) => item.product != idProduct
  );
  const cart = await Cart.findByIdAndUpdate(
    currentCart._id,
    { orderItems: newCart },
    { new: true }
  ).populate({
    path: 'orderItems',
    populate: {
      path: 'product',
      model: Laptop,
      select: '_id name monitor coverImg version ratingsAverage price ',
    },
  });

  return res.status(200).json({
    status: 'success',
    data: cart,
  });
});

exports.updateQuantityCart = catchAsync(async (req, res, next) => {
  const currentCart = req.currentCart;
  const { mode, id } = req.body;

  // Tìm sản phẩm trong giỏ hàng
  const itemIndex = currentCart.orderItems.find(
    (item) => item.product.toString() == id
  );
  if (itemIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Product not found in the cart',
    });
  }

  // Cập nhật số lượng dựa trên mode
  if (mode === 'plus') {
    itemIndex.quantity += 1;
  } else if (mode === 'minus' && itemIndex.quantity > 1) {
    itemIndex.quantity -= 1;
  } else {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid mode or quantity cannot be less than 1',
    });
  }

  // Lưu giỏ hàng sau khi cập nhật
  await currentCart.save();
  await currentCart.populate({
    path: 'orderItems',
    populate: {
      path: 'product',
      model: Laptop,
      select: '_id name monitor coverImg version ratingsAverage price ',
    },
  });

  return res.status(200).json({
    status: 'success',
    data: currentCart,
  });
});
