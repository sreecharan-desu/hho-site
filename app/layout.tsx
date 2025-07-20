import './globals.css'
import { Inter } from 'next/font/google'
import KeyboardWatcher from '@/components/KeyboardWatcher'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HHO - Helping Hands Organization',
  description: 'Small Acts. Big Impact. - RGUKT Ongole student-led initiative providing support during emergencies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-800`}>
        <KeyboardWatcher />
        {children}
      </body>
    </html>
  )
}