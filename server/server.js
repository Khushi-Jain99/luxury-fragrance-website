const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/luxury-fragrance';

// Middleware
app.use(cors());
app.use(express.json());

// ── POST /api/orders ──────────────────────────────────
app.post('/api/orders', async (req, res) => {
  try {
    const { products, totalPrice, shippingDetails, paymentMethod } = req.body;

    if (!products?.length || !totalPrice || !shippingDetails || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required order fields.' });
    }

    const order = await Order.create({
      products,
      totalPrice,
      shippingDetails,
      paymentMethod,
    });

    res.status(201).json({ message: 'Order placed successfully!', order });
  } catch (err) {
    console.error('Order creation failed:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ── Connect & Start ───────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
