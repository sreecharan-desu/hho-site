# HHO - Helping Hands Organization Website

A beautiful, responsive website for the Helping Hands Organization at RGUKT Ongole, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Elegant Design**: Clean, breathing design with maroon (#c60000) and white theme
- **Responsive**: Mobile-first design that works on all devices
- **Keyboard Secret**: Type "admin" anywhere to access admin portal
- **Smooth Animations**: Subtle CSS animations for better UX
- **Admin Portal**: Hidden admin sign-in page with NextAuth integration ready

## Project Structure

```
hho-website/
├── app/
│   ├── admin/
│   │   └── signin/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── KeyboardWatcher.tsx
├── tailwind.config.js
├── next.config.js
└── package.json
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Admin Access

- Type "admin" on any page to access the admin portal
- Navigate to `/admin/signin` directly
- Admin authentication ready for NextAuth integration

## Customization

### Colors
The theme uses:
- Primary: `#c60000` (Maroon)
- Background: White with subtle gray gradients

### Adding Content
- Edit `app/page.tsx` to modify homepage content
- Update timeline, events, and initiatives arrays
- Customize animations in `tailwind.config.js`

## Deployment

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: NextAuth (ready for integration)

## Contributing

This website is built for the Helping Hands Organization at RGUKT Ongole. For contributions or modifications, please contact the HHO team.

---

**Made with ❤️ by SreeCharan, for HHO.**