const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

// ── Start ─────────────────────────────────────────────
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
