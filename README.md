# HHO - Helping Hands Organization Website

A modern, responsive website for HHO (Helping Hands Organization) with a WordPress-like admin dashboard for easy content management.

## 🚀 Features

### Public Website
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Dynamic Content**: All content is loaded from the database via API
- **Interactive Elements**: Donation popups, help requests, image galleries
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Accessibility**: WCAG compliant with keyboard navigation

### Admin Dashboard (WordPress-like)
- **Live Preview**: See the actual website with editing capabilities
- **Inline Editing**: Click any section to edit content directly
- **Visual Editor**: Edit text, images, and sections with a visual interface
- **Real-time Updates**: Changes are saved immediately and reflected on the live site
- **Section Management**: Add, edit, delete, and reorder sections
- **Media Library**: Upload and manage images with drag-and-drop
- **Settings Panel**: Configure contact info, payment details, and site settings

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: JWT, bcrypt
- **File Upload**: Cloudinary integration
- **Email**: Nodemailer for password reset

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hho-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
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

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the MONGODB_URI in your .env.local file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - **Public Website**: http://localhost:3000
   - **Admin Dashboard**: Type "admin" anywhere on the site or visit http://localhost:3000/admin/signin

## 🎯 Admin Dashboard Features

### Live Preview Mode
- See the actual website in the admin panel
- Toggle edit mode on/off
- Click any section to edit
- Visual feedback with hover effects

### Content Management
- **Hero Section**: Edit title, subtitle, CTA button
- **About Section**: Update description, stats, and highlights
- **Campaigns**: Add/edit campaigns with status tracking
- **Announcements**: Manage announcements and updates
- **Gallery**: Upload and organize images
- **Help Section**: Edit help options and descriptions
- **Footer**: Update contact information and links

### Visual Editing
- **Inline Text Editing**: Click any text to edit
- **Image Management**: Upload, replace, and organize images
- **Section Reordering**: Drag and drop to reorder sections
- **Real-time Preview**: See changes immediately
- **Undo/Redo**: Track changes and revert if needed

### Media Library
- **Drag & Drop Upload**: Easy image upload
- **Image Optimization**: Automatic resizing and compression
- **Gallery Management**: Organize images into collections
- **Bulk Operations**: Select multiple images for batch operations

### Settings Panel
- **Site Information**: Update site name, description, and meta data
- **Contact Details**: Manage phone, email, and address
- **Payment Information**: Configure UPI, bank details, and payment methods
- **Social Media**: Update social media links
- **SEO Settings**: Configure meta tags and Open Graph data

## 🔧 API Endpoints

### Content Management
- `GET /api/content` - Get all content
- `POST /api/content` - Update all content
- `GET /api/content/{section}` - Get specific section
- `POST /api/content/{section}` - Update specific section

### Authentication
- `POST /api/auth/signin` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/forgot-password` - Password reset

### Media Management
- `POST /api/image/upload` - Upload images
- `GET /api/images` - Get uploaded images

### Settings
- `GET /api/settings` - Get site settings
- `POST /api/settings` - Update site settings

## 🎨 Customization

### Adding New Sections
1. Create the component in `components/`
2. Add the API endpoint in `app/api/content/`
3. Update the admin dashboard to include the new section
4. Add the edit form in `app/admin/components/EditModal.tsx`

### Styling
- All styles use Tailwind CSS
- Custom animations with Framer Motion
- Responsive design with mobile-first approach

### Content Structure
The content is organized into sections:
- `hero` - Main hero section
- `about` - About section with stats
- `campaigns` - Current and past campaigns
- `announcements` - Site announcements
- `gallery` - Image gallery
- `help` - Help section options
- `footer` - Footer information

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Configure build settings for Next.js
- **Railway**: Deploy with MongoDB integration
- **DigitalOcean**: Use App Platform with container deployment

## 🔒 Security

- **JWT Authentication**: Secure admin access
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for production
- **Rate Limiting**: API rate limiting (recommended for production)

## 📱 Mobile Support

- **Responsive Design**: Works on all screen sizes
- **Touch-Friendly**: Optimized for mobile interaction
- **Progressive Web App**: Can be installed on mobile devices
- **Offline Support**: Basic offline functionality

## 🎯 Performance

- **Next.js Optimization**: Automatic code splitting and optimization
- **Image Optimization**: Next.js Image component with Cloudinary
- **Lazy Loading**: Images and components load on demand
- **Caching**: API responses cached for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: hho@rguktong.ac.in
- Phone: +91 79819 37656
- Website: https://hho.sreecharandesu.in/

---

**Built with ❤️ for Helping Hands Organization**