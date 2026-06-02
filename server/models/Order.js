const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userDetails: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
  },
  products: [
    {
      productId: { type: Number, required: true },
      name: { type: String, required: true },
      brand: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
      image: { type: String },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  shippingDetails: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['COD', 'UPI', 'CARD'],
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  upiId: {
    type: String,
  },
  upiApp: {
    type: String,
  },
  orderStatus: {
    type: String,
    enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Placed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
