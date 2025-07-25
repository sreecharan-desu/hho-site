"use client";

import { motion } from 'framer-motion';
import { LogOut, Image, Settings, FileText, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/signin');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <motion.aside
        className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 shadow-lg"
        initial="hidden"
        animate="visible"
        // @ts-ignore
        variants={sidebarVariants}
      >
        <h1 className="text-2xl font-bold mb-8">HHO Dashboard</h1>
        <nav className="space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link
            href="/admin/dashboard/content"
            className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-5 h-5" /> Content
          </Link>
          <Link
            href="/admin/dashboard/images"
            className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Image className="w-5 h-5" /> Images
          </Link>
          <Link
            href="/admin/dashboard/settings"
            className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Settings className="w-5 h-5" /> Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-3 w-full text-left rounded-md hover:bg-blue-700 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </motion.aside>
      <motion.main
        className="flex-1 p-8 overflow-auto"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        <div className="max-w-7xl mx-auto">{children}</div>
      </motion.main>
    </div>
  );
}
