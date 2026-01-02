'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AbbottsPondContent: React.FC = () => {
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(true);
  const [expandedFloorPlan, setExpandedFloorPlan] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestSubtitle, setRequestSubtitle] = useState("Abbott's Pond Acres");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [copiedLink, setCopiedLink] = useState(false);

  const galleryImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600',
    'https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?w=1600',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600',
    'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1600'
  ];

  const floorPlans = [
    { id: 'lewes', name: 'The Lewes', price: '$489,900', beds: 3, baths: 2, garage: 2, stories: 1, sqft: '2,022',
      description: 'The Lewes is a spacious single-story ranch home perfect for those seeking main-level living. Featuring an open-concept great room and kitchen, plus a luxurious owner\'s suite.',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
    { id: 'georgetown', name: 'The Georgetown', price: '$555,900', beds: 4, baths: 3.5, garage: 2, stories: 2, sqft: '2,890',
      description: 'The Georgetown offers generous living space across two floors with a first-floor owner\'s suite option. Perfect for growing families who need room to spread out.',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
    { id: 'livingston', name: 'The Livingston', price: '$599,900', beds: 5, baths: 3, garage: 2, stories: 2, sqft: '2,650',
      description: 'The Livingston is designed for families who want it all. Five bedrooms, a spacious loft, and an open main level make this the ultimate family home.',
      img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const sections = ['about', 'floorplans', 'movein', 'map', 'location'];
      let current = 'about';
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section && window.scrollY >= section.offsetTop - 200) current = sectionId;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAllModals();
      if (isLightboxOpen) {
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const openModal = (type: 'share' | 'request', subtitle?: string) => {
    if (type === 'share') setIsShareModalOpen(true);
    else { setRequestSubtitle(subtitle || "Abbott's Pond Acres"); setIsRequestModalOpen(true); }
    document.body.style.overflow = 'hidden';
  };

  const closeAllModals = () => {
    setIsShareModalOpen(false);
    setIsRequestModalOpen(false);
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) window.scrollTo({ top: section.offsetTop - 150, behavior: 'smooth' });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) { console.error('Failed to copy link'); }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Request submitted! We will contact you soon.');
    closeAllModals();
  };

  return (
    <div className="community-page">
      <style>{`
        :root { --black: #000000; --white: #ffffff; --gray-50: #fafafa; --gray-100: #f5f5f5; --gray-200: #e5e5e5; --gray-300: #d4d4d4; --gray-400: #a3a3a3; --gray-500: #737373; --gray-600: #525252; --gray-700: #404040; --gray-800: #262626; --gray-900: #171717; --gold: #d4a84b; --gold-light: #e8c97a; --success: #22c55e; }
        .community-page { font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif; color: var(--gray-900); line-height: 1.6; background: var(--white); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .hero { padding-top: 100px; background: var(--white); }
        .hero-actions { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; margin-bottom: 1rem; }
        .btn-request-info { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.875rem 1.75rem; background: var(--black); color: var(--white); font-size: 0.95rem; font-weight: 600; border-radius: 50px; border: none; cursor: pointer; transition: all 0.2s; }
        .btn-request-info:hover { background: var(--gray-800); }
        .btn-share { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.875rem 1.5rem; background: var(--white); color: var(--gray-700); font-size: 0.95rem; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s; }
        .btn-share:hover { color: var(--black); }
        .btn-share svg { width: 20px; height: 20px; }
        .hero-gallery { display: grid; grid-template-columns: 1.2fr 1fr; gap: 0.5rem; border-radius: 12px; overflow: hidden; }
        .gallery-main { position: relative; height: 400px; cursor: pointer; overflow: hidden; }
        .gallery-main img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .gallery-main:hover img { transform: scale(1.02); }
        .gallery-grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 0.5rem; }
        .gallery-item { position: relative; overflow: hidden; cursor: pointer; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .gallery-item:hover img { transform: scale(1.05); }
        .breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--gray-500); margin-top: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200); }
        .breadcrumb a { color: var(--gray-500); transition: color 0.2s; text-decoration: none; }
        .breadcrumb a:hover { color: var(--black); }
        .breadcrumb span { color: var(--gray-400); }
        .breadcrumb strong { color: var(--black); font-weight: 600; }
        .hero-info { display: flex; justify-content: space-between; align-items: flex-start; padding: 2rem 0; gap: 2rem; }
        .hero-main { flex: 1; }
        .community-status { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--gray-600); margin-bottom: 0.75rem; }
        .status-dot { width: 10px; height: 10px; background: var(--success); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        .hero-title { font-size: 2.25rem; font-weight: 800; color: var(--black); line-height: 1.2; margin-bottom: 0.5rem; }
        .hero-location { display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; color: var(--gray-600); }
        .hero-location a { color: var(--gray-600); text-decoration: underline; text-underline-offset: 2px; }
        .hero-location a:hover { color: var(--black); }
        .hero-pricing { text-align: right; }
        .price-label { font-size: 0.8rem; color: var(--gray-500); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.25rem; }
        .price-value { font-size: 2rem; font-weight: 800; color: var(--black); }
        .quick-stats { display: flex; gap: 2rem; margin-top: 1.5rem; }
        .stat { display: flex; flex-direction: column; }
        .stat-value { font-size: 1.1rem; font-weight: 700; color: var(--black); }
        .stat-label { font-size: 0.8rem; color: var(--gray-500); }
        .stat-divider { width: 1px; background: var(--gray-200); }
        .sub-nav { position: sticky; top: 80px; z-index: 100; background: var(--white); border-top: 1px solid var(--gray-200); border-bottom: 1px solid var(--gray-200); padding: 0 2rem; }
        .sub-nav-content { max-width: 1200px; margin: 0 auto; display: flex; gap: 0; }
        .sub-nav-link { padding: 1rem 1.5rem; font-size: 0.9rem; font-weight: 500; color: var(--gray-600); border-bottom: 3px solid transparent; transition: all 0.2s; text-decoration: none; }
        .sub-nav-link:hover { color: var(--black); }
        .sub-nav-link.active { color: var(--black); border-bottom-color: var(--black); }
        .about-section { padding: 4rem 0; background: var(--white); }
        .about-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; }
        .about-content h2 { font-size: 1.75rem; font-weight: 700; color: var(--black); margin-bottom: 1.5rem; }
        .about-text { color: var(--gray-600); font-size: 1rem; line-height: 1.8; }
        .about-text p { margin-bottom: 1rem; }
        .about-text.collapsed { max-height: 150px; overflow: hidden; position: relative; }
        .about-text.collapsed::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: linear-gradient(transparent, var(--white)); }
        .read-more-btn { margin-top: 1rem; padding: 0; background: none; border: none; color: var(--black); font-size: 0.9rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
        .read-more-btn svg { width: 16px; height: 16px; transition: transform 0.3s; }
        .read-more-btn.expanded svg { transform: rotate(180deg); }
        .builder-card { display: flex; align-items: center; gap: 1rem; padding: 1.25rem; background: var(--gray-50); border-radius: 12px; margin-top: 2rem; }
        .builder-logo { width: 56px; height: 56px; background: var(--white); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.7rem; color: var(--gray-600); border: 1px solid var(--gray-200); }
        .builder-info h4 { font-size: 0.95rem; font-weight: 600; color: var(--black); margin-bottom: 0.25rem; }
        .builder-info p { font-size: 0.85rem; color: var(--gray-500); }
        .features-card { background: var(--gray-900); border-radius: 16px; padding: 2rem; color: var(--white); }
        .features-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
        .features-card h3 svg { width: 20px; height: 20px; color: var(--gold); }
        .features-list { display: flex; flex-direction: column; gap: 0.875rem; }
        .feature-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.9rem; color: rgba(255,255,255,0.9); }
        .feature-item svg { width: 16px; height: 16px; color: var(--gold); flex-shrink: 0; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .section-header h2 { font-size: 1.5rem; font-weight: 700; color: var(--black); }
        .floorplans-section { padding: 4rem 0; background: var(--gray-50); }
        .floorplan-list { display: flex; flex-direction: column; gap: 1rem; }
        .floorplan-card { background: var(--white); border: 1px solid var(--gray-200); border-radius: 12px; overflow: hidden; transition: all 0.3s ease; }
        .floorplan-card:hover { border-color: var(--gray-300); box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .floorplan-main { display: grid; grid-template-columns: 320px 1fr auto; cursor: pointer; }
        .floorplan-image { position: relative; height: 200px; overflow: hidden; }
        .floorplan-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .floorplan-card:hover .floorplan-image img { transform: scale(1.05); }
        .floorplan-content { padding: 1.5rem 2rem; display: flex; flex-direction: column; justify-content: center; }
        .floorplan-name { font-size: 1.5rem; font-weight: 700; color: var(--black); margin-bottom: 0.25rem; }
        .floorplan-price { font-size: 1.1rem; font-weight: 700; color: var(--gray-700); margin-bottom: 0.75rem; }
        .floorplan-specs { display: flex; gap: 0.5rem; font-size: 0.95rem; color: var(--gray-600); flex-wrap: wrap; }
        .floorplan-specs span { display: flex; align-items: center; }
        .floorplan-specs .divider { color: var(--gray-300); }
        .floorplan-action { display: flex; align-items: center; padding: 0 2rem; }
        .floorplan-view-btn { padding: 0.875rem 1.5rem; background: var(--white); color: var(--black); font-size: 0.9rem; font-weight: 600; text-align: center; border: 2px solid var(--black); border-radius: 8px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .floorplan-view-btn:hover { background: var(--black); color: var(--white); }
        .floorplan-details { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; background: var(--gray-50); }
        .floorplan-card.expanded .floorplan-details { max-height: 600px; }
        .floorplan-details-content { padding: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .details-left h4 { font-size: 1rem; font-weight: 700; color: var(--black); margin-bottom: 1rem; }
        .details-left p { font-size: 0.95rem; color: var(--gray-600); line-height: 1.7; margin-bottom: 1.5rem; }
        .elevation-options { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; }
        .elevation-thumb { width: 80px; height: 60px; border-radius: 8px; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: border-color 0.2s; }
        .elevation-thumb:hover, .elevation-thumb.active { border-color: var(--black); }
        .elevation-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .details-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-floorplan { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.875rem 1.5rem; background: var(--black); color: var(--white); font-size: 0.9rem; font-weight: 600; border-radius: 8px; border: none; cursor: pointer; transition: background 0.2s; }
        .btn-floorplan:hover { background: var(--gray-800); }
        .btn-floorplan-outline { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.875rem 1.5rem; background: var(--white); color: var(--black); font-size: 0.9rem; font-weight: 600; border-radius: 8px; border: 2px solid var(--gray-300); cursor: pointer; transition: all 0.2s; }
        .btn-floorplan-outline:hover { border-color: var(--black); }
        .details-right { display: flex; align-items: center; justify-content: center; }
        .floorplan-diagram { width: 100%; max-width: 400px; background: var(--white); border-radius: 12px; padding: 1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.06); }
        .floorplan-diagram img { width: 100%; height: auto; border-radius: 8px; }
        .movein-section { padding: 4rem 0; background: var(--white); }
        .movein-list { display: flex; flex-direction: column; gap: 1rem; }
        .movein-card { display: grid; grid-template-columns: 280px 1fr auto; background: var(--white); border: 1px solid var(--gray-200); border-radius: 12px; overflow: hidden; transition: all 0.3s ease; }
        .movein-card:hover { border-color: var(--gray-300); box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .movein-image { position: relative; height: 180px; }
        .movein-image img { width: 100%; height: 100%; object-fit: cover; }
        .movein-status { position: absolute; top: 1rem; left: 1rem; padding: 0.35rem 0.75rem; background: var(--success); color: var(--white); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; border-radius: 4px; }
        .movein-content { padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; }
        .movein-price { font-size: 1.5rem; font-weight: 800; color: var(--black); margin-bottom: 0.25rem; }
        .movein-address { font-size: 0.95rem; color: var(--gray-600); margin-bottom: 0.75rem; }
        .movein-specs { display: flex; gap: 0.5rem; font-size: 0.9rem; color: var(--gray-600); flex-wrap: wrap; }
        .movein-specs span::after { content: '|'; margin-left: 0.5rem; color: var(--gray-300); }
        .movein-specs span:last-child::after { display: none; }
        .movein-action { display: flex; align-items: center; padding: 0 2rem; }
        .movein-btn { padding: 0.875rem 1.5rem; background: var(--white); color: var(--black); font-size: 0.9rem; font-weight: 600; text-align: center; border: 2px solid var(--black); border-radius: 8px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .movein-btn:hover { background: var(--black); color: var(--white); }
        .map-section { padding: 4rem 0; background: var(--gray-50); }
        .map-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .map-header h2 { font-size: 1.5rem; font-weight: 700; }
        .map-container { border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .map-container iframe { width: 100%; height: 500px; border: none; }
        .location-section { padding: 4rem 0; background: var(--white); }
        .location-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .location-card { background: var(--gray-50); border-radius: 12px; padding: 1.75rem; }
        .location-card h3 { font-size: 1.1rem; font-weight: 700; color: var(--black); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
        .location-card h3 svg { width: 22px; height: 22px; color: var(--gold); }
        .school-district-name { font-size: 0.95rem; color: var(--gray-600); margin-bottom: 1.25rem; }
        .school-list { list-style: none; padding: 0; margin: 0; }
        .school-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--gray-200); }
        .school-item:last-child { border-bottom: none; }
        .school-name { font-weight: 600; color: var(--black); font-size: 0.9rem; }
        .school-grades { font-size: 0.8rem; color: var(--gray-500); }
        .school-distance { font-size: 0.85rem; color: var(--gray-500); }
        .nearby-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .nearby-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: var(--white); border-radius: 8px; }
        .nearby-item svg { width: 18px; height: 18px; color: var(--gray-500); }
        .nearby-item span { flex: 1; font-size: 0.9rem; color: var(--gray-700); }
        .nearby-item .time { font-size: 0.8rem; color: var(--gray-400); }
        .cta-section { padding: 5rem 0; background: var(--gray-900); text-align: center; }
        .cta-content h2 { font-size: 2.25rem; font-weight: 700; color: var(--white); margin-bottom: 1rem; }
        .cta-content p { font-size: 1.1rem; color: rgba(255,255,255,0.7); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }
        .cta-buttons { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .btn-primary-cta { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: var(--gold); color: var(--black); font-size: 1rem; font-weight: 700; border-radius: 50px; border: none; cursor: pointer; transition: all 0.3s ease; text-decoration: none; }
        .btn-primary-cta:hover { background: var(--gold-light); }
        .btn-secondary-cta { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: transparent; color: var(--white); font-size: 1rem; font-weight: 600; border: 2px solid rgba(255,255,255,0.3); border-radius: 50px; cursor: pointer; transition: all 0.3s ease; text-decoration: none; }
        .btn-secondary-cta:hover { border-color: var(--white); background: rgba(255,255,255,0.1); }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .modal { background: var(--white); border-radius: 20px; width: 100%; max-width: 420px; max-height: 90vh; overflow-y: auto; position: relative; }
        .modal-header { padding: 1.75rem 1.75rem 0; }
        .modal-header h3 { font-size: 1.5rem; font-weight: 700; color: var(--black); text-align: center; }
        .modal-header p { text-align: center; color: var(--gray-500); margin-top: 0.25rem; }
        .modal-close { width: 40px; height: 40px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; position: absolute; top: 1rem; right: 1rem; }
        .modal-close svg { width: 24px; height: 24px; color: var(--gray-600); }
        .modal-close:hover svg { color: var(--black); }
        .modal-body { padding: 2rem; }
        .share-modal { text-align: center; }
        .share-options { display: flex; flex-direction: column; gap: 0; }
        .share-option { display: flex; align-items: center; gap: 1rem; padding: 1.25rem 0; border-bottom: 1px solid var(--gray-200); cursor: pointer; transition: background 0.2s; background: none; border-left: none; border-right: none; border-top: none; width: 100%; }
        .share-option:last-of-type { border-bottom: none; }
        .share-option:hover { background: var(--gray-50); }
        .share-option svg { width: 24px; height: 24px; color: var(--black); }
        .share-option span { font-size: 1.1rem; font-weight: 500; color: var(--black); }
        .copy-link-btn { display: flex; align-items: center; justify-content: center; gap: 0.75rem; width: 100%; padding: 1rem; margin-top: 1rem; background: var(--white); border: 2px solid var(--gray-800); border-radius: 50px; font-size: 1rem; font-weight: 600; color: var(--gray-800); cursor: pointer; transition: all 0.2s; }
        .copy-link-btn:hover { background: var(--gray-100); }
        .copy-link-btn svg { width: 20px; height: 20px; }
        .request-modal { max-width: 480px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.875rem 1rem; border: 1px solid var(--gray-300); border-radius: 8px; font-size: 1rem; font-family: inherit; transition: border-color 0.2s, box-shadow 0.2s; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--black); box-shadow: 0 0 0 3px rgba(0,0,0,0.1); }
        .form-group textarea { resize: vertical; min-height: 100px; }
        .form-submit { width: 100%; padding: 1rem; background: var(--black); color: var(--white); font-size: 1rem; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
        .form-submit:hover { background: var(--gray-800); }
        .lightbox { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 3000; display: flex; align-items: center; justify-content: center; }
        .lightbox-close { position: absolute; top: 1.5rem; right: 1.5rem; width: 48px; height: 48px; background: transparent; border: none; cursor: pointer; color: var(--white); }
        .lightbox-close svg { width: 32px; height: 32px; }
        .lightbox-content { max-width: 90%; max-height: 90%; }
        .lightbox-content img { max-width: 100%; max-height: 85vh; object-fit: contain; }
        .lightbox-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; background: rgba(255,255,255,0.1); border: none; border-radius: 50%; cursor: pointer; color: var(--white); display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .lightbox-nav:hover { background: rgba(255,255,255,0.2); }
        .lightbox-nav.prev { left: 2rem; }
        .lightbox-nav.next { right: 2rem; }
        .lightbox-counter { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); color: var(--white); font-size: 0.9rem; }
        @media (max-width: 1024px) { .hero-gallery { grid-template-columns: 1fr; } .gallery-main { height: 300px; } .gallery-grid { display: none; } .about-grid { grid-template-columns: 1fr; gap: 2rem; } .floorplan-main { grid-template-columns: 250px 1fr auto; } .floorplan-details-content { grid-template-columns: 1fr; } .movein-card { grid-template-columns: 220px 1fr auto; } .location-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .container { padding: 0 1rem; } .hero { padding-top: 80px; } .hero-actions { flex-direction: column; align-items: stretch; gap: 0.75rem; } .btn-request-info { justify-content: center; } .gallery-main { height: 250px; } .hero-info { flex-direction: column; } .hero-pricing { text-align: left; } .quick-stats { flex-wrap: wrap; gap: 1.5rem; } .sub-nav { overflow-x: auto; padding: 0 1rem; } .sub-nav-content { min-width: max-content; } .sub-nav-link { padding: 1rem; font-size: 0.85rem; } .floorplan-main { grid-template-columns: 1fr; } .floorplan-image { height: 200px; } .floorplan-content { padding: 1.25rem; } .floorplan-action { padding: 0 1.25rem 1.25rem; } .floorplan-view-btn { width: 100%; } .movein-card { grid-template-columns: 1fr; } .movein-image { height: 200px; } .movein-action { padding: 0 1.25rem 1.25rem; } .movein-btn { width: 100%; } .map-header { flex-direction: column; align-items: flex-start; gap: 1rem; } .map-container iframe { height: 400px; } .cta-content h2 { font-size: 1.75rem; } .form-row { grid-template-columns: 1fr; } .details-actions { flex-direction: column; } .btn-floorplan, .btn-floorplan-outline { width: 100%; justify-content: center; } }
      `}</style>

      <section className="hero">
        <div className="container">
          <div className="hero-actions">
            <div><button className="btn-request-info" onClick={() => openModal('request')}>Request information</button></div>
            <button className="btn-share" onClick={() => openModal('share')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>Share</button>
          </div>
          <div className="hero-gallery">
            <div className="gallery-main" onClick={() => openLightbox(0)}><img src={galleryImages[0]} alt="Abbott's Pond Acres Model Home" /></div>
            <div className="gallery-grid">{[1,2,3,4].map(i => <div key={i} className="gallery-item" onClick={() => openLightbox(i)}><img src={galleryImages[i]} alt={`Gallery ${i}`} /></div>)}</div>
          </div>
          <div className="breadcrumb"><Link href="/new-construction">New Construction</Link><span>→</span><Link href="/available-communities">Communities</Link><span>→</span><strong>Abbott&apos;s Pond Acres</strong></div>
          <div className="hero-info">
            <div className="hero-main">
              <div className="community-status"><span className="status-dot"></span>Now Selling</div>
              <h1 className="hero-title">Abbott&apos;s Pond Acres</h1>
              <div className="hero-location"><a href="https://maps.google.com/?q=123+Model+Home+Drive,+Clayton,+DE+19938" target="_blank" rel="noopener noreferrer">123 Model Home Drive, Clayton, DE 19938</a></div>
              <div className="quick-stats">
                <div className="stat"><span className="stat-value">3 - 5</span><span className="stat-label">Bedrooms</span></div><div className="stat-divider"></div>
                <div className="stat"><span className="stat-value">2 - 3.5</span><span className="stat-label">Bathrooms</span></div><div className="stat-divider"></div>
                <div className="stat"><span className="stat-value">2</span><span className="stat-label">Garage</span></div><div className="stat-divider"></div>
                <div className="stat"><span className="stat-value">1 - 2</span><span className="stat-label">Stories</span></div><div className="stat-divider"></div>
                <div className="stat"><span className="stat-value">2,022 - 2,890</span><span className="stat-label">Sq. Ft.</span></div>
              </div>
            </div>
            <div className="hero-pricing"><div className="price-label">Starting From</div><div className="price-value">$489,900</div></div>
          </div>
        </div>
      </section>

      <nav className="sub-nav"><div className="sub-nav-content">
        <a href="#about" className={`sub-nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'about')}>Overview</a>
        <a href="#floorplans" className={`sub-nav-link ${activeSection === 'floorplans' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'floorplans')}>Floor Plans</a>
        <a href="#movein" className={`sub-nav-link ${activeSection === 'movein' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'movein')}>Move-In Ready</a>
        <a href="#map" className={`sub-nav-link ${activeSection === 'map' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'map')}>Site Map</a>
        <a href="#location" className={`sub-nav-link ${activeSection === 'location' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'location')}>Location</a>
      </div></nav>

      <section className="about-section" id="about"><div className="container"><div className="about-grid">
        <div className="about-content">
          <h2>About Abbott&apos;s Pond Acres</h2>
          <div className={`about-text ${isAboutCollapsed ? 'collapsed' : ''}`}>
            <p>Discover peaceful country living just minutes from Dover in the heart of Kent County. Abbott&apos;s Pond Acres offers spacious homesites, modern floor plans, and the charm of rural Delaware without sacrificing convenience.</p>
            <p>Each home features open-concept layouts, energy-efficient construction, and the quality craftsmanship you expect from Ashburn Homes. With quick access to Route 13 and downtown Dover, you&apos;ll enjoy the perfect blend of tranquility and accessibility.</p>
            <p>The community features upcoming amenities including a tot lot and playground for children, as well as a picnic pavilion overlooking the community open space.</p>
          </div>
          <button className={`read-more-btn ${!isAboutCollapsed ? 'expanded' : ''}`} onClick={() => setIsAboutCollapsed(!isAboutCollapsed)}>{isAboutCollapsed ? 'Read more' : 'Read less'}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg></button>
          <div className="builder-card"><div className="builder-logo">ASHBURN</div><div className="builder-info"><h4>Built by Ashburn Homes</h4><p>40+ years building quality homes in Delaware</p></div></div>
        </div>
        <div className="features-card">
          <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Standard Features</h3>
          <div className="features-list">{['Granite Countertops','Stainless Steel Appliances','LVP Flooring Throughout',"9' Ceilings on First Floor",'2-Car Attached Garage','Energy Star Certified','Smart Home Technology','Full Landscaping Included'].map((f,i)=><div key={i} className="feature-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span>{f}</span></div>)}</div>
        </div>
      </div></div></section>

      <section className="floorplans-section" id="floorplans"><div className="container">
        <div className="section-header"><h2>Floor plans in this community ({floorPlans.length})</h2></div>
        <div className="floorplan-list">{floorPlans.map(plan => (
          <div key={plan.id} className={`floorplan-card ${expandedFloorPlan === plan.id ? 'expanded' : ''}`}>
            <div className="floorplan-main" onClick={() => setExpandedFloorPlan(expandedFloorPlan === plan.id ? null : plan.id)}>
              <div className="floorplan-image"><img src={plan.img} alt={plan.name} /></div>
              <div className="floorplan-content">
                <h3 className="floorplan-name">{plan.name}</h3>
                <div className="floorplan-price">Starting at {plan.price}</div>
                <div className="floorplan-specs"><span>{plan.beds} Bed</span><span className="divider">|</span><span>{plan.baths} Bath</span><span className="divider">|</span><span>{plan.garage} Garage</span><span className="divider">|</span><span>{plan.stories} Story</span><span className="divider">|</span><span>{plan.sqft} Sq. Ft.</span></div>
              </div>
              <div className="floorplan-action"><button className="floorplan-view-btn">View Details</button></div>
            </div>
            <div className="floorplan-details"><div className="floorplan-details-content">
              <div className="details-left">
                <h4>About {plan.name}</h4><p>{plan.description}</p>
                <h4>Elevation Options</h4>
                <div className="elevation-options"><div className="elevation-thumb active"><img src={plan.img} alt="Elevation A" /></div><div className="elevation-thumb"><img src={galleryImages[1]} alt="Elevation B" /></div><div className="elevation-thumb"><img src={galleryImages[2]} alt="Elevation C" /></div></div>
                <div className="details-actions">
                  <button className="btn-floorplan" onClick={(e) => {e.stopPropagation(); openModal('request', plan.name);}}>Request Info</button>
                  <button className="btn-floorplan-outline"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>View Floor Plan</button>
                </div>
              </div>
              <div className="details-right"><div className="floorplan-diagram"><img src={plan.img} alt={`${plan.name} floor plan`} /></div></div>
            </div></div>
          </div>
        ))}</div>
      </div></section>

      <section className="movein-section" id="movein"><div className="container">
        <div className="section-header"><h2>Homes for sale in this community (2)</h2></div>
        <div className="movein-list">
          <div className="movein-card"><div className="movein-image"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800" alt="Move-in ready" /><span className="movein-status">Ready Now</span></div><div className="movein-content"><div className="movein-price">$525,000</div><div className="movein-address">123 Abbott Lane, Lot 24</div><div className="movein-specs"><span>4 Bed</span><span>3 Bath</span><span>2 Garage</span><span>2 Story</span><span>2,450 Sq. Ft.</span></div></div><div className="movein-action"><button className="movein-btn" onClick={() => openModal('request', '123 Abbott Lane')}>View Details</button></div></div>
          <div className="movein-card"><div className="movein-image"><img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800" alt="Move-in ready" /><span className="movein-status">Move-In Aug</span></div><div className="movein-content"><div className="movein-price">$549,900</div><div className="movein-address">125 Abbott Lane, Lot 26</div><div className="movein-specs"><span>5 Bed</span><span>3 Bath</span><span>2 Garage</span><span>2 Story</span><span>2,650 Sq. Ft.</span></div></div><div className="movein-action"><button className="movein-btn" onClick={() => openModal('request', '125 Abbott Lane')}>View Details</button></div></div>
        </div>
      </div></section>

      <section className="map-section" id="map"><div className="container"><div className="map-header"><h2>Interactive Site Map</h2></div><div className="map-container"><iframe src="https://app.higharc.com/builders/NrnKLBX5m3X2WpAR/locations/RBmOqZ9Y0jZoy8VD/sales-map" title="Site Map" /></div></div></section>

      <section className="location-section" id="location"><div className="container"><div className="location-grid">
        <div className="location-card">
          <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Schools</h3>
          <p className="school-district-name">Served by <strong>Smyrna School District</strong></p>
          <ul className="school-list">
            <li className="school-item"><div><div className="school-name">Smyrna Elementary</div><div className="school-grades">Grades K-4</div></div><div className="school-distance">2.3 mi</div></li>
            <li className="school-item"><div><div className="school-name">Smyrna Middle School</div><div className="school-grades">Grades 5-8</div></div><div className="school-distance">3.1 mi</div></li>
            <li className="school-item"><div><div className="school-name">Smyrna High School</div><div className="school-grades">Grades 9-12</div></div><div className="school-distance">3.4 mi</div></li>
          </ul>
        </div>
        <div className="location-card">
          <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>What&apos;s Nearby</h3>
          <div className="nearby-list">
            <div className="nearby-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Smyrna Walmart & Shopping</span><span className="time">4 min</span></div>
            <div className="nearby-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Local Restaurants & Dining</span><span className="time">5 min</span></div>
            <div className="nearby-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Bayhealth Hospital</span><span className="time">12 min</span></div>
            <div className="nearby-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Dover Mall & Outlets</span><span className="time">15 min</span></div>
          </div>
        </div>
      </div></div></section>

      <section className="cta-section"><div className="container"><div className="cta-content">
        <h2>Ready to Find Your New Home?</h2>
        <p>Schedule a private tour of Abbott&apos;s Pond Acres and discover why families love living here.</p>
        <div className="cta-buttons">
          <button className="btn-primary-cta" onClick={() => openModal('request')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Schedule a Tour</button>
          <a href="tel:302-219-6707" className="btn-secondary-cta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>Call 302-219-6707</a>
        </div>
      </div></div></section>

      {isShareModalOpen && <div className="modal-overlay" onClick={closeAllModals}><div className="modal share-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeAllModals}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        <div className="modal-header"><h3>Share with friends</h3></div>
        <div className="modal-body">
          <div className="share-options">
            <button className="share-option" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg><span>Facebook</span></button>
            <button className="share-option" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg><span>LinkedIn</span></button>
            <button className="share-option" onClick={() => window.location.href = `mailto:?subject=Check out Abbott's Pond Acres&body=${encodeURIComponent(window.location.href)}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span>Email</span></button>
          </div>
          <button className="copy-link-btn" onClick={copyLink}>{copiedLink ? <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Link copied!</> : <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>Copy link</>}</button>
        </div>
      </div></div>}

      {isRequestModalOpen && <div className="modal-overlay" onClick={closeAllModals}><div className="modal request-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={closeAllModals}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        <div className="modal-header"><h3>Request Information</h3><p>{requestSubtitle}</p></div>
        <div className="modal-body"><form onSubmit={handleFormSubmit}>
          <div className="form-row"><div className="form-group"><label htmlFor="firstName">First Name *</label><input type="text" id="firstName" required /></div><div className="form-group"><label htmlFor="lastName">Last Name *</label><input type="text" id="lastName" required /></div></div>
          <div className="form-group"><label htmlFor="email">Email *</label><input type="email" id="email" required /></div>
          <div className="form-group"><label htmlFor="phone">Phone *</label><input type="tel" id="phone" required /></div>
          <div className="form-group"><label htmlFor="interest">I&apos;m Interested In</label><select id="interest"><option value="">Select an option</option><option value="tour">Scheduling a Tour</option><option value="floorplan">Floor Plan Information</option><option value="pricing">Current Pricing</option><option value="availability">Lot Availability</option></select></div>
          <div className="form-group"><label htmlFor="message">Message</label><textarea id="message" placeholder="Tell us about your timeline, questions, or what you're looking for..."></textarea></div>
          <button type="submit" className="form-submit">Submit Request</button>
        </form></div>
      </div></div>}

      {isLightboxOpen && <div className="lightbox">
        <button className="lightbox-close" onClick={closeAllModals}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        <button className="lightbox-nav prev" onClick={prevLightbox}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg></button>
        <div className="lightbox-content"><img src={galleryImages[lightboxIndex]} alt={`Gallery ${lightboxIndex + 1}`} /></div>
        <button className="lightbox-nav next" onClick={nextLightbox}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></button>
        <div className="lightbox-counter"><span>{lightboxIndex + 1}</span> / <span>{galleryImages.length}</span></div>
      </div>}
    </div>
  );
};

export default AbbottsPondContent;
