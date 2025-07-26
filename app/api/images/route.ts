import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Get images from MongoDB
    const Image = mongoose.model('Image', new mongoose.Schema({ url: String }));
    const images = await Image.find({}).select('url');
    
    return NextResponse.json(images.map(img => img.url));
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
} 