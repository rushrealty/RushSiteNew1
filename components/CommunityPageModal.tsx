'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface CommunityPageModalProps {
  url: string;
  communityName: string;
  onClose: () => void;
}

const CommunityPageModal: React.FC<CommunityPageModalProps> = ({ url, communityName, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full h-full md:w-[95vw] md:h-[95vh] md:max-w-7xl bg-white md:rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-gray-900 truncate">
            {communityName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Iframe Content */}
        <iframe
          src={url}
          title={communityName}
          className="w-full h-full pt-14"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default CommunityPageModal;
