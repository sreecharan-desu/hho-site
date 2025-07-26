"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Image, Settings, FileText, LayoutDashboard, Users, TrendingUp, DollarSign, Save, Key, Mail, Database } from 'lucide-react';
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

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    siteName: 'HHO - Helping Hands Organization',
    contactEmail: 'hho@rguktong.ac.in',
    contactPhone: '+91 79819 37656',
    address: 'Santhanutalapadu, 523225, Andhra Pradesh, India',
    upiId: '7981937656@okbizaxis',
    bankDetails: {
      accountName: 'Helping Hands Organization',
      bank: 'State Bank of India',
      accountNumber: '1234567890',
      ifscCode: 'SBIN0001234',
      branch: 'Santhanutalapadu'
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/signin');
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      
      if (response.ok) {
        alert('Settings updated successfully!');
      } else {
        alert('Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings');
    }
  };

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
            className="flex items-center gap-2 p-3 rounded-md bg-blue-700 transition-colors"
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
          
          <div className="space-y-6">
            {/* General Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-5 h-5" />
                General Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={settings.upiId}
                    onChange={(e) => setSettings({...settings, upiId: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Key className="w-5 h-5" />
                Bank Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={settings.bankDetails.accountName}
                    onChange={(e) => setSettings({
                      ...settings, 
                      bankDetails: {...settings.bankDetails, accountName: e.target.value}
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={settings.bankDetails.bank}
                    onChange={(e) => setSettings({
                      ...settings, 
                      bankDetails: {...settings.bankDetails, bank: e.target.value}
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={settings.bankDetails.accountNumber}
                    onChange={(e) => setSettings({
                      ...settings, 
                      bankDetails: {...settings.bankDetails, accountNumber: e.target.value}
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={settings.bankDetails.ifscCode}
                    onChange={(e) => setSettings({
                      ...settings, 
                      bankDetails: {...settings.bankDetails, ifscCode: e.target.value}
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch
                  </label>
                  <input
                    type="text"
                    value={settings.bankDetails.branch}
                    onChange={(e) => setSettings({
                      ...settings, 
                      bankDetails: {...settings.bankDetails, branch: e.target.value}
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
} 