import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../models/User'; // Adjusted import path

export async function POST(request: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const { email, password } = await request.json();
    // await User.create(
    //   {
    //     email,
    //     password: await bcrypt.hash(password, 10) // Hash the password before saving
    //   }
    // )
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
