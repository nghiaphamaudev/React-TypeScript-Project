const catchAsync = require('../utils/catchAsync');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const Laptop = require('./../models/laptopModel');
const AppError = require('./../utils/appError');
const { memoryStorage } = require('multer');

// Kiểm tra tệp tải lên
const multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(
      new AppError('Not an image! Please upload only images.', 400),
      false
    );
  }
  return cb(null, true);
};

// Cấu hình Multer Storage
// const multerStortage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../frontend/public/img/products'));
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     const filename = `product-${Date.now()}.${ext}`;
//     req.body.coverImg = filename;
//     cb(null, filename);
//   },
// });

const multerStorage = multer.memoryStorage();

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// Middleware tải lên hình ảnh
exports.uploadLaptopImages = upload.fields([
  { name: 'coverImg', maxCount: 1 },
  {
    name: 'images',
    maxCount: 2,
  },
]);

exports.resizeImages = catchAsync(async (req, res, next) => {
  if (!req.files.coverImg || !req.files.images) return next();

  //1 coverImg
  req.body.coverImg = `laptop-${Date.now()}-cover.jpeg`;
  await sharp(req.files.coverImg[0].buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    .toFile(
      path.join(
        __dirname,
        `../../frontend/public/img/products/${req.body.coverImg}`
      )
    );
  //2 iamges
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, index) => {
      const filename = `laptop-${Date.now()}-image-${index + 1}.jpeg`;
      await sharp(file.buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 100 })
        .toFile(
          path.join(__dirname, `../../frontend/public/img/products/${filename}`)
        );
      req.body.images.push(filename);
    })
  );

  next();
});

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
