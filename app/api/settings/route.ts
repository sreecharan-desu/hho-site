import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const settings = await request.json();
    
    // Store settings in MongoDB
    const Settings = mongoose.model('Settings', new mongoose.Schema({
      siteName: String,
      contactEmail: String,
      contactPhone: String,
      address: String,
      upiId: String,
      bankDetails: {
        accountName: String,
        bank: String,
        accountNumber: String,
        ifscCode: String,
        branch: String
      },
      updatedAt: { type: Date, default: Date.now }
    }));
    
    // Update or create settings
    await Settings.findOneAndUpdate({}, settings, { upsert: true, new: true });
    
    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Get settings from MongoDB
    const Settings = mongoose.model('Settings', new mongoose.Schema({
      siteName: String,
      contactEmail: String,
      contactPhone: String,
      address: String,
      upiId: String,
      bankDetails: {
        accountName: String,
        bank: String,
        accountNumber: String,
        ifscCode: String,
        branch: String
      },
      updatedAt: { type: Date, default: Date.now }
    }));
    
    const settings = await Settings.findOne({});
    
    return NextResponse.json(settings || {
      siteName: 'HHO - Helping Hands Organization',
      contactEmail: 'hho@rguktong.ac.in',
      contactPhone: '+91 79819 37656',
      address: 'Santhanutalapadu, 523225, Andhra Pradesh, India',
      upiId: '7981937656@okbizaxis',
      bankDetails: {
        accountName: 'Helping Hands Organization',
        bank: 'State Bank of India',
        accountNumber: '1234567890',
        ifscCode: 'SBIN0001234',
        branch: 'Santhanutalapadu'
      }
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
} 