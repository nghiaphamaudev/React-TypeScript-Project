const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email !'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Vui lòng cung cấp email hợp lệ!'],
  },
  username: {
    type: String,
    required: [true, 'Please provide your username !'],
  },
  fullName: {
    type: String,
    // required: [true, 'Vui lòng cung cấp tên của bạn!'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guide', 'lead-guide'],
    default: 'user',
  },
  password: {
    type: String,
    minlength: [8, 'Mật khẩu tối thiểu 8 kí tự'],
    select: false,
    required: [true, 'Please provide your password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide your password confirm'],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: 'Mật khẩu xác nhận không trùng khớp với mật khẩu đã nhập!',
    },
  },
  passwordChangedAt: Date,
  passwordRefreshToken: String,
  passwordRefreshTokenExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

userSchema.methods.passwordChangedAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    this.passwordChangedAt = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    //password changed after create token
    return this.passwordChangedAt > JWTTimeStamp;
  }
  return false;
};

userSchema.methods.createFreshToken = function () {
  //create randomToken
  const randomString = crypto.randomBytes(32).toString('hex');
  //Hash randomToken

  this.passwordRefreshToken = crypto
    .createHash('sha256')
    .update(randomString)
    .digest('hex');

  //tra ve so mili giay ke tu ngay 1/1/1970 + 10p = 60.1000(mili s)
  this.passwordRefreshTokenExpires = Date.now() + 10 * 60 * 1000;
  return randomString;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
