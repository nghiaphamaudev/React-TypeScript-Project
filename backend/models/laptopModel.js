const mongoose = require('mongoose');
const laptopModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A laptop must to have a name !'],
      unique: true,
    },
    monitor: {
      type: String,
      default: '15.6 100% RGB',
    },
    price: {
      type: Number,
      required: [true, 'A laptop must have a price !'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    coverImg: String,
    images: [String],
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (priceDiscount) {
          return this.price > priceDiscount;
        },
        message: 'The discount price must less than price!',
      },
    },
    version: {
      type: Number,
      required: [true, 'A laptop must to have a version !'],
    },

    summary: {
      type: String,
      required: [true, 'A phoen must have a summary!'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    versionKey: false,
    timestamps: true,
  }
);
laptopModel.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name',
  });
  next();
});

const Laptop = mongoose.model('laptop', laptopModel);
module.exports = Laptop;
