'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const PinehurstVillageContent: React.FC = () => {
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(true);
  const [expandedFloorPlan, setExpandedFloorPlan] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestSubtitle, setRequestSubtitle] = useState("Pinehurst Village");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('about');
  const [copiedLink, setCopiedLink] = useState(false);

  const galleryImages = [
    'https://drive.google.com/thumbnail?id=1rz0seNr6VhDlx6m9LKMqAIyuGRuoAOOs&sz=w1600',
    'https://drive.google.com/thumbnail?id=1qJy3hT5Sg5HEz30-_hcaBdDbDI5BLgdr&sz=w1600',
    'https://drive.google.com/thumbnail?id=1ceA5K9Jy5inq4Lzq1CLfFo_lBO4tmkf0&sz=w1600',
    'https://drive.google.com/thumbnail?id=19E0JerP-nPbxDCMHV2mxbbw1oawNHEW2&sz=w1600',
    'https://drive.google.com/thumbnail?id=1R5e7im4F8KPd0cDkyZLoN2VLOAoOqG9G&sz=w1600'
  ];

  const floorPlans = [
    { id: 'windsor', name: 'Windsor', price: '$400,000', beds: '3', baths: '2', garage: '2', stories: '1', sqft: '1,727',
      description: 'The beautiful Windsor is a home that provides options. Looking for a nice size rancher that provides a clean open floor plan with 3 bedrooms and 2 full bath, then the Windsor is your home. Looking for a 2 story home that offers up to 5 bedrooms and over 2,300 sq ft, then the Windsor is your house. Either way you slice it, the Windsor is a dynamic home that is sure to please. The kitchen overlooks the living room to provide an open floor plan that ensures no one is left out.',
      img: 'https://drive.google.com/thumbnail?id=1Et6Pcx4lzk5tFD50-EmGQIhxiUqrmHZv&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=164XZLPqedjzRaDlSbtM6LYh1m-jcwHuS&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=1Kc0MWxbFOo9YPJdPAVODzfEMvuFlU0zE&sz=w1000',
        'https://drive.google.com/thumbnail?id=1oIePo4rEDV8_Y57i3AppIJo5HyByd0wp&sz=w1000',
        'https://drive.google.com/thumbnail?id=1HLhNlUrQmyGrPRVNI_XeoO9sEzt1wifP&sz=w1000',
        'https://drive.google.com/thumbnail?id=1xe-HPh51RTLmQnm5U_iDuZ5b6_1v1wiF&sz=w1000'
      ] },
    { id: 'livingston', name: 'Livingston', price: '$420,000', beds: '3', baths: '2', garage: '2', stories: '1', sqft: '1,854',
      description: 'An open floor plan has never looked this good! The main floor hosts a 3 bedroom rancher with a split bedroom arrangement. With upgrades, the Livingston can host up to 5 bedrooms. The kitchen overlooks the open dining room and great room. There is space to put an optional 2nd floor with two bedrooms, a loft, and a full bath. Oversized windows in every room make this home bright!',
      img: 'https://drive.google.com/thumbnail?id=1kq1cd8XgPpkT2l9c0nN7EhUVWRU8F4FT&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=1eIenSKLz4CRnf8x6oXqWBIEp7wLEmDiH&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=19E0JerP-nPbxDCMHV2mxbbw1oawNHEW2&sz=w1000',
        'https://drive.google.com/thumbnail?id=10eAF0Qr8FOUbJvF9bqr_J_lw27YJ7mYQ&sz=w1000',
        'https://drive.google.com/thumbnail?id=10WLqLktNIAm-MJVwMLKzIbtBjXY2pQ88&sz=w1000',
        'https://drive.google.com/thumbnail?id=10rbsLU6W3KTN3C3iV5DA2PRCvoLjQOgT&sz=w1000'
      ] },
    { id: 'lewes', name: 'Lewes', price: '$430,000', beds: '3', baths: '2', garage: '2', stories: '1', sqft: '2,022',
      description: 'Spacious main-level living with a grand feel. The Lewes includes a large kitchen island, walk-in pantry, and a primary suite that feels like a private retreat.',
      img: 'https://drive.google.com/thumbnail?id=10bJIxlQx0IyarO1ODmXDf59XW1rLNpIJ&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=149HSk6Sgzg61xLuyYlemVjz06Oo6d_E2&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=1G21W80sdVTcQe1OM4TnJWpJN4j2FhR3F&sz=w1000',
        'https://drive.google.com/thumbnail?id=1o7UXDMiTJ7Cu9WhirIffRTcinhrlsXYc&sz=w1000',
        'https://drive.google.com/thumbnail?id=1nyaCrwAbnQRaXuU4DX11miwQSjyqg_MS&sz=w1000',
        'https://drive.google.com/thumbnail?id=1o4FpirFvnP7Q-e6whXfLEjUBcpL9KZb-&sz=w1000'
      ] },
    { id: 'wyoming', name: 'Wyoming', price: '$425,000', beds: '4', baths: '2.5', garage: '2', stories: '2', sqft: '2,379',
      description: 'A classic 2-story design with expanded living areas. The Wyoming offers four spacious bedrooms on the upper level and a wide footprint for impressive curb appeal.',
      img: 'https://drive.google.com/thumbnail?id=1geLCtkZfc68Zx6vzf2Do2u5uoY6P1XMo&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=1UjKll52BEBh9XQUxpmPGxSYMrrHFPWcM&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=1IrBgP92YYCxU8lfT1ffEyRlt_AEqLhOa&sz=w1000',
        'https://drive.google.com/thumbnail?id=1h3WX0I5b3bi0JLou-1rTwgVRoBkUpxy&sz=w1000',
        'https://drive.google.com/thumbnail?id=1h5WI3H0eARReGf8b-OO1rzSudxsupZ6K&sz=w1000',
        'https://drive.google.com/thumbnail?id=1gvFg6UlzyqEjJtbB3GA7JButrfZt8Dlm&sz=w1000'
      ] },
    { id: 'camden-grand', name: 'Camden Grand', price: '$458,000', beds: '4', baths: '2.5', garage: '2', stories: '2', sqft: '2,680',
      description: 'Step into the Camden Grand, a breathtaking 2,680 sq. ft. home designed to impress at every turn. The soaring two-story family room floods the main level with natural light, creating an unforgettable space to gather and entertain. A chef-inspired kitchen with stainless steel appliances, a spacious island, and pantry flows seamlessly into the breakfast area and living space, while a formal dining room and private study add both elegance and versatility.',
      img: 'https://drive.google.com/thumbnail?id=1GKgbkA-bZx8vLmMAr589Jo7bGt_8YWmC&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=1GKgbkA-bZx8vLmMAr589Jo7bGt_8YWmC&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=14yiXK5bTK_H1JBUkGELQHOupJDXwBxbd&sz=w1000',
        'https://drive.google.com/thumbnail?id=1RqKbtnPymNGs2drhqiQ1wSHGctEbezTr&sz=w1000',
        'https://drive.google.com/thumbnail?id=1-7bJhKbVZ9AHWXCBM6GOl_YfJHgWwMkJ&sz=w1000',
        'https://drive.google.com/thumbnail?id=15nZ-4mph-4-2fr0HsPjqdnL9KToooWDj&sz=w1000'
      ] },
    { id: 'georgetown', name: 'Georgetown', price: '$480,000', beds: '4', baths: '2.5', garage: '2', stories: '2', sqft: '2,513',
      description: 'A sophisticated master-on-main design with extra bedrooms upstairs. The Georgetown offers the convenience of first-floor primary living with the space of a full 2-story home.',
      img: 'https://drive.google.com/thumbnail?id=1OAAtpIBWc7fMvpVPiwtDHsasdWYa0LY2&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=15hUnb4K6LyT7wdwgeovl7NU0Wj5nhw7a&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=1cGvfb3LriU0loB1e-LtB2umqwUDH9LU9&sz=w1000',
        'https://drive.google.com/thumbnail?id=1cy706xj69lA-TilGaypgyqrfdOcWtYBJ&sz=w1000',
        'https://drive.google.com/thumbnail?id=1chIFJtKPgIALLDgJ5AOeIlPbnkQLkUw0&sz=w1000',
        'https://drive.google.com/thumbnail?id=1cZ7booYQIkrjwY-omgah7J1XacwhSYXn&sz=w1000'
      ] }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const sections = ['about', 'floorplans', 'map', 'location'];
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
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, lightboxImages]);

  const closeAllModals = () => {
    setIsShareModalOpen(false);
    setIsRequestModalOpen(false);
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openModal = (type: 'share' | 'request', subtitle?: string) => {
    closeAllModals();
    if (type === 'share') setIsShareModalOpen(true);
    else {
      setRequestSubtitle(subtitle || "Pinehurst Village");
      setIsRequestModalOpen(true);
    }
    document.body.style.overflow = 'hidden';
  };

  const openLightbox = (index: number, images?: string[]) => {
    setLightboxImages(images || galleryImages);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 160;
      const top = section.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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
        .hero-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-bottom: 1.5rem; }
        .btn-request-info { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.875rem 1.5rem; background: var(--black); color: var(--white); font-size: 0.9rem; font-weight: 600; border: none; border-radius: 50px; cursor: pointer; transition: all 0.2s; }
        .btn-request-info:hover { background: var(--gray-800); }
        .btn-share { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; background: var(--white); color: var(--gray-700); font-size: 0.9rem; font-weight: 500; border: 1px solid var(--gray-300); border-radius: 50px; cursor: pointer; transition: all 0.2s; }
        .btn-share:hover { border-color: var(--gray-400); background: var(--gray-50); }
        .btn-share svg { width: 18px; height: 18px; }
        
        .hero-gallery { display: grid; grid-template-columns: 1fr 300px; gap: 0.75rem; margin-bottom: 1.5rem; border-radius: 16px; overflow: hidden; }
        .gallery-main { position: relative; height: 450px; cursor: pointer; overflow: hidden; border-radius: 12px; background: #fff; }
        .gallery-main img { width: 100%; height: 100%; object-fit: contain; background: #fff; transition: transform 0.3s; }
        .gallery-main:hover img { transform: scale(1.02); }
        .gallery-grid { display: grid; grid-template-rows: repeat(4, 1fr); gap: 0.75rem; }
        .gallery-item { position: relative; cursor: pointer; overflow: hidden; border-radius: 8px; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .gallery-item:hover img { transform: scale(1.05); }
        
        .breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--gray-500); margin-bottom: 1rem; flex-wrap: wrap; }
        .breadcrumb a { color: var(--gray-600); text-decoration: none; transition: color 0.2s; }
        .breadcrumb a:hover { color: var(--black); }
        .breadcrumb strong { color: var(--gray-900); }
        
        .hero-info { display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; padding-bottom: 2rem; }
        .hero-main { flex: 1; }
        .community-status { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--gray-600); margin-bottom: 0.75rem; }
        .status-dot { width: 10px; height: 10px; background: var(--success); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        .hero-title { font-size: 2.25rem; font-weight: 800; line-height: 1.1; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
        .hero-location { display: flex; align-items: center; gap: 0.5rem; color: var(--gray-600); font-size: 0.95rem; }
        .hero-location a { color: var(--gray-600); text-decoration: none; transition: color 0.2s; }
        .hero-location a:hover { color: var(--black); text-decoration: underline; }
        .quick-stats { display: flex; gap: 2rem; margin-top: 1.25rem; }
        .stat { text-align: left; }
        .stat-value { display: block; font-size: 1.35rem; font-weight: 700; color: var(--black); }
        .stat-label { font-size: 0.8rem; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.5px; }
        .stat-divider { width: 1px; background: var(--gray-200); }
        .hero-pricing { text-align: right; }
        .price-label { font-size: 0.8rem; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.25rem; }
        .price-value { font-size: 2rem; font-weight: 700; color: var(--black); }
        .price-sqft { font-size: 0.85rem; color: var(--gray-500); margin-top: 0.25rem; }
        
        .sub-nav { position: sticky; top: 80px; z-index: 100; background: var(--white); border-top: 1px solid var(--gray-200); border-bottom: 1px solid var(--gray-200); }
        .sub-nav-content { display: flex; max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .sub-nav-link { padding: 1rem 1.5rem; font-size: 0.9rem; font-weight: 500; color: var(--gray-600); border-bottom: 3px solid transparent; transition: all 0.2s; text-decoration: none; }
        .sub-nav-link:hover { color: var(--black); }
        .sub-nav-link.active { color: var(--black); border-bottom-color: var(--black); }
        
        .about-section { padding: 3rem 0; }
        .about-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 3rem; }
        .about-content h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
        .about-text { color: var(--gray-600); line-height: 1.8; }
        .about-text.collapsed { max-height: 100px; overflow: hidden; position: relative; }
        .about-text.collapsed::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: linear-gradient(transparent, var(--white)); }
        .about-text p { margin-bottom: 1rem; }
        .read-more-btn { display: inline-flex; align-items: center; gap: 0.5rem; background: none; border: none; color: var(--black); font-weight: 600; font-size: 0.9rem; cursor: pointer; padding: 0; margin-top: 0.5rem; }
        .read-more-btn svg { width: 18px; height: 18px; transition: transform 0.2s; }
        .read-more-btn.expanded svg { transform: rotate(180deg); }
        
        .quickbuy-banner { display: flex; align-items: center; gap: 1.5rem; background: linear-gradient(135deg, #111 0%, #222 100%); border-radius: 12px; padding: 1.5rem 2rem; margin-top: 2rem; }
        .quickbuy-icon { width: 48px; height: 48px; background: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .quickbuy-icon svg { width: 24px; height: 24px; color: var(--black); }
        .quickbuy-content { flex: 1; }
        .quickbuy-content h4 { color: var(--white); font-size: 1rem; font-weight: 700; margin-bottom: 0.25rem; }
        .quickbuy-content p { color: var(--gray-400); font-size: 0.85rem; line-height: 1.5; margin: 0; }
        .quickbuy-content strong { color: var(--gold); }
        
        .builder-card { display: flex; align-items: center; gap: 1rem; background: var(--gray-50); border-radius: 12px; padding: 1.25rem; margin-top: 1.5rem; }
        .builder-logo-img { height: 50px; width: auto; object-fit: contain; }
        .builder-info h4 { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem; }
        .builder-info p { font-size: 0.85rem; color: var(--gray-500); margin: 0; }
        
        .features-card { background: var(--gray-50); border-radius: 16px; padding: 2rem; height: fit-content; }
        .features-card h3 { display: flex; align-items: center; gap: 0.75rem; font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem; }
        .features-card h3 svg { width: 22px; height: 22px; color: var(--success); }
        .features-list { display: grid; gap: 1rem; }
        .feature-item { display: flex; align-items: flex-start; gap: 0.75rem; }
        .feature-item svg { width: 18px; height: 18px; color: var(--success); flex-shrink: 0; margin-top: 2px; }
        .feature-item span { font-size: 0.9rem; color: var(--gray-700); }
        
        .floorplans-section { padding: 3rem 0; background: var(--gray-50); }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .section-header h2 { font-size: 1.5rem; font-weight: 700; }
        .floorplan-list { display: flex; flex-direction: column; gap: 1rem; }
        .floorplan-card { background: var(--white); border: 1px solid var(--gray-200); border-radius: 12px; overflow: hidden; transition: all 0.3s; }
        .floorplan-card:hover { border-color: var(--gray-300); box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .floorplan-card.expanded { border-color: var(--black); }
        .floorplan-main { display: grid; grid-template-columns: 280px 1fr auto; cursor: pointer; }
        .floorplan-image { position: relative; height: 200px; overflow: hidden; }
        .floorplan-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .floorplan-card:hover .floorplan-image img { transform: scale(1.05); }
        .movein-badge { position: absolute; top: 1rem; left: 1rem; padding: 0.35rem 0.75rem; background: var(--success); color: var(--white); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; border-radius: 4px; }
        .floorplan-content { padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; }
        .floorplan-name { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem; }
        .floorplan-price { font-size: 1rem; color: var(--gray-600); margin-bottom: 0.75rem; }
        .floorplan-specs { display: flex; flex-wrap: wrap; gap: 0.5rem; font-size: 0.85rem; color: var(--gray-500); }
        .floorplan-specs .divider { color: var(--gray-300); }
        .floorplan-action { display: flex; align-items: center; padding-right: 1.5rem; }
        .floorplan-view-btn { padding: 0.75rem 1.5rem; background: var(--black); color: var(--white); font-size: 0.85rem; font-weight: 600; border: none; border-radius: 50px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .floorplan-view-btn:hover { background: var(--gray-800); }
        .floorplan-details { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
        .floorplan-card.expanded .floorplan-details { max-height: 600px; }
        .floorplan-details-content { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem; border-top: 1px solid var(--gray-200); background: var(--gray-50); }
        .details-left h4 { font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem; }
        .details-left p { color: var(--gray-600); font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.5rem; }
        .elevation-options { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; }
        .elevation-thumb { width: 80px; height: 60px; border-radius: 8px; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: border-color 0.2s; }
        .elevation-thumb:hover, .elevation-thumb.active { border-color: var(--black); }
        .elevation-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .details-actions { display: flex; gap: 1rem; }
        .btn-floorplan { padding: 0.875rem 1.5rem; background: var(--black); color: var(--white); font-size: 0.9rem; font-weight: 600; border: none; border-radius: 50px; cursor: pointer; transition: all 0.2s; }
        .btn-floorplan:hover { background: var(--gray-800); }
        .btn-floorplan-outline { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.875rem 1.5rem; background: var(--white); color: var(--black); font-size: 0.9rem; font-weight: 600; border: 2px solid var(--black); border-radius: 50px; cursor: pointer; transition: all 0.2s; }
        .btn-floorplan-outline:hover { background: var(--black); color: var(--white); }
        .details-right { display: flex; align-items: center; justify-content: center; }
        .floorplan-diagram { width: 100%; max-width: 400px; background: var(--white); border-radius: 12px; padding: 1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.06); cursor: pointer; transition: box-shadow 0.2s; }
        .floorplan-diagram:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.12); }
        .floorplan-diagram img { width: 100%; height: auto; border-radius: 8px; }
        
        .map-section { padding: 3rem 0; }
        .map-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .map-header h2 { font-size: 1.5rem; font-weight: 700; }
        .map-container { border-radius: 16px; overflow: hidden; border: 1px solid var(--gray-200); }
        .map-container iframe { width: 100%; height: 600px; border: none; }
        
        .location-section { padding: 3rem 0; background: var(--gray-50); }
        .location-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .location-card { background: var(--white); border-radius: 16px; padding: 2rem; }
        .location-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem; }
        .location-card h3 svg { width: 22px; height: 22px; }
        .school-list { display: flex; flex-direction: column; gap: 1rem; }
        .school-item { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-100); }
        .school-item:last-child { border-bottom: none; padding-bottom: 0; }
        .school-name { font-weight: 600; font-size: 0.9rem; }
        .school-grades { font-size: 0.8rem; color: var(--gray-500); }
        .school-distance { font-size: 0.85rem; color: var(--gray-600); }
        .places-list { display: grid; gap: 1rem; }
        .place-item { display: flex; align-items: center; gap: 1rem; }
        .place-icon { width: 40px; height: 40px; background: var(--gray-100); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .place-icon svg { width: 20px; height: 20px; color: var(--gray-600); }
        .place-info { flex: 1; }
        .place-name { font-weight: 600; font-size: 0.9rem; }
        .place-time { font-size: 0.8rem; color: var(--gray-500); }
        
        .cta-section { padding: 4rem 0; background: var(--black); }
        .cta-content { text-align: center; max-width: 600px; margin: 0 auto; }
        .cta-content h2 { color: var(--white); font-size: 2rem; font-weight: 700; margin-bottom: 1rem; }
        .cta-content p { color: var(--gray-400); margin-bottom: 2rem; }
        .cta-buttons { display: flex; justify-content: center; gap: 1rem; }
        .btn-cta { padding: 1rem 2rem; font-size: 0.95rem; font-weight: 600; border-radius: 50px; cursor: pointer; transition: all 0.2s; text-decoration: none; }
        .btn-cta-primary { background: var(--white); color: var(--black); border: none; }
        .btn-cta-primary:hover { background: var(--gray-100); }
        .btn-cta-secondary { background: transparent; color: var(--white); border: 2px solid var(--white); }
        .btn-cta-secondary:hover { background: var(--white); color: var(--black); }
        
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 1rem; }
        .modal { background: var(--white); border-radius: 16px; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; }
        .modal-header { padding: 1.5rem 1.5rem 0; }
        .modal-header h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem; }
        .modal-header p { color: var(--gray-500); font-size: 0.9rem; }
        .modal-body { padding: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.875rem 1rem; font-size: 0.95rem; font-family: inherit; border: 1px solid var(--gray-300); border-radius: 8px; transition: border-color 0.2s; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--black); }
        .form-group textarea { resize: vertical; min-height: 100px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-submit { width: 100%; padding: 1rem; background: var(--black); color: var(--white); font-size: 0.95rem; font-weight: 600; border: none; border-radius: 50px; cursor: pointer; transition: all 0.2s; }
        .form-submit:hover { background: var(--gray-800); }
        
        .share-modal { max-width: 400px; }
        .share-options { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .share-option { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; background: var(--gray-50); border-radius: 12px; cursor: pointer; transition: all 0.2s; text-decoration: none; color: var(--gray-700); }
        .share-option:hover { background: var(--gray-100); }
        .share-option svg { width: 24px; height: 24px; }
        .share-option span { font-size: 0.75rem; font-weight: 500; }
        .copy-link { display: flex; gap: 0.5rem; }
        .copy-link input { flex: 1; padding: 0.75rem 1rem; font-size: 0.85rem; border: 1px solid var(--gray-300); border-radius: 8px; background: var(--gray-50); }
        .copy-link button { padding: 0.75rem 1.25rem; background: var(--black); color: var(--white); font-size: 0.85rem; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; white-space: nowrap; }
        
        .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 3000; display: flex; align-items: center; justify-content: center; }
        .lightbox-close { position: absolute; top: 1.5rem; right: 1.5rem; width: 44px; height: 44px; background: rgba(255,255,255,0.1); border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .lightbox-close:hover { background: rgba(255,255,255,0.2); }
        .lightbox-close svg { width: 24px; height: 24px; color: var(--white); }
        .lightbox-content { max-width: 90vw; max-height: 85vh; }
        .lightbox-content img { max-width: 100%; max-height: 85vh; object-fit: contain; border-radius: 8px; }
        .lightbox-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; background: rgba(255,255,255,0.1); border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .lightbox-nav svg { width: 24px; height: 24px; color: var(--white); }
        .lightbox-nav:hover { background: rgba(255,255,255,0.2); }
        .lightbox-nav.prev { left: 2rem; }
        .lightbox-nav.next { right: 2rem; }
        .lightbox-counter { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); color: var(--white); font-size: 0.9rem; }
        @media (max-width: 1024px) { .hero-gallery { grid-template-columns: 1fr; } .gallery-main { height: 300px; } .gallery-grid { display: none; } .about-grid { grid-template-columns: 1fr; gap: 2rem; } .floorplan-main { grid-template-columns: 250px 1fr auto; } .floorplan-details-content { grid-template-columns: 1fr; } .location-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .container { padding: 0 1rem; } .hero { padding-top: 80px; } .hero-actions { flex-direction: column; align-items: stretch; gap: 0.75rem; } .btn-request-info { justify-content: center; } .gallery-main { height: 250px; } .hero-info { flex-direction: column; } .hero-pricing { text-align: left; } .quick-stats { flex-wrap: wrap; gap: 1.5rem; } .sub-nav { overflow-x: auto; padding: 0 1rem; } .sub-nav-content { min-width: max-content; } .sub-nav-link { padding: 1rem; font-size: 0.85rem; } .quickbuy-banner { flex-direction: column; text-align: center; padding: 1.5rem; } .quickbuy-icon { margin: 0 auto; } .floorplan-main { grid-template-columns: 1fr; } .floorplan-image { height: 200px; } .floorplan-content { padding: 1.25rem; } .floorplan-action { padding: 0 1.25rem 1.25rem; } .floorplan-view-btn { width: 100%; } .map-header { flex-direction: column; align-items: flex-start; gap: 1rem; } .map-container iframe { height: 400px; } .cta-content h2 { font-size: 1.75rem; } .form-row { grid-template-columns: 1fr; } .details-actions { flex-direction: column; } .btn-floorplan, .btn-floorplan-outline { width: 100%; justify-content: center; } }
      `}</style>

      <section className="hero">
        <div className="container">
          <div className="hero-actions">
            <div><button className="btn-request-info" onClick={() => openModal('request')}>Request information</button></div>
            <button className="btn-share" onClick={() => openModal('share')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>Share</button>
          </div>
          <div className="hero-gallery">
            <div className="gallery-main" onClick={() => openLightbox(0)}><img src={galleryImages[0]} alt="Pinehurst Village Model Home" /></div>
            <div className="gallery-grid">{[1,2,3,4].map(i => <div key={i} className="gallery-item" onClick={() => openLightbox(i)}><img src={galleryImages[i]} alt={`Gallery ${i}`} /></div>)}</div>
          </div>
          <div className="breadcrumb"><Link href="/new-construction">New Construction</Link><span>→</span><Link href="/available-communities">Communities</Link><span>→</span><strong>Pinehurst Village</strong></div>
          <div className="hero-info">
            <div className="hero-main">
              <div className="community-status"><span className="status-dot"></span>Now Selling</div>
              <h1 className="hero-title">Pinehurst Village</h1>
              <div className="hero-location"><a href="https://maps.google.com/?q=25+Belfry+Dr,+Felton,+DE+19943" target="_blank" rel="noopener noreferrer">25 Belfry Dr, Felton, DE 19943</a></div>
              <div className="quick-stats">
                <div className="stat"><span className="stat-value">3 - 5</span><span className="stat-label">Bedrooms</span></div><div className="stat-divider"></div>
                <div className="stat"><span className="stat-value">2 - 3.5</span><span className="stat-label">Bathrooms</span></div><div className="stat-divider"></div>
                <div className="stat"><span className="stat-value">1,727 - 2,680</span><span className="stat-label">Sq. Ft.</span></div>
              </div>
            </div>
            <div className="hero-pricing"><div className="price-label">Starting from</div><div className="price-value">$400,000</div><div className="price-sqft">Kent County, DE</div></div>
          </div>
        </div>
      </section>

      <nav className="sub-nav"><div className="sub-nav-content">
        <a href="#about" className={`sub-nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'about')}>Overview</a>
        <a href="#floorplans" className={`sub-nav-link ${activeSection === 'floorplans' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'floorplans')}>Floor Plans</a>
        <a href="#map" className={`sub-nav-link ${activeSection === 'map' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'map')}>Site Map</a>
        <a href="#location" className={`sub-nav-link ${activeSection === 'location' ? 'active' : ''}`} onClick={(e) => scrollToSection(e, 'location')}>Location</a>
      </div></nav>

      <section className="about-section" id="about"><div className="container"><div className="about-grid">
        <div className="about-content">
          <h2>About Pinehurst Village</h2>
          <div className={`about-text ${isAboutCollapsed ? 'collapsed' : ''}`}>
            <p>Pinehurst Village is a vibrant new community designed for active lifestyles in the heart of Felton. Featuring carriage style garage doors and expansive floor plans, this community is built for those who value both style and substance.</p>
            <p>With 8&apos; unfinished basements standard and generous incentives, Pinehurst Village offers unparalleled value for Delaware homebuyers. Take advantage of the current 2025 incentive: 20% off design options!</p>
          </div>
          <button className={`read-more-btn ${!isAboutCollapsed ? 'expanded' : ''}`} onClick={() => setIsAboutCollapsed(!isAboutCollapsed)}>{isAboutCollapsed ? 'Read more' : 'Read less'}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg></button>
          
          <div className="quickbuy-banner">
            <div className="quickbuy-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <div className="quickbuy-content">
              <h4>Need to sell your current home first?</h4>
              <p>Ask about our <strong>RushHome QuickBuy Lock</strong> program. We&apos;ll give you a guaranteed backup offer so you can buy your next home today without a sale contingency. No stress, just certainty.</p>
            </div>
          </div>

          <div className="builder-card">
            <img src="https://drive.google.com/thumbnail?id=10oYf7kWSBirByVTWoVLr6aUFNuZ4Lpep&sz=w200" alt="Ashburn Homes" className="builder-logo-img" />
            <div className="builder-info"><h4>Built by Ashburn Homes</h4><p>40+ years building quality homes in Delaware</p></div>
          </div>
        </div>
        <div className="features-card">
          <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Standard Features</h3>
          <div className="features-list">{['2025 Incentive: 20% OFF DESIGN OPTIONS','Carriage Style Garage Doors','42" Upper Cabinets Standard','Stainless Steel Appliances',"Unfinished 8' Basement Included",'3-Piece Under Slab Plumbing','Spacious Open-Concept Designs','Walking Trails & Playgrounds'].map((f,i)=><div key={i} className="feature-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span>{f}</span></div>)}</div>
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
                <h4>Other Images</h4>
                <div className="elevation-options">{plan.elevations.slice(0, 4).map((elev, i) => <div key={i} className={`elevation-thumb ${i === 0 ? 'active' : ''}`} onClick={(e) => {e.stopPropagation(); openLightbox(i, plan.elevations);}}><img src={elev} alt={`${plan.name} view ${i + 1}`} /></div>)}</div>
                <div className="details-actions">
                  <button className="btn-floorplan" onClick={(e) => {e.stopPropagation(); openModal('request', plan.name);}}>Request Info</button>
                  <button className="btn-floorplan-outline" onClick={(e) => {e.stopPropagation(); openLightbox(0, [plan.floorPlanImg]);}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>View Floor Plan</button>
                </div>
              </div>
              <div className="details-right"><div className="floorplan-diagram" onClick={(e) => {e.stopPropagation(); openLightbox(0, [plan.floorPlanImg]);}}><img src={plan.floorPlanImg} alt={`${plan.name} floor plan`} /></div></div>
            </div></div>
          </div>
        ))}</div>
      </div></section>

      <section className="map-section" id="map"><div className="container"><div className="map-header"><h2>Interactive Site Map</h2></div><div className="map-container"><iframe src="https://app.higharc.com/builders/NrnKLBX5m3X2WpAR/locations/RBmOqZ9Y0jZoy8VD/sales-map" title="Site Map" /></div></div></section>

      <section className="location-section" id="location"><div className="container">
        <div className="section-header"><h2>Explore the Area</h2></div>
        <div className="location-grid">
          <div className="location-card">
            <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>Lake Forest School District</h3>
            <div className="school-list">
              <div className="school-item"><div><div className="school-name">Lake Forest North Elementary</div><div className="school-grades">Grades: PK, K-3</div></div><div className="school-distance">1.1 mi</div></div>
              <div className="school-item"><div><div className="school-name">Lake Forest Central Elementary</div><div className="school-grades">Grades: 4-5</div></div><div className="school-distance">2.5 mi</div></div>
              <div className="school-item"><div><div className="school-name">W.T. Chipman Middle School</div><div className="school-grades">Grades: 6-8</div></div><div className="school-distance">2.8 mi</div></div>
              <div className="school-item"><div><div className="school-name">Lake Forest High School</div><div className="school-grades">Grades: 9-12</div></div><div className="school-distance">3.1 mi</div></div>
            </div>
          </div>
          <div className="location-card">
            <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Nearby Places</h3>
            <div className="places-list">
              <div className="place-item"><div className="place-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg></div><div className="place-info"><div className="place-name">Killens Pond State Park</div><div className="place-time">9 min drive</div></div></div>
              <div className="place-item"><div className="place-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div><div className="place-info"><div className="place-name">Walmart Supercenter</div><div className="place-time">12 min drive</div></div></div>
              <div className="place-item"><div className="place-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"/></svg></div><div className="place-info"><div className="place-name">Dover Air Force Base</div><div className="place-time">16 min drive</div></div></div>
              <div className="place-item"><div className="place-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div><div className="place-info"><div className="place-name">Bayhealth Hospital</div><div className="place-time">18 min drive</div></div></div>
              <div className="place-item"><div className="place-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div><div className="place-info"><div className="place-name">Dover Mall</div><div className="place-time">22 min drive</div></div></div>
              <div className="place-item"><div className="place-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg></div><div className="place-info"><div className="place-name">Rehoboth Beach</div><div className="place-time">55 min drive</div></div></div>
            </div>
          </div>
        </div>
      </div></section>

      <section className="cta-section"><div className="container"><div className="cta-content">
        <h2>Ready to Find Your Dream Home?</h2>
        <p>Schedule a tour of Pinehurst Village and discover why families love living here.</p>
        <div className="cta-buttons">
          <button className="btn-cta btn-cta-primary" onClick={() => openModal('request')}>Schedule a Tour</button>
          <a href="tel:+13025551234" className="btn-cta btn-cta-secondary">Call Us Now</a>
        </div>
      </div></div></section>

      {isShareModalOpen && <div className="modal-overlay" onClick={closeAllModals}><div className="modal share-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header"><h3>Share This Community</h3><p>Pinehurst Village</p></div>
        <div className="modal-body">
          <div className="share-options">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="share-option"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg><span>Facebook</span></a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=Check out Pinehurst Village!`} target="_blank" rel="noopener noreferrer" className="share-option"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg><span>X</span></a>
            <a href={`mailto:?subject=Check out Pinehurst Village&body=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} className="share-option"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span>Email</span></a>
            <a href={`sms:?body=Check out Pinehurst Village: ${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} className="share-option"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>Message</span></a>
          </div>
          <div className="copy-link"><input type="text" value={typeof window !== 'undefined' ? window.location.href : ''} readOnly /><button onClick={copyLink}>{copiedLink ? 'Copied!' : 'Copy'}</button></div>
        </div>
      </div></div>}

      {isRequestModalOpen && <div className="modal-overlay" onClick={closeAllModals}><div className="modal" onClick={e => e.stopPropagation()}>
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
        {lightboxImages.length > 1 && <button className="lightbox-nav prev" onClick={prevLightbox}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg></button>}
        <div className="lightbox-content"><img src={lightboxImages[lightboxIndex]} alt={`Image ${lightboxIndex + 1}`} /></div>
        {lightboxImages.length > 1 && <button className="lightbox-nav next" onClick={nextLightbox}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></button>}
        {lightboxImages.length > 1 && <div className="lightbox-counter"><span>{lightboxIndex + 1}</span> / <span>{lightboxImages.length}</span></div>}
      </div>}
    </div>
  );
};

export default PinehurstVillageContent;
