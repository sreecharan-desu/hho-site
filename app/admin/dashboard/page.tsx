"use client";

import { motion } from 'framer-motion';
import { LogOut, Image, Settings, FileText, LayoutDashboard, Users, TrendingUp, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.1, 1] } },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.32, 0, 0.1, 1] } },
};

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/signin');
  };

  const stats = [
    { title: 'Total Donations', value: '₹2.5L+', icon: DollarSign, color: 'text-green-600' },
    { title: 'Students Helped', value: '500+', icon: Users, color: 'text-blue-600' },
    { title: 'Active Campaigns', value: '3', icon: TrendingUp, color: 'text-purple-600' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <motion.aside
        className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <h1 className="text-2xl font-bold mb-8">HHO Dashboard</h1>
        <nav className="space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 p-3 rounded-md bg-blue-700 transition-colors"
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                className="bg-white rounded-lg shadow p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/admin/dashboard/content"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Manage Content</h3>
                  <p className="text-sm text-gray-600">Update website content and messages</p>
                </div>
              </Link>
              <Link
                href="/admin/dashboard/images"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <Image className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Manage Images</h3>
                  <p className="text-sm text-gray-600">Upload and organize gallery images</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
