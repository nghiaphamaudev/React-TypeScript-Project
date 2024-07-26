const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/sendResponse');

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: users,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const users = await User.findByIdAndDelete(req.params.id);
  if (!users) {
    return next(new AppError('The ID Users not exsited!', 400));
  }
  res.status(200).json();
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findOneAndUpdate(req.user.id, { active: false });
  sendResponse(res, 204);
});

const filterUpdateFields = (objectBody, ...allowFields) => {
  const newObj = {};
  Object.values(objectBody).forEach((el) => {
    if (allowFields.includes(el)) newObj[el] = objectBody[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const filtedBody = filterUpdateFields(req.body, 'email', 'fullName');
  const update = await User.findByIdAndUpdate(req.user.id, filtedBody, {
    new: true,
    runValidators: true,
  });
  sendResponse(res, 200, update);
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('The ID Users not exsited!', 400));
  }
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.addAddress = catchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const { name, phone, address } = req.body;
  const newAddress = [...currentUser.addresses, { name, phone, address }];
  //Add new address
  const addresses = await User.findByIdAndUpdate(
    currentUser._id,
    { addresses: newAddress },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: addresses,
  });
});

exports.updateAddress = catchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const idAddress = req.params.id;
  console.log(idAddress);
  const { name, phone, address } = req.body;

  // tìm và cập nhật địa chỉ
  const updatedAddresses = currentUser.addresses.map((addr) =>
    addr._id.toString() === idAddress
      ? { ...addr.toObject(), name, phone, address }
      : addr
  );

  const user = await User.findByIdAndUpdate(
    currentUser._id,
    { addresses: updatedAddresses },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    data: user.addresses,
  });
});
