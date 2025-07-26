import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Content from '../../../models/Content';

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const content = await Content.findOne({});
    return NextResponse.json(content?.hero || {});
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const hero = await request.json();
    const content = await Content.findOneAndUpdate({}, { hero }, { upsert: true, new: true });
    return NextResponse.json(content.hero);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
} 