const crypto = require('crypto');
const User = require('./../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendRes = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    data: user,
    accessToken: token,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendRes(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select('+password');
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Email hoặc mật khẩu không chính xác!', 401));
  }
  createSendRes(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You not logged in. Please login to access!', 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findOne({ _id: decoded.id });
  if (!currentUser) {
    return next(
      new AppError(' The token has not beloging to this user. Try again!', 403)
    );
  }

  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError('The password has been changed. Please try again', 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.checkLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        next();
      }

      if (currentUser.passwordChangedAfter(decoded.iat)) {
        next();
      }
      res.locals.user = currentUser;
      return next();
    } catch (error) {
      return next();
    }
  }
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You dont have permission to access', 403));
    }
    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword } = req.body;
  const user = await User.findOne({ email: req.user.email }).select(
    '+password'
  );
  if (!(await user.checkPassword(password, user.password))) {
    return next(
      new AppError('Repassword not match with password.Try again !', 400)
    );
  }
  user.password = newPassword;
  user.passwordConfirm = newPassword;
  await user.save();
  createSendRes(user, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('The email is match with account!', 400));
  }

  const refreshToken = user.createFreshToken();
  console.log(refreshToken);
  await user.save({ validateBeforeSave: false });

  //send Token with email
  res.status(200).json({
    status: 'sucess',
    freshToken: refreshToken,
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //hash token to search
  const decodedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordRefreshToken: decodedToken,
    passwordRefreshTokenExpires: { $gt: Date.now() },
  }).select('+password');
  if (!user) {
    return next(new AppError('Token invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordRefreshToken = undefined;
  user.passwordRefreshTokenExpires = undefined;
  await user.save();
  createSendRes(user, 200, res);
});
