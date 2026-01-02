
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const WigginsMill: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSubNavLink, setActiveSubNavLink] = useState('overview');

  const galleryImages = [
    'https://drive.google.com/thumbnail?id=1GAaP2HYSxHD93csWawWXxZGM2OpG-pEO&sz=w1600',
    'https://drive.google.com/thumbnail?id=1y9g3yC7xsUJcNvjBV4VFqOCZ3QAj4x8a&sz=w1600',
    'https://drive.google.com/thumbnail?id=178Y-s5tVDyGmz54mUj3YgSol06vtiO0e&sz=w1600',
    'https://drive.google.com/thumbnail?id=1weoUa0mNLalFn7-GFpBHbBRkiYEpgkwY&sz=w1600',
    'https://drive.google.com/thumbnail?id=1NTdmXGvWY9IQyROfmOXIZaC6X-2dzxNz&sz=w1600'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'features', 'upgrades', 'tour', 'schools', 'location'];
      let current = 'overview';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 150) {
          current = section;
        }
      }
      setActiveSubNavLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  const scrollToAnchor = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 140, behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: '404 Wiggins Mill Rd - Luxury Ocean View Model',
        text: 'Stunning 5BR home with premium upgrades on 2 acres!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="wiggins-standalone-v2">
      <style>{`
        /* Original Styles Here... */
        .wiggins-standalone-v2 { font-family: 'Montserrat', sans-serif; }
      `}</style>
      <section className="hero" id="overview">
        <div className="container">
            <div className="hero-actions">
                <button className="btn-primary" onClick={openModal}>Schedule a Showing</button>
                <div className="hero-actions-right">
                    <button className="btn-ghost" onClick={handleShare}>Share</button>
                </div>
            </div>
            <div className="hero-gallery">
                <div className="gallery-main" onClick={() => openLightbox(0)}>
                    <img src={galleryImages[0]} alt="Front" />
                </div>
            </div>
            <div className="breadcrumb">
                <Link href="/">Home</Link><span>→</span><Link href="/available-communities">Communities</Link><span>→</span><strong>404 Wiggins Mill Rd</strong>
            </div>
            <div className="hero-info">
                <h1 className="hero-title">404 Wiggins Mill Rd</h1>
                <div className="price-value">$1,329,000</div>
            </div>
        </div>
      </section>
      {/* Rest of WigginsMill Content... */}
    </div>
  );
};

export default WigginsMill;
