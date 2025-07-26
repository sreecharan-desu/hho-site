"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Image as ImageIcon, Trash2, Plus } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  elementId: string;
  data: any;
  onSave: (data: any) => void;
}

export default function EditModal({ isOpen, onClose, section, elementId, data, onSave }: EditModalProps) {
  const [formData, setFormData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderHeroForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
        <textarea
          value={formData.subtitle || ''}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
        <input
          type="text"
          value={formData.cta || ''}
          onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderAboutForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Stats</label>
        <div className="space-y-2">
          {formData.stats?.map((stat: any, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={stat.value || ''}
                onChange={(e) => {
                  const newStats = [...(formData.stats || [])];
                  newStats[index] = { ...stat, value: e.target.value };
                  setFormData({ ...formData, stats: newStats });
                }}
                placeholder="Value"
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={stat.label || ''}
                onChange={(e) => {
                  const newStats = [...(formData.stats || [])];
                  newStats[index] = { ...stat, label: e.target.value };
                  setFormData({ ...formData, stats: newStats });
                }}
                placeholder="Label"
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => {
                  const newStats = formData.stats.filter((_: any, i: number) => i !== index);
                  setFormData({ ...formData, stats: newStats });
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newStats = [...(formData.stats || []), { value: '', label: '' }];
              setFormData({ ...formData, stats: newStats });
            }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Stat
          </button>
        </div>
      </div>
    </div>
  );

  const renderCampaignsForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Campaigns</label>
        <div className="space-y-4">
          {formData.events?.map((event: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Campaign {index + 1}</h4>
                <button
                  onClick={() => {
                    const newEvents = formData.events.filter((_: any, i: number) => i !== index);
                    setFormData({ ...formData, events: newEvents });
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={event.name || ''}
                  onChange={(e) => {
                    const newEvents = [...formData.events];
                    newEvents[index] = { ...event, name: e.target.value };
                    setFormData({ ...formData, events: newEvents });
                  }}
                  placeholder="Campaign Name"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={event.date || ''}
                  onChange={(e) => {
                    const newEvents = [...formData.events];
                    newEvents[index] = { ...event, date: e.target.value };
                    setFormData({ ...formData, events: newEvents });
                  }}
                  placeholder="Date"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <textarea
                  value={event.description || ''}
                  onChange={(e) => {
                    const newEvents = [...formData.events];
                    newEvents[index] = { ...event, description: e.target.value };
                    setFormData({ ...formData, events: newEvents });
                  }}
                  placeholder="Description"
                  rows={2}
                  className="p-2 border border-gray-300 rounded-md md:col-span-2"
                />
                <input
                  type="text"
                  value={event.impact || ''}
                  onChange={(e) => {
                    const newEvents = [...formData.events];
                    newEvents[index] = { ...event, impact: e.target.value };
                    setFormData({ ...formData, events: newEvents });
                  }}
                  placeholder="Impact"
                  className="p-2 border border-gray-300 rounded-md"
                />
                <select
                  value={event.status || 'active'}
                  onChange={(e) => {
                    const newEvents = [...formData.events];
                    newEvents[index] = { ...event, status: e.target.value };
                    setFormData({ ...formData, events: newEvents });
                  }}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newEvents = [...(formData.events || []), {
                name: '',
                date: '',
                description: '',
                impact: '',
                status: 'active'
              }];
              setFormData({ ...formData, events: newEvents });
            }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Campaign
          </button>
        </div>
      </div>
    </div>
  );

  const renderForm = () => {
    switch (section) {
      case 'hero':
        return renderHeroForm();
      case 'about':
        return renderAboutForm();
      case 'campaigns':
        return renderCampaignsForm();
      default:
        return (
          <div className="text-center text-gray-500">
            Edit form for {section} section coming soon...
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit {section.charAt(0).toUpperCase() + section.slice(1)} Section
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {renderForm()}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 