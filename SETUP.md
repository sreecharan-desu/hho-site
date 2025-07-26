# HHO Site Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/hho-site

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration (for password reset)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the MONGODB_URI in your .env.local file

3. **Set up Cloudinary (Optional)**
   - Create a Cloudinary account
   - Get your cloud name, API key, and API secret
   - Update the Cloudinary variables in your .env.local file

4. **Set up Email (Optional)**
   - For Gmail, use an App Password
   - Update the email variables in your .env.local file

5. **Create Admin User**
   - Start the development server: `npm run dev`
   - Visit `/admin/signin`
   - The first user will be created automatically when you sign in

6. **Run the Application**
   ```bash
   npm run dev
   ```

## Features

- **Public Website**: Visit the root URL to see the public website
- **Admin Dashboard**: Type "admin" anywhere on the site to access the admin panel
- **Content Management**: Update website content through the admin dashboard
- **Image Management**: Upload and manage gallery images
- **Settings Management**: Configure contact information and payment details

## Admin Access

- **URL**: `/admin/signin`
- **Keyboard Shortcut**: Type "admin" anywhere on the site
- **Default Credentials**: Create your first account by signing up

## API Endpoints

- `POST /api/auth/signin` - Admin authentication
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/content` - Update website content
- `GET /api/content` - Get website content
- `POST /api/images/upload` - Upload images
- `GET /api/images` - Get uploaded images
- `POST /api/settings` - Update settings
- `GET /api/settings` - Get settings 