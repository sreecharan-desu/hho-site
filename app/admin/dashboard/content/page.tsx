"use client";

import { useState } from 'react';

export default function Content() {
  const [content, setContent] = useState({
    heroTitle: "Small Acts. Big Impact",
    heroSubtitle: "Together, we create hope and support during life's most challenging moments.",
    aboutDescription: "A student-led nonprofit at RGUKT Ongole, dedicated to providing financial assistance for health challenges, empowering education, and fostering community support through sustainable initiatives."
  });

  const handleSave = async () => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        alert('Content updated successfully!');
      } else {
        alert('Failed to update content');
      }
    } catch (error) {
      console.error('Error updating content:', error);
      alert('Error updating content');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Title
            </label>
            <input
              type="text"
              value={content.heroTitle}
              onChange={(e) => setContent({...content, heroTitle: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Subtitle
            </label>
            <textarea
              value={content.heroSubtitle}
              onChange={(e) => setContent({...content, heroSubtitle: e.target.value})}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">About Section</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About Description
          </label>
          <textarea
            value={content.aboutDescription}
            onChange={(e) => setContent({...content, aboutDescription: e.target.value})}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
