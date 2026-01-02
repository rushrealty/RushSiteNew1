import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    document.title = "404 Wiggins Mill Rd | Luxury New Construction in Townsend, DE | Rush Home Team";
    window.scrollTo(0, 0);

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
    if (navigator.share) {
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
        .wiggins-standalone-v2 {
            --black: #000000;
            --white: #ffffff;
            --gray-50: #fafafa;
            --gray-100: #f5f5f5;
            --gray-200: #e5e5e5;
            --gray-300: #d4d4d4;
            --gray-400: #a3a3a3;
            --gray-500: #737373;
            --gray-600: #525252;
            --gray-700: #404040;
            --gray-800: #262626;
            --gray-900: #171717;
            --gold: #d4a84b;
            --gold-light: #e8c97a;
            --success: #22c55e;
            font-family: 'Montserrat', sans-serif;
            color: var(--gray-900);
            line-height: 1.6;
            background: var(--white);
        }
        .wiggins-standalone-v2 * { margin: 0; padding: 0; box-sizing: border-box; }
        .wiggins-standalone-v2 .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .wiggins-standalone-v2 .hero { padding-top: 100px; background: var(--white); }
        .wiggins-standalone-v2 .hero-actions { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; margin-bottom: 1rem; }
        .wiggins-standalone-v2 .btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.875rem 1.75rem; background: var(--black); color: var(--white); font-size: 0.95rem; font-weight: 600; border-radius: 50px; border: none; cursor: pointer; transition: all 0.2s; }
        .wiggins-standalone-v2 .btn-primary:hover { background: var(--gray-800); }
        .wiggins-standalone-v2 .btn-ghost { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.875rem 1.5rem; background: var(--white); color: var(--gray-700); font-size: 0.95rem; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s; }
        .wiggins-standalone-v2 .btn-ghost:hover { color: var(--black); }
        .wiggins-standalone-v2 .btn-ghost svg { width: 20px; height: 20px; }
        .wiggins-standalone-v2 .hero-actions-right { display: flex; align-items: center; gap: 0.5rem; }
        .wiggins-standalone-v2 .hero-gallery { display: grid; grid-template-columns: 1.2fr 1fr; gap: 0.5rem; border-radius: 12px; overflow: hidden; }
        .wiggins-standalone-v2 .gallery-main { position: relative; height: 450px; cursor: pointer; }
        .wiggins-standalone-v2 .gallery-main img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .wiggins-standalone-v2 .gallery-main:hover img { transform: scale(1.02); }
        .wiggins-standalone-v2 .gallery-grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 0.5rem; }
        .wiggins-standalone-v2 .gallery-item { position: relative; overflow: hidden; cursor: pointer; }
        .wiggins-standalone-v2 .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .wiggins-standalone-v2 .gallery-item:hover img { transform: scale(1.05); }
        .wiggins-standalone-v2 .virtual-tour-badge { position: absolute; top: 1rem; left: 1rem; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--black); color: var(--white); font-size: 0.8rem; font-weight: 600; border-radius: 50px; cursor: pointer; transition: all 0.2s; }
        .wiggins-standalone-v2 .virtual-tour-badge:hover { background: var(--gray-800); }
        .wiggins-standalone-v2 .virtual-tour-badge svg { width: 16px; height: 16px; }
        .wiggins-standalone-v2 .breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--gray-500); margin-top: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200); }
        .wiggins-standalone-v2 .breadcrumb a { color: var(--gray-500); transition: color 0.2s; }
        .wiggins-standalone-v2 .breadcrumb a:hover { color: var(--black); }
        .wiggins-standalone-v2 .breadcrumb span { color: var(--gray-400); }
        .wiggins-standalone-v2 .breadcrumb strong { color: var(--black); font-weight: 600; }
        .wiggins-standalone-v2 .hero-info { display: flex; justify-content: space-between; align-items: flex-start; padding: 2rem 0; gap: 2rem; }
        .wiggins-standalone-v2 .hero-main { flex: 1; }
        .wiggins-standalone-v2 .property-badges { display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .wiggins-standalone-v2 .badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.85rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 4px; }
        .wiggins-standalone-v2 .badge-new { background: var(--success); color: var(--white); }
        .wiggins-standalone-v2 .badge-featured { background: var(--gold); color: var(--black); }
        .wiggins-standalone-v2 .badge-upgrades { background: var(--gray-900); color: var(--white); }
        .wiggins-standalone-v2 .hero-title { font-size: 2.25rem; font-weight: 800; color: var(--black); line-height: 1.2; margin-bottom: 0.5rem; }
        .wiggins-standalone-v2 .hero-subtitle { font-size: 1rem; color: var(--gray-600); margin-bottom: 0.5rem; }
        .wiggins-standalone-v2 .hero-location { display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; color: var(--gray-600); }
        .wiggins-standalone-v2 .hero-location svg { width: 18px; height: 18px; }
        .wiggins-standalone-v2 .hero-location a { color: var(--gray-600); text-decoration: underline; text-underline-offset: 2px; }
        .wiggins-standalone-v2 .hero-location a:hover { color: var(--black); }
        .wiggins-standalone-v2 .hero-pricing { text-align: right; }
        .wiggins-standalone-v2 .price-value { font-size: 2.25rem; font-weight: 800; color: var(--black); margin-bottom: 0.25rem; }
        .wiggins-standalone-v2 .price-per-sqft { font-size: 0.9rem; color: var(--gray-500); }
        .wiggins-standalone-v2 .quick-stats { display: flex; gap: 2rem; margin-top: 1.5rem; flex-wrap: wrap; }
        .wiggins-standalone-v2 .stat { display: flex; flex-direction: column; }
        .wiggins-standalone-v2 .stat-value { font-size: 1.25rem; font-weight: 700; color: var(--black); }
        .wiggins-standalone-v2 .stat-label { font-size: 0.8rem; color: var(--gray-500); }
        .wiggins-standalone-v2 .stat-divider { width: 1px; background: var(--gray-200); }
        .wiggins-standalone-v2 .sub-nav { position: sticky; top: 80px; z-index: 100; background: var(--white); border-top: 1px solid var(--gray-200); border-bottom: 1px solid var(--gray-200); padding: 0 2rem; }
        .wiggins-standalone-v2 .sub-nav-content { max-width: 1200px; margin: 0 auto; display: flex; gap: 0; overflow-x: auto; }
        .wiggins-standalone-v2 .sub-nav-link { padding: 1rem 1.5rem; font-size: 0.9rem; font-weight: 500; color: var(--gray-600); border-bottom: 3px solid transparent; transition: all 0.2s; white-space: nowrap; }
        .wiggins-standalone-v2 .sub-nav-link:hover { color: var(--black); }
        .wiggins-standalone-v2 .sub-nav-link.active { color: var(--black); border-bottom-color: var(--black); }
        .wiggins-standalone-v2 .section { padding: 4rem 0; }
        .wiggins-standalone-v2 .section-alt { padding: 4rem 0; background: var(--gray-50); }
        .wiggins-standalone-v2 .section-header { margin-bottom: 2rem; text-align: left; }
        .wiggins-standalone-v2 .section-header h2 { font-size: 1.75rem; font-weight: 700; color: var(--black); }
        .wiggins-standalone-v2 .section-header p { color: var(--gray-600); margin-top: 0.5rem; }
        .wiggins-standalone-v2 .description-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; }
        .wiggins-standalone-v2 .description-text { color: var(--gray-600); font-size: 1rem; line-height: 1.8; text-align: left; }
        .wiggins-standalone-v2 .description-text p { margin-bottom: 1.5rem; }
        .wiggins-standalone-v2 .details-card { background: var(--gray-900); border-radius: 16px; padding: 2rem; color: var(--white); }
        .wiggins-standalone-v2 .details-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
        .wiggins-standalone-v2 .details-card h3 svg { width: 20px; height: 20px; }
        .wiggins-standalone-v2 .details-list { display: flex; flex-direction: column; gap: 1rem; }
        .wiggins-standalone-v2 .detail-item { display: flex; justify-content: space-between; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-700); }
        .wiggins-standalone-v2 .detail-item:last-child { border-bottom: none; padding-bottom: 0; }
        .wiggins-standalone-v2 .detail-label { color: var(--gray-400); font-size: 0.9rem; }
        .wiggins-standalone-v2 .detail-value { font-weight: 600; font-size: 0.9rem; }
        .wiggins-standalone-v2 .upgrades-highlight { background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%); border-radius: 16px; padding: 2rem; margin-top: 1.5rem; text-align: center; }
        .wiggins-standalone-v2 .upgrades-highlight h4 { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--black); margin-bottom: 0.5rem; }
        .wiggins-standalone-v2 .upgrades-highlight .amount { font-size: 2rem; font-weight: 800; color: var(--black); }
        .wiggins-standalone-v2 .upgrades-highlight p { font-size: 0.85rem; color: var(--gray-800); margin-top: 0.5rem; }
        .wiggins-standalone-v2 .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .wiggins-standalone-v2 .feature-category { background: var(--white); border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem; }
        .wiggins-standalone-v2 .feature-category h3 { font-size: 1rem; font-weight: 700; color: var(--black); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200); }
        .wiggins-standalone-v2 .feature-category h3 svg { width: 20px; height: 20px; color: var(--gold); }
        .wiggins-standalone-v2 .feature-list { list-style: none; }
        .wiggins-standalone-v2 .feature-list li { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.5rem 0; font-size: 0.9rem; color: var(--gray-600); line-height: 1.4; text-align: left; }
        .wiggins-standalone-v2 .feature-list li svg { width: 16px; height: 16px; color: var(--success); flex-shrink: 0; margin-top: 2px; }
        .wiggins-standalone-v2 .appliances-section { background: var(--gray-900); border-radius: 16px; padding: 2.5rem; margin-top: 2rem; text-align: left; }
        .wiggins-standalone-v2 .appliances-section h3 { font-size: 1.25rem; font-weight: 700; color: var(--white); margin-bottom: 0.5rem; }
        .wiggins-standalone-v2 .appliances-section .subtitle { color: var(--gray-400); font-size: 0.9rem; margin-bottom: 2rem; }
        .wiggins-standalone-v2 .appliances-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .wiggins-standalone-v2 .appliance-item { text-align: center; }
        .wiggins-standalone-v2 .appliance-icon { width: 48px; height: 48px; margin: 0 auto 1rem; background: var(--gray-800); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .wiggins-standalone-v2 .appliance-icon svg { width: 24px; height: 24px; color: var(--gold); }
        .wiggins-standalone-v2 .appliance-item h4 { font-size: 0.9rem; font-weight: 600; color: var(--white); margin-bottom: 0.25rem; }
        .wiggins-standalone-v2 .appliance-item p { font-size: 0.8rem; color: var(--gray-400); }
        .wiggins-standalone-v2 .tour-container { border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .wiggins-standalone-v2 .tour-container iframe { width: 100%; height: 500px; border: none; }
        .wiggins-standalone-v2 .schools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .wiggins-standalone-v2 .school-card { background: var(--white); border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem; transition: all 0.3s; text-align: left; }
        .wiggins-standalone-v2 .school-card:hover { border-color: var(--gray-300); box-shadow: 0 8px 30px rgba(0,0,0,0.1); }
        .wiggins-standalone-v2 .school-rating { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: var(--success); color: var(--white); font-size: 1.25rem; font-weight: 800; border-radius: 10px; margin-bottom: 1rem; }
        .wiggins-standalone-v2 .school-name { font-size: 1rem; font-weight: 600; color: var(--black); margin-bottom: 0.25rem; }
        .wiggins-standalone-v2 .school-type { font-size: 0.85rem; color: var(--gray-500); margin-bottom: 0.5rem; }
        .wiggins-standalone-v2 .school-distance { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--gray-600); }
        .wiggins-standalone-v2 .school-distance svg { width: 14px; height: 14px; }
        .wiggins-standalone-v2 .location-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .wiggins-standalone-v2 .map-container { border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .wiggins-standalone-v2 .map-container iframe { width: 100%; height: 400px; border: none; }
        .wiggins-standalone-v2 .location-info { text-align: left; }
        .wiggins-standalone-v2 .location-info h3 { font-size: 1.25rem; font-weight: 700; color: var(--black); margin-bottom: 1rem; }
        .wiggins-standalone-v2 .location-item { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--gray-200); }
        .wiggins-standalone-v2 .location-item:last-child { border-bottom: none; }
        .wiggins-standalone-v2 .location-item svg { width: 20px; height: 20px; color: var(--gray-500); flex-shrink: 0; margin-top: 2px; }
        .wiggins-standalone-v2 .location-item-content h4 { font-size: 0.95rem; font-weight: 600; color: var(--black); margin-bottom: 0.25rem; }
        .wiggins-standalone-v2 .location-item-content p { font-size: 0.9rem; color: var(--gray-600); }
        .wiggins-standalone-v2 .cta-section-standalone { padding: 5rem 0; background: var(--gray-900); color: var(--white); text-align: center; }
        .wiggins-standalone-v2 .cta-section-standalone h2 { font-size: 2rem; font-weight: 800; margin-bottom: 1rem; }
        .wiggins-standalone-v2 .cta-section-standalone p { color: var(--gray-400); font-size: 1.1rem; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }
        .wiggins-standalone-v2 .cta-buttons-standalone { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .wiggins-standalone-v2 .btn-cta-primary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: var(--white); color: var(--black); font-size: 1rem; font-weight: 600; border-radius: 50px; border: none; cursor: pointer; transition: all 0.2s; }
        .wiggins-standalone-v2 .btn-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(255,255,255,0.2); }
        .wiggins-standalone-v2 .btn-cta-secondary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: transparent; color: var(--white); font-size: 1rem; font-weight: 600; border-radius: 50px; border: 2px solid var(--white); cursor: pointer; transition: all 0.2s; }
        .wiggins-standalone-v2 .btn-cta-secondary:hover { background: var(--white); color: var(--black); }
        .wiggins-standalone-v2 .agent-card { display: flex; align-items: center; gap: 1.5rem; background: var(--white); border-radius: 12px; padding: 1.5rem; margin-top: 2rem; max-width: 400px; margin-left: auto; margin-right: auto; }
        .wiggins-standalone-v2 .agent-photo { width: 64px; height: 64px; border-radius: 50%; background: var(--gray-200); overflow: hidden; }
        .wiggins-standalone-v2 .agent-photo img { width: 100%; height: 100%; object-fit: cover; }
        .wiggins-standalone-v2 .agent-info h4 { font-size: 1rem; font-weight: 700; color: var(--black); }
        .wiggins-standalone-v2 .agent-info p { font-size: 0.85rem; color: var(--gray-600); margin-bottom: 0; }
        .wiggins-standalone-v2 .modal-overlay-standalone { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
        .wiggins-standalone-v2 .modal-overlay-standalone.active { opacity: 1; visibility: visible; }
        .wiggins-standalone-v2 .modal-standalone { background: var(--white); border-radius: 16px; padding: 2rem; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto; transform: translateY(20px); transition: transform 0.3s ease; text-align: left; }
        .wiggins-standalone-v2 .modal-overlay-standalone.active .modal-standalone { transform: translateY(0); }
        .wiggins-standalone-v2 .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .wiggins-standalone-v2 .modal-header h3 { font-size: 1.25rem; font-weight: 700; }
        .wiggins-standalone-v2 .modal-close { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: var(--gray-100); border: none; border-radius: 50%; cursor: pointer; transition: all 0.2s; }
        .wiggins-standalone-v2 .modal-close:hover { background: var(--gray-200); }
        .wiggins-standalone-v2 .form-group { margin-bottom: 1.25rem; }
        .wiggins-standalone-v2 .form-label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem; }
        .wiggins-standalone-v2 .form-input { width: 100%; padding: 0.875rem 1rem; font-size: 0.95rem; font-family: inherit; background: var(--white); border: 1px solid var(--gray-300); border-radius: 8px; transition: all 0.2s ease; }
        .wiggins-standalone-v2 .form-input:focus { outline: none; border-color: var(--black); box-shadow: 0 0 0 3px rgba(0,0,0,0.1); }
        .wiggins-standalone-v2 .form-textarea { resize: vertical; min-height: 100px; }
        .wiggins-standalone-v2 .form-submit { width: 100%; padding: 1rem; background: var(--black); color: var(--white); font-size: 1rem; font-weight: 600; border: none; border-radius: 50px; cursor: pointer; transition: all 0.2s; }
        .wiggins-standalone-v2 .form-submit:hover { background: var(--gray-800); }
        .wiggins-standalone-v2 .lightbox-standalone { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 3000; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
        .wiggins-standalone-v2 .lightbox-standalone.active { opacity: 1; visibility: visible; }
        .wiggins-standalone-v2 .lightbox-content { max-width: 90vw; max-height: 90vh; }
        .wiggins-standalone-v2 .lightbox-content img { max-width: 100%; max-height: 90vh; object-fit: contain; }
        .wiggins-standalone-v2 .lightbox-close { position: absolute; top: 2rem; right: 2rem; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--white); border: none; border-radius: 50%; cursor: pointer; }
        .wiggins-standalone-v2 .lightbox-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--white); border: none; border-radius: 50%; cursor: pointer; }
        .wiggins-standalone-v2 .lightbox-prev { left: 2rem; }
        .wiggins-standalone-v2 .lightbox-next { right: 2rem; }
        .wiggins-standalone-v2 .lightbox-counter { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); color: var(--white); font-size: 0.9rem; }
        @media (max-width: 1024px) {
            .wiggins-standalone-v2 .hero-gallery { grid-template-columns: 1fr; }
            .wiggins-standalone-v2 .gallery-main { height: 350px; }
            .wiggins-standalone-v2 .gallery-grid { display: none; }
            .wiggins-standalone-v2 .description-grid { grid-template-columns: 1fr; gap: 2rem; }
            .wiggins-standalone-v2 .features-grid { grid-template-columns: repeat(2, 1fr); }
            .wiggins-standalone-v2 .schools-grid { grid-template-columns: repeat(2, 1fr); }
            .wiggins-standalone-v2 .location-grid { grid-template-columns: 1fr; }
            .wiggins-standalone-v2 .appliances-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
            .wiggins-standalone-v2 .container { padding: 0 1rem; }
            .wiggins-standalone-v2 .hero-info { flex-direction: column; }
            .wiggins-standalone-v2 .hero-pricing { text-align: left; }
            .wiggins-standalone-v2 .quick-stats { gap: 1rem; }
            .wiggins-standalone-v2 .features-grid { grid-template-columns: 1fr; }
            .wiggins-standalone-v2 .schools-grid { grid-template-columns: 1fr; }
            .wiggins-standalone-v2 .appliances-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <section className="hero" id="overview">
        <div className="container">
            <div className="hero-actions">
                <button className="btn-primary" onClick={openModal}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Schedule a Showing
                </button>
                <div className="hero-actions-right">
                    <button className="btn-ghost" onClick={handleShare}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                        Share
                    </button>
                </div>
            </div>
            <div className="hero-gallery">
                <div className="gallery-main" onClick={() => openLightbox(0)}>
                    <img src={galleryImages[0]} alt="404 Wiggins Mill Rd - Front Exterior" />
                    <a href="https://my.matterport.com/show/?m=EE9Lv7CsBJD&mls=1" target="_blank" rel="noopener noreferrer" className="virtual-tour-badge" onClick={(e) => e.stopPropagation()}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        3D Virtual Tour
                    </a>
                </div>
                <div className="gallery-grid">
                    <div className="gallery-item" onClick={() => openLightbox(1)}><img src={galleryImages[1]} alt="Interior View 1" /></div>
                    <div className="gallery-item" onClick={() => openLightbox(2)}><img src={galleryImages[2]} alt="Interior View 2" /></div>
                    <div className="gallery-item" onClick={() => openLightbox(3)}><img src={galleryImages[3]} alt="Interior View 3" /></div>
                    <div className="gallery-item" onClick={() => openLightbox(4)}><img src={galleryImages[4]} alt="Interior View 4" /></div>
                </div>
            </div>
            <div className="breadcrumb">
                <Link to="/">Home</Link><span>→</span><Link to="/available-communities">Communities</Link><span>→</span><strong>404 Wiggins Mill Rd</strong>
            </div>
            <div className="hero-info">
                <div className="hero-main">
                    <div className="property-badges">
                        <span className="badge badge-new">New Construction</span>
                        <span className="badge badge-featured">Move-In Ready</span>
                    </div>
                    <h1 className="hero-title">404 Wiggins Mill Rd</h1>
                    <div className="hero-subtitle">Ocean View Model by Ashburn Homes • Elevation II</div>
                    <div className="hero-location">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <a href="https://www.google.com/maps/search/?api=1&query=404+Wiggins+Mill+Rd+Townsend+DE+19734" target="_blank" rel="noreferrer">Townsend, DE 19734</a>
                    </div>
                    <div className="quick-stats">
                        <div className="stat"><span className="stat-value">5</span><span className="stat-label">Bedrooms</span></div>
                        <div className="stat-divider"></div>
                        <div className="stat"><span className="stat-value">4.5</span><span className="stat-label">Bathrooms</span></div>
                        <div className="stat-divider"></div>
                        <div className="stat"><span className="stat-value">4,431</span><span className="stat-label">Sq. Ft.</span></div>
                        <div className="stat-divider"></div>
                        <div className="stat"><span className="stat-value">2</span><span className="stat-label">Acres</span></div>
                        <div className="stat-divider"></div>
                        <div className="stat"><span className="stat-value">4</span><span className="stat-label">Car Garage</span></div>
                    </div>
                </div>
                <div className="hero-pricing">
                    <div className="price-value">$1,329,000</div>
                    <div className="price-per-sqft">$300 / sq ft</div>
                </div>
            </div>
        </div>
      </section>

      <nav className="sub-nav">
        <div className="sub-nav-content">
            <a href="#overview" onClick={(e) => scrollToAnchor(e, 'overview')} className={`sub-nav-link ${activeSubNavLink === 'overview' ? 'active' : ''}`}>Overview</a>
            <a href="#features" onClick={(e) => scrollToAnchor(e, 'features')} className={`sub-nav-link ${activeSubNavLink === 'features' ? 'active' : ''}`}>Features</a>
            <a href="#upgrades" onClick={(e) => scrollToAnchor(e, 'upgrades')} className={`sub-nav-link ${activeSubNavLink === 'upgrades' ? 'active' : ''}`}>Upgrades</a>
            <a href="#tour" onClick={(e) => scrollToAnchor(e, 'tour')} className={`sub-nav-link ${activeSubNavLink === 'tour' ? 'active' : ''}`}>Virtual Tour</a>
            <a href="#schools" onClick={(e) => scrollToAnchor(e, 'schools')} className={`sub-nav-link ${activeSubNavLink === 'schools' ? 'active' : ''}`}>Nearby School</a>
            <a href="#location" onClick={(e) => scrollToAnchor(e, 'location')} className={`sub-nav-link ${activeSubNavLink === 'location' ? 'active' : ''}`}>Locations</a>
        </div>
      </nav>

      <section className="section" id="description">
        <div className="container">
            <div className="description-grid">
                <div className="description-content">
                    <div className="section-header"><h2>About This Home</h2></div>
                    <div className="description-text">
                        <p>Welcome to 404 Wiggins Mill Rd, an extraordinary luxury residence featuring Ashburn Homes' sought-after Oceanview model with top of the line premium finishes. Set on a sprawling 2-acre lot in Townsend, this move-in ready masterpiece offers 4,431 square feet of meticulously designed living space across multiple levels.</p>
                        <p>The home boasts 10-foot first floor ceilings with transoms, 8-foot tall interior doors, and stunning architectural details including 108 linear feet of shiplap accents throughout key living areas. The gourmet kitchen is a chef's dream, featuring CAFÉ professional-grade appliances, Diamond Distinction Series Level 2 cabinetry, Level 3 quartz countertops, and a custom 42" curved wood hood.</p>
                        <p>The owner's suite features a tray ceiling and a spa-like bath with freestanding soaking tub, frameless glass shower with bench seat, rain shower head, dual vanities with Level 4 quartz, and Moen Weymouth fixtures in matte black throughout. An impressive in-law suite with its own powder room provides flexible living options.</p>
                        <p>Additional highlights include a finished basement with bedroom, full bath, and recreation room with wet bar; a finished attic space with bath; a 248 sq ft screened porch with indoor/outdoor fireplace featuring stone veneer and limestone accents; and a 4-car garage with finished and painted drywall.</p>
                    </div>
                </div>
                <div className="description-sidebar">
                    <div className="details-card">
                        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>Property Details</h3>
                        <div className="details-list">
                            <div className="detail-item"><span className="detail-label">Model</span><span className="detail-value">Ocean View</span></div>
                            <div className="detail-item"><span className="detail-label">Elevation</span><span className="detail-value">II</span></div>
                            <div className="detail-item"><span className="detail-label">Year Built</span><span className="detail-value">2025</span></div>
                            <div className="detail-item"><span className="detail-label">Style</span><span className="detail-value">Craftsman</span></div>
                            <div className="detail-item"><span className="detail-label">Lot Size</span><span className="detail-value">2.00 Acres</span></div>
                            <div className="detail-item"><span className="detail-label">Builder</span><span className="detail-value">Ashburn Homes</span></div>
                            <div className="detail-item"><span className="detail-label">MLS #</span><span className="detail-value">DENC2087732</span></div>
                            <div className="detail-item"><span className="detail-label">County</span><span className="detail-value">New Castle</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

    <section className="section-alt" id="features">
        <div className="container">
            <div className="section-header"><h2>Premium Features & Finishes</h2><p>Every detail carefully selected for luxury living</p></div>
            <div className="features-grid">
                <div className="feature-category">
                    <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Structural</h3>
                    <ul className="feature-list">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>10' First Floor Ceiling Height</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>9' Basement with Open Well Exits</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Finished Attic Space with Full Bath</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>In-Law Suite with Powder Room</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>4' Extended Dining Area</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Optional 2nd Garage w/ Finished 2nd Floor</li>
                    </ul>
                </div>
                <div className="feature-category">
                    <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>Kitchen</h3>
                    <ul className="feature-list">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Diamond Distinction Level 2 Cabinets</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Level 3 Quartz Countertops</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Custom 42" Curved Wood Hood</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Extended Island with 12" Overhang</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Custom Pantry with Butcher Block</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Pocket Office with Base & Upper Cabinets</li>
                    </ul>
                </div>
                <div className="feature-category">
                    <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Owner's Suite</h3>
                    <ul className="feature-list">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Tray Ceiling</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Freestanding Soaking Tub</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Rain Shower Head with Transfer Valve</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Level 4 Quartz Countertops</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Custom Walk-In Closet</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Frameless Glass Shower Door</li>
                    </ul>
                </div>
                <div className="feature-category">
                    <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>Exterior</h3>
                    <ul className="feature-list">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Metal Roofing Accent</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>12" Square Columns</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Black Aluminum Railings</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Limestone Front Porch & Steps</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>248 Sq Ft Screened Porch</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Indoor/Outdoor Fireplace</li>
                    </ul>
                </div>
                <div className="feature-category">
                    <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Interior Details</h3>
                    <ul className="feature-list">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>8' Tall Interior Doors</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>108 LF Shiplap Wall Accents</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>5¼" Crown Moulding</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Wainscoting in Foyer & Stairway</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Oak Treads with Painted Stringers</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Level II LVP Throughout</li>
                    </ul>
                </div>
                <div className="feature-category">
                    <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>Basement & Garage</h3>
                    <ul className="feature-list">
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Finished Bedroom (~375 sq ft)</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Finished Rec Room (~685 sq ft)</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Wet Bar with Quartz & Sink</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Three-Piece Full Bathroom</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>4-Car Garage (Finished & Painted)</li>
                        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Carriage Style Doors with Glass</li>
                    </ul>
                </div>
            </div>
            <div className="appliances-section" id="upgrades">
                <h3>CAFÉ Professional Appliance Package</h3>
                <p className="subtitle">Premium smart appliances included</p>
                <div className="appliances-grid">
                    <div className="appliance-item">
                        <div className="appliance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="4"/></svg></div>
                        <h4>36" Gas Range</h4><p>6 Burners • Smart Enabled</p>
                    </div>
                    <div className="appliance-item">
                        <div className="appliance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/></svg></div>
                        <h4>48" Refrigerator</h4><p>Built-In Side-by-Side</p>
                    </div>
                    <div className="appliance-item">
                        <div className="appliance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="12" x2="22" y2="12"/></svg></div>
                        <h4>30" Wall Oven</h4><p>Combination Unit</p>
                    </div>
                    <div className="appliance-item">
                        <div className="appliance-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="5"/></svg></div>
                        <h4>Dishwasher</h4><p>SS Interior • Sanitize</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="section" id="tour">
        <div className="container">
            <div className="section-header"><h2>3D Virtual Tour</h2><p>Explore the home from anywhere with our immersive virtual walkthrough</p></div>
            <div className="tour-container"><iframe src="https://my.matterport.com/show/?m=EE9Lv7CsBJD&mls=1" allowFullScreen loading="lazy" title="3D Virtual Tour"></iframe></div>
        </div>
    </section>

    <section className="section-alt" id="schools">
        <div className="container">
            <div className="section-header"><h2>Nearby School</h2><p>Appoquinimink School District</p></div>
            <div className="schools-grid">
                <div className="school-card"><div className="school-rating">8</div><div className="school-name">Townsend Elementary School</div><div className="school-type">Public • Grades 1-5</div><div className="school-distance"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>1.6 miles away</div></div>
                <div className="school-card"><div className="school-rating">5</div><div className="school-name">Meredith Middle School</div><div className="school-type">Public • Grades 6-8</div><div className="school-distance"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>2.5 miles away</div></div>
                <div className="school-card"><div className="school-rating">10</div><div className="school-name">Odessa High School</div><div className="school-type">Public • Grades 9-12</div><div className="school-distance"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>3.9 miles away</div></div>
            </div>
        </div>
    </section>

    <section className="section" id="location">
        <div className="container">
            <div className="section-header"><h2>Locations</h2></div>
            <div className="location-grid">
                <div className="map-container"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3078.835496464528!2d-75.73012202347313!3d39.42931291535494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c79e60058e590f%3A0xc3b8627e7d6929a5!2s404%20Wiggins%20Mill%20Rd%2C%20Townsend%2C%20DE%2019734!5e0!3m2!1sen!2sus!4v1740000000000!5m2!1sen!2sus" allowFullScreen loading="lazy" title="Location Map"></iframe></div>
                <div className="location-info">
                    <h3>What's Nearby</h3>
                    <div className="location-details">
                        <div className="location-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg><div className="location-item-content"><h4>Downtown Middletown</h4><p>10 minutes • Shopping, dining, entertainment</p></div></div>
                        <div className="location-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg><div className="location-item-content"><h4>Christiana Hospital</h4><p>25 minutes • Major medical center</p></div></div>
                        <div className="location-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><div className="location-item-content"><h4>Wilmington</h4><p>30 minutes • Downtown, Amtrak station</p></div></div>
                        <div className="location-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg><div className="location-item-content"><h4>Philadelphia</h4><p>50 minutes • Major metro area</p></div></div>
                        <div className="location-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><div className="location-item-content"><h4>Delaware Beaches</h4><p>70 minutes • Rehoboth, Bethany, Dewey</p></div></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="cta-section-standalone">
        <div className="container">
            <h2>Interested in This Property?</h2>
            <p>Schedule a private showing of this stunning Ocean View model with premium finishes.</p>
            <div className="cta-buttons-standalone">
                <button className="btn-cta-primary" onClick={openModal}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Schedule a Showing</button>
                <a href="tel:302-219-6707" className="btn-cta-secondary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>Call 302-219-6707</a>
            </div>
            <div className="agent-card">
                <div className="agent-photo"><img src="https://drive.google.com/thumbnail?id=1rqlB6VFTaj5BHtc-c75Apcz-bsgGi2T9&sz=w1000" alt="Marcus Rush" /></div>
                <div className="agent-info"><h4>Marcus Rush</h4><p>Rush Home Team at Compass</p></div>
            </div>
        </div>
    </section>

    <div className={`modal-overlay-standalone ${isModalOpen ? 'active' : ''}`} id="contactModal" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="modal-standalone">
            <div className="modal-header"><h3>Schedule a Showing</h3><button className="modal-close" onClick={closeModal}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Request sent!'); closeModal(); }}>
                <div className="form-group"><label className="form-label">Full Name</label><input type="text" className="form-input" placeholder="John Smith" required /></div>
                <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" placeholder="john@email.com" required /></div>
                <div className="form-group"><label className="form-label">Phone</label><input type="tel" className="form-input" placeholder="(302) 555-1234" required /></div>
                <div className="form-group"><label className="form-label">Preferred Date & Time</label><input type="text" className="form-input" placeholder="Saturday afternoon, flexible" /></div>
                <div className="form-group"><label className="form-label">Message (Optional)</label><textarea className="form-input form-textarea" placeholder="Any questions or specific requests..."></textarea></div>
                <button type="submit" className="form-submit">Submit Request</button>
            </form>
        </div>
    </div>

    <div className={`lightbox-standalone ${isLightboxOpen ? 'active' : ''}`} id="lightbox">
        <button className="lightbox-close" onClick={closeLightbox}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        <button className="lightbox-nav lightbox-prev" onClick={prevImage}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div className="lightbox-content"><img src={galleryImages[currentImageIndex]} alt="Property Image" /></div>
        <button className="lightbox-nav lightbox-next" onClick={nextImage}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><polyline points="9 18 15 12 9 6"/></svg></button>
        <div className="lightbox-counter"><span>{currentImageIndex + 1} / {galleryImages.length}</span></div>
    </div>
    </div>
  );
};

export default WigginsMill;