'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoGalleryProps {
  images: string[];
  initialIndex: number;
  propertyAddress: string;
  onClose: () => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  images,
  initialIndex,
  propertyAddress,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0); // -1 = left, 1 = right
  const touchStartX = useRef(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= images.length) return;
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex, images.length],
  );

  const goNext = useCallback(() => {
    if (activeIndex < images.length - 1) goTo(activeIndex + 1);
  }, [activeIndex, images.length, goTo]);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, onClose]);

  // Auto-scroll thumbnail strip to keep active thumbnail visible
  useEffect(() => {
    if (activeThumbnailRef.current && thumbnailContainerRef.current) {
      const thumb = activeThumbnailRef.current;
      const container = thumbnailContainerRef.current;
      const thumbLeft = thumb.offsetLeft;
      const thumbWidth = thumb.offsetWidth;
      const containerWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;

      if (thumbLeft < scrollLeft + 40) {
        container.scrollTo({ left: thumbLeft - 40, behavior: 'smooth' });
      } else if (thumbLeft + thumbWidth > scrollLeft + containerWidth - 40) {
        container.scrollTo({
          left: thumbLeft + thumbWidth - containerWidth + 40,
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goNext();
      else goPrev();
    }
  };

  // Framer-motion variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 z-[300] bg-black/95 flex flex-col font-sans select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 text-white/80 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Images size={18} className="text-white/60" />
          <span className="text-sm font-medium">
            {activeIndex + 1} / {images.length}
          </span>
          <span className="hidden md:inline text-sm text-white/50 ml-2">
            {propertyAddress}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close gallery"
        >
          <X size={22} className="text-white" />
        </button>
      </div>

      {/* Main Image Area */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden px-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Arrow */}
        {activeIndex > 0 && (
          <button
            onClick={goPrev}
            className="hidden lg:flex absolute left-4 xl:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 items-center justify-center transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>
        )}

        {/* Image with animation */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex items-center justify-center w-full h-full"
          >
            <img
              src={images[activeIndex]}
              alt={`${propertyAddress} - Photo ${activeIndex + 1}`}
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
              referrerPolicy="no-referrer"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Right Arrow */}
        {activeIndex < images.length - 1 && (
          <button
            onClick={goNext}
            className="hidden lg:flex absolute right-4 xl:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 items-center justify-center transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight size={28} className="text-white" />
          </button>
        )}
      </div>

      {/* Thumbnail Strip — Desktop only */}
      <div className="hidden lg:block flex-shrink-0 py-4 px-8">
        <div
          ref={thumbnailContainerRef}
          className="flex gap-2 overflow-x-auto no-scrollbar justify-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              ref={idx === activeIndex ? activeThumbnailRef : undefined}
              onClick={() => goTo(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                idx === activeIndex
                  ? 'ring-2 ring-white opacity-100 scale-105'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile swipe hint — shows briefly */}
      <div className="lg:hidden flex-shrink-0 pb-6 text-center">
        <span className="text-white/40 text-xs">Swipe to navigate</span>
      </div>
    </div>
  );
};

export default PhotoGallery;
