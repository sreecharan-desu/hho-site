import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const { image } = req.body;
    const result = await cloudinary.uploader.upload(image);
    
    // Store URL in MongoDB (assuming an Image model)
    const Image = mongoose.model('Image', new mongoose.Schema({ url: String }));
    const newImage = new Image({ url: result.secure_url });
    await newImage.save();

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}