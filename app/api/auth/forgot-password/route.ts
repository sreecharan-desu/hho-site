import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '@/app/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Click this link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reset link sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}