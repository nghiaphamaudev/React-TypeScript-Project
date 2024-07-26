const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    payment: {
      type: String,
      required: true,
      enum: ['COD', 'PAYPAL', 'CREDIT'],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Laptop',
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);

orderSchema.virtual('totalOrder').get(function () {
  return this.products.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
