import { motion } from 'framer-motion';
import { LogOut, Image, Settings, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function Layout({ children } : any) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin');
  };

  return (
    <div className="flex h-screen">
      <motion.div
        className="w-64 bg-gray-800 text-white p-4"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl mb-6">Dashboard</h1>
        <nav>
          <Link href="/admin/dashboard/content" className="flex items-center p-2 hover:bg-gray-700">
            <FileText className="mr-2" /> Content
          </Link>
          <Link href="/admin/dashboard/images" className="flex items-center p-2 hover:bg-gray-700">
            <Image className="mr-2" /> Images
          </Link>
          <Link href="/admin/dashboard/settings" className="flex items-center p-2 hover:bg-gray-700">
            <Settings className="mr-2" /> Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center p-2 w-full text-left hover:bg-gray-700"
          >
            <LogOut className="mr-2" /> Logout
          </button>
        </nav>
      </motion.div>
      <motion.main
        className="flex-1 p-8"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </div>
  );
}