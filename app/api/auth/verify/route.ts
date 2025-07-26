import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    
    return NextResponse.json({ 
      success: true, 
      user: decoded 
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
} 