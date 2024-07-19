const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'The cart must have a user id!'],
      ref: 'User',
    },
    items: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Laptop', // Tham chiếu đến mô hình được xác định bởi `productType`
        },
        quantity: {
          type: Number,
          min: 1,
        },
        price: {
          type: Number,
        },
      },
    ],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    versionKey: false,
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
