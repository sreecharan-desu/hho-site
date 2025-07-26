import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const content = await request.json();
    
    // Store content in MongoDB
    const Content = mongoose.model('Content', new mongoose.Schema({
      heroTitle: String,
      heroSubtitle: String,
      aboutDescription: String,
      updatedAt: { type: Date, default: Date.now }
    }));
    
    // Update or create content
    await Content.findOneAndUpdate({}, content, { upsert: true, new: true });
    
    return NextResponse.json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Get content from MongoDB
    const Content = mongoose.model('Content', new mongoose.Schema({
      heroTitle: String,
      heroSubtitle: String,
      aboutDescription: String,
      updatedAt: { type: Date, default: Date.now }
    }));
    
    const content = await Content.findOne({});
    
    return NextResponse.json(content || {
      heroTitle: "Small Acts. Big Impact",
      heroSubtitle: "Together, we create hope and support during life's most challenging moments.",
      aboutDescription: "A student-led nonprofit at RGUKT Ongole, dedicated to providing financial assistance for health challenges, empowering education, and fostering community support through sustainable initiatives."
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
} 