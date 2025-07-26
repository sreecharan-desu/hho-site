// @ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Image, Settings, FileText, LayoutDashboard, Users, TrendingUp, DollarSign, Save, Eye, Edit, Plus, Trash2, Move } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiData } from '@/lib/api';
import EditModal from '../components/EditModal';

// Import all the main site components
import EnhancedHeroSection from "@/components/Hero";
import ProfessionalSections from "@/components/About";
import ProfessionalHelpSection from "@/components/Help";
import AnnouncementsPreview from "@/components/Announcements";
import CurrentFundraiser from "@/components/CurrentFundRaising";
import HHOFooter from "@/components/Footer";
import StoriesOfImpact from "@/components/StoriesOfImpact";
import DriveGallery from "@/components/ImagesGallery";

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.1, 1] } },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.32, 0, 0.1, 1] } },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(true);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [siteData, setSiteData] = useState(apiData);
  const [editModal, setEditModal] = useState({ isOpen: false, section: '', elementId: '', data: null });

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/signin');
  };

  const handleElementClick = (e, elementId, section) => {
    if (!isEditMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setSelectedElement({ id: elementId, section });
    setToolbarPosition({ x: e.clientX, y: e.clientY });
    setShowToolbar(true);
  };

  const handleEdit = (elementId, section) => {
    // Find the data for the selected section
    const sectionData = siteData.find(item => item.component === section)?.data || {};
    setEditModal({
      isOpen: true,
      section,
      elementId,
      data: sectionData
    });
    setShowToolbar(false);
  };

  const handleAdd = (section) => {
    // Open add modal/form for the section
    console.log('Add new item to section:', section);
  };

  const handleDelete = (elementId, section) => {
    // Delete the element
    console.log('Delete element:', elementId, 'from section:', section);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save all changes to backend
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteData),
      });
      
      if (response.ok) {
        alert('Changes saved successfully!');
      } else {
        alert('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditSave = async (updatedData) => {
    try {
      // Update the site data with the new data
      const updatedSiteData = siteData.map(item => 
        item.component === editModal.section 
          ? { ...item, data: updatedData }
          : item
      );
      setSiteData(updatedSiteData);
      
      // Save to backend
      const response = await fetch(`/api/content/${editModal.section}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      
      if (response.ok) {
        alert('Section updated successfully!');
      } else {
        alert('Failed to update section');
      }
    } catch (error) {
      console.error('Error updating section:', error);
      alert('Error updating section');
    }
  };

  // Add edit overlay to any element
  const EditOverlay = ({ children, elementId, section, className = "" }) => {
    if (!isEditMode) return children;
    
    return (
      <div 
        className={`relative group ${className}`}
        onClick={(e) => handleElementClick(e, elementId, section)}
      >
        {children}
        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-2 border-blue-500/50 rounded pointer-events-none">
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
            Click to edit
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <motion.aside
        className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 shadow-lg z-50"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <h1 className="text-2xl font-bold mb-8">HHO Admin</h1>
        
        {/* Edit Mode Toggle */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Edit className="w-4 h-4" />
            <span className="text-sm font-medium">Edit Mode</span>
          </div>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`w-full py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              isEditMode 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isEditMode ? 'Editing Enabled' : 'Editing Disabled'}
          </button>
        </div>

        <nav className="space-y-2 mb-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 p-3 rounded-md bg-blue-700 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" /> Live Preview
          </Link>
          <Link
            href="/admin/dashboard/content"
            className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-5 h-5" /> Content Manager
          </Link>
          <Link
            href="/admin/dashboard/images"
            className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Image className="w-5 h-5" /> Media Library
          </Link>
          <Link
            href="/admin/dashboard/settings"
            className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

        {/* Quick Actions */}
        <div className="space-y-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full flex items-center gap-2 p-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-md transition-colors"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 p-3 hover:bg-blue-700 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area - Live Website Preview */}
      <motion.main
        className="flex-1 overflow-auto bg-white"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        {/* Admin Header */}
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Live Website Preview</h2>
            {isEditMode && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                Edit Mode Active
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Live Site
            </button>
          </div>
        </div>

        {/* Website Content with Edit Overlays */}
        <div className="relative">
          {/* Hero Section */}
          <EditOverlay elementId="hero" section="hero">
            <EnhancedHeroSection openDonatePopup={() => {}} />
          </EditOverlay>

          {/* About Section */}
          <EditOverlay elementId="about" section="about">
            <section className="relative z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <ProfessionalSections />
              </div>
            </section>
          </EditOverlay>

          {/* Announcements Section */}
          <EditOverlay elementId="announcements" section="announcements">
            <section className="relative z-10 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <AnnouncementsPreview />
              </div>
            </section>
          </EditOverlay>

          {/* Help Section */}
          <EditOverlay elementId="help" section="help">
            <section className="relative z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <ProfessionalHelpSection />
              </div>
            </section>
          </EditOverlay>

          {/* Gallery Section */}
          <EditOverlay elementId="gallery" section="gallery">
            <section className="relative z-10">
              <div className="w-full px-0 py-16">
                <DriveGallery />
              </div>
            </section>
          </EditOverlay>

          {/* Impact Section */}
          <EditOverlay elementId="impact" section="impact">
            <section className="relative z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <StoriesOfImpact />
              </div>
            </section>
          </EditOverlay>

          {/* Fundraiser Section */}
          <EditOverlay elementId="fundraiser" section="fundraiser">
            <section className="relative z-10 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <CurrentFundraiser />
              </div>
            </section>
          </EditOverlay>

          {/* Footer */}
          <EditOverlay elementId="footer" section="footer">
            <HHOFooter />
          </EditOverlay>
        </div>

        {/* Floating Edit Toolbar */}
        {showToolbar && selectedElement && (
          <div
            className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-2"
            style={{
              left: toolbarPosition.x,
              top: toolbarPosition.y - 60,
            }}
          >
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(selectedElement.id, selectedElement.section)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={() => handleAdd(selectedElement.section)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Add New"
              >
                <Plus className="w-4 h-4 text-green-600" />
              </button>
              <button
                onClick={() => handleDelete(selectedElement.id, selectedElement.section)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Move"
              >
                <Move className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        )}

        {/* Click outside to close toolbar */}
        {showToolbar && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowToolbar(false)}
          />
        )}

        {/* Edit Modal */}
        <EditModal
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, section: '', elementId: '', data: null })}
          section={editModal.section}
          elementId={editModal.elementId}
          data={editModal.data}
          onSave={handleEditSave}
        />
      </motion.main>
    </div>
  );
}
