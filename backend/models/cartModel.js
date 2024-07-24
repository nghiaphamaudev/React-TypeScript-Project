const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'The cart must have a user id!'],
      ref: 'User',
    },
    orderItems: [
      {
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Laptop',
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

cartSchema.virtual('totalPrice').get(function () {
  return this.orderItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
