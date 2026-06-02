const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const MONGODB_URI = process.env.MONGODB_URI;


// ── POST /api/contact ─────────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    if (!EMAIL_USER || !EMAIL_PASS || !RECEIVER_EMAIL) {
      return res.status(500).json({ message: 'Email service not configured.' });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST || 'smtp.gmail.com',
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const cleanSubject = subject?.trim() || 'New message from contact form';
    const prefixedSubject = `Luxury Fragrance Inquiry: ${cleanSubject}`;

    await transporter.sendMail({
      from: `Aurelia Boutique <${EMAIL_USER}>`,
      to: RECEIVER_EMAIL,
      replyTo: email,
      subject: prefixedSubject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${cleanSubject}\n\n${message}`,
    });

    return res.status(200).json({ message: 'Message sent successfully.' });
  } catch (err) {
    console.error('Contact form failed:', err);
    return res.status(500).json({ message: 'Failed to send message.' });
  }
});

// ── POST /api/orders ─────────────────────────────────
app.post('/api/orders', async (req, res) => {
  try {
    const { products, totalPrice, shippingDetails, paymentMethod } = req.body;

    console.log('Order request received', {
      productCount: Array.isArray(products) ? products.length : 0,
      totalPrice,
      paymentMethod,
      shippingFields: shippingDetails ? Object.keys(shippingDetails) : [],
      db: mongoose.connection?.db?.databaseName,
      readyState: mongoose.connection.readyState,
    });

    if (!shippingDetails?.fullName || !shippingDetails?.phone || !shippingDetails?.address
      || !shippingDetails?.city || !shippingDetails?.state || !shippingDetails?.pincode) {
      return res.status(400).json({ message: 'Shipping details are required.' });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }

    if (!paymentMethod || paymentMethod !== 'COD') {
      return res.status(400).json({ message: 'Only Cash on Delivery is available right now.' });
    }

    if (typeof totalPrice !== 'number' || totalPrice < 0) {
      return res.status(400).json({ message: 'Total amount is invalid.' });
    }

    const order = await Order.create({
      userDetails: {
        fullName: shippingDetails.fullName,
        phone: shippingDetails.phone,
      },
      products,
      totalPrice,
      shippingDetails,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      orderStatus: 'Placed',
    });

    console.log('Order saved', {
      orderId: order._id?.toString(),
      collection: order.collection?.name,
    });

    return res.status(201).json({
      message: 'Order placed successfully.',
      order,
    });
  } catch (err) {
    console.error('Order creation failed:', {
      message: err?.message,
      db: mongoose.connection?.db?.databaseName,
      readyState: mongoose.connection.readyState,
    });
    return res.status(500).json({ message: 'Failed to place order.' });
  }
});

// ── Start ─────────────────────────────────────────────
const startServer = async () => {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set. Please configure your database connection.');
    return;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.name}`);
    app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

startServer();
