import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Content from '../../../models/Content';

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const content = await Content.findOne({});
    return NextResponse.json(content?.help || {});
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const help = await request.json();
    const content = await Content.findOneAndUpdate({}, { help }, { upsert: true, new: true });
    return NextResponse.json(content.help);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
} 