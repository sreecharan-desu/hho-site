import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json({ message: 'No image provided' }, { status: 400 });
    }

    // Convert file to base64 for Cloudinary
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;
    
    const result = await cloudinary.uploader.upload(base64Image);
    
    // Store URL in MongoDB (assuming an Image model)
    const Image = mongoose.model('Image', new mongoose.Schema({ url: String }));
    const newImage = new Image({ url: result.secure_url });
    await newImage.save();

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}