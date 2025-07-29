// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import KeyboardWatcher from '@/components/KeyboardWatcher';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HHO – Helping Hands Organization',
  description:
    'Small Acts. Big Impact. A student-led initiative from RGUKT Ongole providing emergency support and humanitarian aid.',
  keywords: [
    'HHO',
    'Helping Hands Organization',
    'RGUKT Ongole',
    'Student Initiative',
    'Emergency Help',
    'Disaster Relief',
    'NGO',
    'Social Work',
  ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'HHO – Helping Hands Organization',
    description:
      'Official website of HHO – A student initiative from RGUKT Ongole offering emergency support, donations, and aid.',
    url: 'https://hho.sreecharandesu.in/',
    siteName: 'HHO - Helping Hands Organization',
    images: [
      {
        url: 'https://hho.sreecharandesu.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Helping Hands Organization',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HHO – Helping Hands Org',
    description:
      'HHO is a student-led initiative at RGUKT Ongole dedicated to providing emergency relief and support.',
    images: ['https://hho.sreecharandesu.in/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Force layout to 1024px width */}
        <meta name="viewport" content="width=1024" />
      </head>
      <body
        className={`${inter.className} bg-white text-black antialiased overflow-x-hidden`}
      >
        <div className="w-[1024px] mx-auto">
          <KeyboardWatcher />
          {children}
        </div>
      </body>
    </html>
  );
}