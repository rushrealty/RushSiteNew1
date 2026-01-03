"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const PinehurstVillageContent = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalSubtitle, setModalSubtitle] = useState('Pinehurst Village');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  // Gallery images from Google Drive
  const galleryImages = [
    'https://drive.google.com/thumbnail?id=1rz0seNr6VhDlx6m9LKMqAIyuGRuoAOOs&sz=w1600',
    'https://drive.google.com/thumbnail?id=1qJy3hT5Sg5HEz30-_hcaBdDbDI5BLgdr&sz=w1600',
    'https://drive.google.com/thumbnail?id=1ceA5K9Jy5inq4Lzq1CLfFo_lBO4tmkf0&sz=w1600',
    'https://drive.google.com/thumbnail?id=19E0JerP-nPbxDCMHV2mxbbw1oawNHEW2&sz=w1600',
    'https://drive.google.com/thumbnail?id=1R5e7im4F8KPd0cDkyZLoN2VLOAoOqG9G&sz=w1600',
  ];

  // Floor plans data - sorted by price low to high
  const floorPlans = [
    {
      id: 'windsor',
      name: 'Windsor',
      price: '$400,000',
      beds: '3',
      baths: '2',
      garage: '2',
      stories: '1',
      sqft: '1,727',
      description: 'The beautiful Windsor is a home that provides options. Looking for a nice size rancher that provides a clean open floor plan with 3 bedrooms and 2 full bath, then the Windsor is your home. Looking for a 2 story home that offers up to 5 bedrooms and over 2,300 sq ft, then the Windsor is your house. Either way you slice it, the Windsor is a dynamic home that is sure to please. The kitchen over looks the living room to provide an open floor plan that ensures no one is left out.',
      image: 'https://drive.google.com/thumbnail?id=1Et6Pcx4lzk5tFD50-EmGQIhxiUqrmHZv&sz=w1000',
      floorPlanImgs: ['https://drive.google.com/thumbnail?id=164XZLPqedjzRaDlSbtM6LYh1m-jcwHuS&sz=w1600'],
      elevations: [
        'https://drive.google.com/thumbnail?id=1Kc0MWxbFOo9YPJdPAVODzfEMvuFlU0zE&sz=w1600',
        'https://drive.google.com/thumbnail?id=1oIePo4rEDV8_Y57i3AppIJo5HyByd0wp&sz=w1600',
        'https://drive.google.com/thumbnail?id=1HLhNlUrQmyGrPRVNI_XeoO9sEzt1wifP&sz=w1600',
        'https://drive.google.com/thumbnail?id=1xe-HPh51RTLmQnm5U_iDuZ5b6_1v1wiF&sz=w1600',
        'https://drive.google.com/thumbnail?id=1b3dZ-kOdXWQCdBLitn_QLHXp4jj3J25c&sz=w1600'
      ],
    },
    {
      id: 'livingston',
      name: 'Livingston',
      price: '$420,000',
      beds: '3',
      baths: '2',
      garage: '2',
      stories: '1',
      sqft: '1,854',
      description: 'An open floor plan has never looked this good! The main floor hosts a 3 bedroom rancher with a split bedroom arrangement. With upgrades, the Livingston can host up to 5 bedrooms. The kitchen overlooks the open dining room and great room. There is space to put an optional 2nd floor with two bedrooms, a loft, and a full bath. Oversized windows in every room make this home bright!',
      image: 'https://drive.google.com/thumbnail?id=1kq1cd8XgPpkT2l9c0nN7EhUVWRU8F4FT&sz=w1000',
      floorPlanImgs: ['https://drive.google.com/thumbnail?id=1eIenSKLz4CRnf8x6oXqWBIEp7wLEmDiH&sz=w1600'],
      elevations: [
        'https://drive.google.com/thumbnail?id=19E0JerP-nPbxDCMHV2mxbbw1oawNHEW2&sz=w1600',
        'https://drive.google.com/thumbnail?id=10eAF0Qr8FOUbJvF9bqr_J_lw27YJ7mYQ&sz=w1600',
        'https://drive.google.com/thumbnail?id=10WLqLktNIAm-MJVwMLKzIbtBjXY2pQ88&sz=w1600',
        'https://drive.google.com/thumbnail?id=10rbsLU6W3KTN3C3iV5DA2PRCvoLjQOgT&sz=w1600'
      ],
    },
    {
      id: 'wyoming',
      name: 'Wyoming',
      price: '$425,000',
      beds: '4',
      baths: '2.5',
      garage: '2',
      stories: '2',
      sqft: '2,379',
      description: 'A classic 2-story design with expanded living areas. The Wyoming offers four spacious bedrooms on the upper level and a wide footprint for impressive curb appeal.',
      image: 'https://drive.google.com/thumbnail?id=1geLCtkZfc68Zx6vzf2Do2u5uoY6P1XMo&sz=w1000',
      floorPlanImgs: [],
      elevations: [
        'https://drive.google.com/thumbnail?id=1IrBgP92YYCxU8lfT1ffEyRlt_AEqLhOa&sz=w1600',
        'https://drive.google.com/thumbnail?id=1h3WX0I5b3bi0JLou-1rTwgVRoBkUpxy&sz=w1600',
        'https://drive.google.com/thumbnail?id=1h5WI3H0eARReGf8b-OO1rzSudxsupZ6K&sz=w1600',
        'https://drive.google.com/thumbnail?id=1gvFg6UlzyqEjJtbB3GA7JButrfZt8Dlm&sz=w1600'
      ],
    },
    {
      id: 'lewes',
      name: 'Lewes',
      price: '$430,000',
      beds: '3',
      baths: '2',
      garage: '2',
      stories: '1',
      sqft: '2,022',
      description: 'Spacious main-level living with a grand feel. The Lewes includes a large kitchen island, walk-in pantry, and a primary suite that feels like a private retreat.',
      image: 'https://drive.google.com/thumbnail?id=10bJIxlQx0IyarO1ODmXDf59XW1rLNpIJ&sz=w1000',
      floorPlanImgs: [],
      elevations: [
        'https://drive.google.com/thumbnail?id=1G21W80sdVTcQe1OM4TnJWpJN4j2FhR3F&sz=w1600',
        'https://drive.google.com/thumbnail?id=1o7UXDMiTJ7Cu9WhirIffRTcinhrlsXYc&sz=w1600',
        'https://drive.google.com/thumbnail?id=1nyaCrwAbnQRaXuU4DX11miwQSjyqg_MS&sz=w1600',
        'https://drive.google.com/thumbnail?id=1o4FpirFvnP7Q-e6whXfLEjUBcpL9KZb-&sz=w1600'
      ],
    },
    {
      id: 'camden-grand',
      name: 'Camden Grand',
      price: '$458,000',
      beds: '4',
      baths: '2.5',
      garage: '2',
      stories: '2',
      sqft: '2,680',
      description: 'Step into the Camden Grand, a breathtaking 2,680 sq. ft. home designed to impress at every turn. The soaring two-story family room floods the main level with natural light, creating an unforgettable space to gather and entertain. A chef-inspired kitchen with stainless steel appliances, a spacious island, and pantry flows seamlessly into the breakfast area and living space, while a formal dining room and private study add both elegance and versatility.',
      image: 'https://drive.google.com/thumbnail?id=1GKgbkA-bZx8vLmMAr589Jo7bGt_8YWmC&sz=w1000',
      floorPlanImgs: [],
      elevations: [
        'https://drive.google.com/thumbnail?id=14yiXK5bTK_H1JBUkGELQHOupJDXwBxbd&sz=w1600',
        'https://drive.google.com/thumbnail?id=1RqKbtnPymNGs2drhqiQ1wSHGctEbezTr&sz=w1600',
        'https://drive.google.com/thumbnail?id=1-7bJhKbVZ9AHWXCBM6GOl_YfJHgWwMkJ&sz=w1600',
        'https://drive.google.com/thumbnail?id=15nZ-4mph-4-2fr0HsPjqdnL9KToooWDj&sz=w1600'
      ],
    },
    {
      id: 'georgetown',
      name: 'Georgetown',
      price: '$480,000',
      beds: '4',
      baths: '2.5',
      garage: '2',
      stories: '2',
      sqft: '2,513',
      description: 'A sophisticated master-on-main design with extra bedrooms upstairs. The Georgetown offers the convenience of first-floor primary living with the space of a full 2-story home.',
      image: 'https://drive.google.com/thumbnail?id=1OAAtpIBWc7fMvpVPiwtDHsasdWYa0LY2&sz=w1000',
      floorPlanImgs: [],
      elevations: [
        'https://drive.google.com/thumbnail?id=1cGvfb3LriU0loB1e-LtB2umqwUDH9LU9&sz=w1600',
        'https://drive.google.com/thumbnail?id=1cy706xj69lA-TilGaypgyqrfdOcWtYBJ&sz=w1600',
        'https://drive.google.com/thumbnail?id=1chIFJtKPgIALLDgJ5AOeIlPbnkQLkUw0&sz=w1600',
        'https://drive.google.com/thumbnail?id=1cZ7booYQIkrjwY-omgah7J1XacwhSYXn&sz=w1600',
        'https://drive.google.com/thumbnail?id=1coAwMTJIlkAEY-RpbSUDqFiDcvdpSWzR&sz=w1600'
      ],
    },
  ];

  // State for viewing individual images
  const [viewingImage, setViewingImage] = useState<string | null>(null);

  const openModal = (type: string, subtitle?: string) => {
    setActiveModal(type);
    setModalSubtitle(subtitle || 'Pinehurst Village');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = '';
  };

  const openImageViewer = (imageUrl: string) => {
    setViewingImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  const closeImageViewer = () => {
    setViewingImage(null);
    document.body.style.overflow = '';
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  const toggleFloorplan = (id: string) => {
    setExpandedPlan(expandedPlan === id ? null : id);
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) window.scrollTo({ top: target.offsetTop - 150, behavior: 'smooth' });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const shareToFacebook = () => window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank');
  const shareToLinkedIn = () => window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href), '_blank');
  const shareByEmail = () => { window.location.href = 'mailto:?subject=Check out Pinehurst Village&body=' + encodeURIComponent(window.location.href); };

  return (
    <>
      <style jsx global>{`
        :root {
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
        }

        .community-page * { margin: 0; padding: 0; box-sizing: border-box; }
        .community-page { font-family: 'Montserrat', sans-serif; color: var(--gray-900); line-height: 1.6; background: var(--white); }
        .community-page a { text-decoration: none; color: inherit; }
        .community-page .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

        /* Hero Section */
        .community-page .hero { padding-top: 100px; background: var(--white); }

        .community-page .hero-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            margin-bottom: 1rem;
        }

        .community-page .btn-request-info {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.875rem 1.75rem;
            background: var(--black);
            color: var(--white);
            font-size: 0.95rem;
            font-weight: 600;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
        }
        .community-page .btn-request-info:hover { background: var(--gray-800); }

        .community-page .btn-share {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.875rem 1.5rem;
            background: var(--white);
            color: var(--gray-700);
            font-size: 0.95rem;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
        }
        .community-page .btn-share:hover { color: var(--black); }
        .community-page .btn-share svg { width: 20px; height: 20px; }

        /* Image Gallery Grid - No See More */
        .community-page .hero-gallery {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 0.5rem;
            border-radius: 12px;
            overflow: hidden;
        }

        .community-page .gallery-main {
            position: relative;
            height: 400px;
            cursor: pointer;
        }
        .community-page .gallery-main img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }
        .community-page .gallery-main:hover img { transform: scale(1.02); }

        .community-page .gallery-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 0.5rem;
        }

        .community-page .gallery-item {
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }
        .community-page .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }
        .community-page .gallery-item:hover img { transform: scale(1.05); }

        /* Breadcrumb - Updated path */
        .community-page .breadcrumb {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.85rem;
            color: var(--gray-500);
            margin-top: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--gray-200);
        }
        .community-page .breadcrumb a { color: var(--gray-500); transition: color 0.2s; }
        .community-page .breadcrumb a:hover { color: var(--black); }
        .community-page .breadcrumb span { color: var(--gray-400); }
        .community-page .breadcrumb strong { color: var(--black); font-weight: 600; }

        /* Hero Info */
        .community-page .hero-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 2rem 0;
            gap: 2rem;
        }

        .community-page .hero-main { flex: 1; }

        /* Community Status with Pulsing Dot */
        .community-page .community-status {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--gray-600);
            margin-bottom: 0.75rem;
        }

        .community-page .status-dot {
            width: 10px;
            height: 10px;
            background: var(--success);
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
        }

        .community-page .hero-title {
            font-size: 2.25rem;
            font-weight: 800;
            color: var(--black);
            line-height: 1.2;
            margin-bottom: 0.5rem;
        }

        .community-page .hero-location {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.95rem;
            color: var(--gray-600);
        }
        .community-page .hero-location a {
            color: var(--gray-600);
            text-decoration: underline;
            text-underline-offset: 2px;
        }
        .community-page .hero-location a:hover { color: var(--black); }

        .community-page .hero-pricing { text-align: right; }
        .community-page .price-label {
            font-size: 0.8rem;
            color: var(--gray-500);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.25rem;
        }
        .community-page .price-value { font-size: 2rem; font-weight: 800; color: var(--black); }

        /* Quick Stats */
        .community-page .quick-stats { display: flex; gap: 2rem; margin-top: 1.5rem; }
        .community-page .stat { display: flex; flex-direction: column; }
        .community-page .stat-value { font-size: 1.1rem; font-weight: 700; color: var(--black); }
        .community-page .stat-label { font-size: 0.8rem; color: var(--gray-500); }
        .community-page .stat-divider { width: 1px; background: var(--gray-200); }

        /* Sub-nav */
        .community-page .sub-nav {
            position: sticky;
            top: 80px;
            z-index: 100;
            background: var(--white);
            border-top: 1px solid var(--gray-200);
            border-bottom: 1px solid var(--gray-200);
            padding: 0 2rem;
        }
        .community-page .sub-nav-content { max-width: 1200px; margin: 0 auto; display: flex; gap: 0; }
        .community-page .sub-nav-link {
            padding: 1rem 1.5rem;
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--gray-600);
            border-bottom: 3px solid transparent;
            transition: all 0.2s;
            cursor: pointer;
        }
        .community-page .sub-nav-link:hover { color: var(--black); }
        .community-page .sub-nav-link.active { color: var(--black); border-bottom-color: var(--black); }

        /* About Section */
        .community-page .about-section { padding: 4rem 0; background: var(--white); }
        .community-page .about-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; }
        .community-page .about-content h2 { font-size: 1.75rem; font-weight: 700; color: var(--black); margin-bottom: 1.5rem; }
        .community-page .about-text { color: var(--gray-600); font-size: 1rem; line-height: 1.8; }
        .community-page .about-text.collapsed { max-height: 150px; overflow: hidden; position: relative; }
        .community-page .about-text.collapsed::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(transparent, var(--white));
        }

        .community-page .read-more-btn {
            margin-top: 1rem;
            padding: 0;
            background: none;
            border: none;
            color: var(--black);
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .community-page .read-more-btn svg { width: 16px; height: 16px; transition: transform 0.3s; }
        .community-page .read-more-btn.expanded svg { transform: rotate(180deg); }

        /* QuickBuy Lock Banner */
        .community-page .quickbuy-banner {
            display: flex;
            align-items: flex-start;
            gap: 1.25rem;
            padding: 1.75rem;
            background: var(--gray-900);
            border-radius: 16px;
            margin-top: 2rem;
        }
        .community-page .quickbuy-icon {
            width: 56px;
            height: 56px;
            min-width: 56px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .community-page .quickbuy-icon svg {
            width: 28px;
            height: 28px;
            color: var(--white);
        }
        .community-page .quickbuy-content h4 {
            font-size: 0.95rem;
            font-weight: 800;
            color: var(--white);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.5rem;
        }
        .community-page .quickbuy-content p {
            font-size: 0.9rem;
            color: rgba(255,255,255,0.75);
            line-height: 1.6;
        }
        .community-page .quickbuy-content strong {
            color: var(--white);
            font-weight: 700;
        }

        .community-page .builder-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.25rem;
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            margin-top: 1rem;
        }
        .community-page .builder-logo {
            width: 56px;
            height: 56px;
            background: var(--white);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.55rem;
            color: var(--gray-600);
            border: 1px solid var(--gray-200);
            text-align: center;
            line-height: 1.2;
        }
        .community-page .builder-logo-img {
            width: 72px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .community-page .builder-logo-img img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        .community-page .builder-info h4 { font-size: 0.95rem; font-weight: 600; color: var(--black); }
        .community-page .builder-info p { font-size: 0.85rem; color: var(--gray-500); }

        /* Features Card */
        .community-page .features-card {
            background: var(--gray-900);
            border-radius: 16px;
            padding: 2rem;
            color: var(--white);
        }
        .community-page .features-card h3 {
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .community-page .features-card h3 svg { width: 20px; height: 20px; color: var(--gold); }
        .community-page .features-list { display: flex; flex-direction: column; gap: 0.875rem; }
        .community-page .feature-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.9rem;
            color: rgba(255,255,255,0.9);
        }
        .community-page .feature-item svg { width: 16px; height: 16px; color: var(--gold); flex-shrink: 0; }

        /* Section Headers with Sort */
        .community-page .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        .community-page .section-header h2 { font-size: 1.5rem; font-weight: 700; color: var(--black); }

        .community-page .sort-dropdown {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: var(--gray-600);
            cursor: pointer;
            padding: 0.5rem 0;
        }
        .community-page .sort-dropdown svg { width: 16px; height: 16px; transition: transform 0.2s; }
        .community-page .sort-dropdown.active svg { transform: rotate(180deg); }

        /* Floor Plans Section - No badges, with View Details button */
        .community-page .floorplans-section { padding: 4rem 0; background: var(--gray-50); }
        .community-page .floorplan-list { display: flex; flex-direction: column; gap: 1rem; }

        .community-page .floorplan-card {
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        .community-page .floorplan-card:hover {
            border-color: var(--gray-300);
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .community-page .floorplan-main {
            display: grid;
            grid-template-columns: 320px 1fr auto;
            cursor: pointer;
        }

        .community-page .floorplan-image {
            position: relative;
            height: 200px;
            overflow: hidden;
        }
        .community-page .floorplan-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        .community-page .floorplan-card:hover .floorplan-image img { transform: scale(1.05); }

        .community-page .floorplan-content {
            padding: 1.5rem 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .community-page .floorplan-name { font-size: 1.5rem; font-weight: 700; color: var(--black); margin-bottom: 0.25rem; }
        .community-page .floorplan-price { font-size: 1.1rem; font-weight: 700; color: var(--gray-700); margin-bottom: 0.75rem; }
        .community-page .floorplan-specs { display: flex; gap: 0.5rem; font-size: 0.95rem; color: var(--gray-600); }
        .community-page .floorplan-specs span { display: flex; align-items: center; }
        .community-page .floorplan-specs .divider { color: var(--gray-300); }

        .community-page .floorplan-action { display: flex; align-items: center; padding: 0 2rem; }
        .community-page .floorplan-view-btn {
            padding: 0.875rem 1.5rem;
            background: var(--white);
            color: var(--black);
            font-size: 0.9rem;
            font-weight: 600;
            text-align: center;
            border: 2px solid var(--black);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
        }
        .community-page .floorplan-view-btn:hover { background: var(--black); color: var(--white); }

        /* Expanded Floor Plan Details */
        .community-page .floorplan-details {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease;
            background: var(--gray-50);
        }
        .community-page .floorplan-card.expanded .floorplan-details { max-height: 600px; }

        .community-page .floorplan-details-content {
            padding: 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        .community-page .details-left h4 { font-size: 1rem; font-weight: 700; color: var(--black); margin-bottom: 1rem; }
        .community-page .details-left p { font-size: 0.95rem; color: var(--gray-600); line-height: 1.7; margin-bottom: 1.5rem; }

        .community-page .elevation-options { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .community-page .elevation-thumb {
            width: 80px;
            height: 60px;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid var(--gray-200);
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .community-page .elevation-thumb:hover { 
            border-color: var(--black); 
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateY(-2px);
        }
        .community-page .elevation-thumb img { width: 100%; height: 100%; object-fit: cover; }

        .community-page .floorplan-diagram-placeholder {
            width: 100%;
            max-width: 400px;
            background: var(--gray-100);
            border-radius: 12px;
            padding: 3rem;
            text-align: center;
            color: var(--gray-500);
        }

        .community-page .details-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .community-page .btn-floorplan {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.875rem 1.5rem;
            background: var(--black);
            color: var(--white);
            font-size: 0.9rem;
            font-weight: 600;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: background 0.2s;
        }
        .community-page .btn-floorplan:hover { background: var(--gray-800); }

        .community-page .btn-floorplan-outline {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.875rem 1.5rem;
            background: var(--white);
            color: var(--black);
            font-size: 0.9rem;
            font-weight: 600;
            border-radius: 8px;
            border: 2px solid var(--gray-300);
            cursor: pointer;
            transition: all 0.2s;
        }
        .community-page .btn-floorplan-outline:hover { border-color: var(--black); }

        .community-page .details-right { display: flex; align-items: center; justify-content: center; }
        .community-page .floorplan-diagram {
            width: 100%;
            max-width: 400px;
            background: var(--white);
            border-radius: 12px;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.06);
        }
        .community-page .floorplan-diagram img { width: 100%; height: auto; }

        /* Map Section */
        .community-page .map-section { padding: 4rem 0; background: var(--gray-50); }
        .community-page .map-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .community-page .map-header h2 { font-size: 1.5rem; font-weight: 700; }
        .community-page .map-container { border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .community-page .map-container iframe { width: 100%; height: 500px; border: none; }

        /* Location Section */
        .community-page .location-section { padding: 4rem 0; background: var(--white); }
        .community-page .location-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .community-page .location-card { 
            background: var(--gray-50); 
            border-radius: 12px; 
            padding: 2rem;
            border: 1px solid var(--gray-100);
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .community-page .location-card h3 {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--black);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .community-page .location-card h3 svg { width: 22px; height: 22px; color: var(--gold); }
        .community-page .school-district-name { 
            font-size: 0.95rem; 
            color: var(--gray-600); 
            margin-bottom: 1.5rem;
            font-weight: 500;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--gray-200);
        }
        .community-page .school-list { list-style: none; }
        .community-page .school-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid var(--gray-100);
        }
        .community-page .school-item:last-child { border-bottom: none; padding-bottom: 0; }
        .community-page .school-name { font-weight: 700; color: var(--black); font-size: 0.9rem; }
        .community-page .school-grades { font-size: 0.8rem; color: var(--gray-500); margin-top: 0.25rem; }
        .community-page .school-distance { font-size: 0.85rem; color: var(--gray-400); font-weight: 700; }

        .community-page .nearby-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .community-page .nearby-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            background: var(--white);
            border-radius: 8px;
            border: 1px solid var(--gray-100);
        }
        .community-page .nearby-item svg { width: 18px; height: 18px; color: var(--gold); flex-shrink: 0; }
        .community-page .nearby-item span { flex: 1; font-size: 0.9rem; color: var(--gray-700); font-weight: 500; }
        .community-page .nearby-item .time { font-size: 0.8rem; color: var(--gray-400); font-weight: 700; flex: none; }

        /* CTA Section */
        .community-page .cta-section { padding: 5rem 0; background: var(--gray-900); text-align: center; }
        .community-page .cta-content h2 { font-size: 2.25rem; font-weight: 700; color: var(--white); margin-bottom: 1rem; }
        .community-page .cta-content p {
            font-size: 1.1rem;
            color: rgba(255,255,255,0.7);
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .community-page .cta-buttons { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

        .community-page .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            background: var(--gold);
            color: var(--black);
            font-size: 1rem;
            font-weight: 700;
            border-radius: 50px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        .community-page .btn-primary:hover { background: var(--gold-light); }

        .community-page .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            background: transparent;
            color: var(--white);
            font-size: 1rem;
            font-weight: 600;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50px;
            transition: all 0.3s ease;
        }
        .community-page .btn-secondary:hover { border-color: var(--white); background: rgba(255,255,255,0.1); }

        /* Modal Overlay */
        .community-page .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }

        .community-page .modal {
            background: var(--white);
            border-radius: 20px;
            width: 100%;
            max-width: 420px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        .community-page .modal-header { padding: 1.75rem 1.75rem 0; }
        .community-page .modal-header h3 { font-size: 1.5rem; font-weight: 700; color: var(--black); text-align: center; }
        .community-page .modal-close {
            width: 40px;
            height: 40px;
            border: none;
            background: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
        .community-page .modal-close svg { width: 24px; height: 24px; color: var(--gray-600); }
        .community-page .modal-close:hover svg { color: var(--black); }
        .community-page .modal-body { padding: 2rem; }

        /* Share Modal */
        .community-page .share-modal { text-align: center; }
        .community-page .share-options { display: flex; flex-direction: column; gap: 0; }
        .community-page .share-option {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.25rem 0;
            border-bottom: 1px solid var(--gray-200);
            cursor: pointer;
            transition: background 0.2s;
            background: none;
            border-left: none;
            border-right: none;
            border-top: none;
            width: 100%;
        }
        .community-page .share-option:last-of-type { border-bottom: none; }
        .community-page .share-option:hover {
            background: var(--gray-50);
            margin: 0 -2rem;
            padding-left: 2rem;
            padding-right: 2rem;
        }
        .community-page .share-option svg { width: 24px; height: 24px; color: var(--black); }
        .community-page .share-option span { font-size: 1.1rem; font-weight: 500; color: var(--black); }

        .community-page .copy-link-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            width: 100%;
            padding: 1rem;
            margin-top: 1rem;
            background: var(--white);
            border: 2px solid var(--gray-800);
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            color: var(--gray-800);
            cursor: pointer;
            transition: all 0.2s;
        }
        .community-page .copy-link-btn:hover { background: var(--gray-100); }
        .community-page .copy-link-btn svg { width: 20px; height: 20px; }

        /* Request Info Modal */
        .community-page .request-modal .modal-header { padding: 2rem 2rem 0; }
        .community-page .request-modal .modal-header p { text-align: center; color: var(--gray-500); margin-top: 0.25rem; }

        .community-page .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .community-page .form-group { margin-bottom: 1rem; }
        .community-page .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem; }
        .community-page .form-group input,
        .community-page .form-group select,
        .community-page .form-group textarea {
            width: 100%;
            padding: 0.875rem 1rem;
            border: 1px solid var(--gray-300);
            border-radius: 8px;
            font-size: 1rem;
            font-family: inherit;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .community-page .form-group input:focus,
        .community-page .form-group select:focus,
        .community-page .form-group textarea:focus {
            outline: none;
            border-color: var(--black);
            box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
        }
        .community-page .form-group textarea { resize: vertical; min-height: 100px; }
        .community-page .form-submit {
            width: 100%;
            padding: 1rem;
            background: var(--black);
            color: var(--white);
            font-size: 1rem;
            font-weight: 700;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .community-page .form-submit:hover { background: var(--gray-800); }

        /* Lightbox */
        .community-page .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.95);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .community-page .lightbox-close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            width: 48px;
            height: 48px;
            background: transparent;
            border: none;
            cursor: pointer;
            color: var(--white);
        }
        .community-page .lightbox-close svg { width: 32px; height: 32px; }
        .community-page .lightbox-content { max-width: 90%; max-height: 90%; }
        .community-page .lightbox-content img { max-width: 100%; max-height: 85vh; object-fit: contain; }
        .community-page .lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 48px;
            height: 48px;
            background: rgba(255,255,255,0.1);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            color: var(--white);
            transition: background 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .community-page .lightbox-nav:hover { background: rgba(255,255,255,0.2); }
        .community-page .lightbox-nav.prev { left: 2rem; }
        .community-page .lightbox-nav.next { right: 2rem; }
        .community-page .lightbox-counter {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            color: var(--white);
            font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .community-page .hero-gallery { grid-template-columns: 1fr; }
            .community-page .gallery-main { height: 300px; }
            .community-page .gallery-grid { display: none; }
            .community-page .about-grid { grid-template-columns: 1fr; gap: 2rem; }
            .community-page .floorplan-main { grid-template-columns: 250px 1fr auto; }
            .community-page .floorplan-details-content { grid-template-columns: 1fr; }
            .community-page .location-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
            .community-page .hero { padding-top: 80px; }
            .community-page .hero-actions { flex-direction: column; align-items: stretch; gap: 0.75rem; }
            .community-page .btn-request-info { justify-content: center; }
            .community-page .gallery-main { height: 250px; }
            .community-page .hero-info { flex-direction: column; }
            .community-page .hero-pricing { text-align: left; }
            .community-page .quick-stats { flex-wrap: wrap; gap: 1.5rem; }
            .community-page .sub-nav { overflow-x: auto; padding: 0 1rem; }
            .community-page .sub-nav-content { min-width: max-content; }
            .community-page .sub-nav-link { padding: 1rem; font-size: 0.85rem; }
            .community-page .floorplan-main { grid-template-columns: 1fr; }
            .community-page .floorplan-image { height: 200px; }
            .community-page .floorplan-content { padding: 1.25rem; }
            .community-page .floorplan-action { padding: 0 1.25rem 1.25rem; }
            .community-page .floorplan-view-btn { width: 100%; }
            .community-page .map-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
            .community-page .map-container iframe { height: 400px; }
            .community-page .cta-content h2 { font-size: 1.75rem; }
            .community-page .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="community-page">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-actions">
              <div className="hero-actions-left">
                <button className="btn-request-info" onClick={() => openModal('request')}>Request information</button>
              </div>
              <button className="btn-share" onClick={() => openModal('share')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                Share
              </button>
            </div>

            <div className="hero-gallery">
              <div className="gallery-main" onClick={() => openLightbox(0)}>
                <img src="https://drive.google.com/thumbnail?id=1rz0seNr6VhDlx6m9LKMqAIyuGRuoAOOs&sz=w1200" alt="Pinehurst Village" referrerPolicy="no-referrer" style={{objectFit: 'contain', backgroundColor: '#fafafa'}} />
              </div>
              <div className="gallery-grid">
                <div className="gallery-item" onClick={() => openLightbox(1)}>
                  <img src="https://drive.google.com/thumbnail?id=1qJy3hT5Sg5HEz30-_hcaBdDbDI5BLgdr&sz=w600" alt="Exterior View" referrerPolicy="no-referrer" />
                </div>
                <div className="gallery-item" onClick={() => openLightbox(2)}>
                  <img src="https://drive.google.com/thumbnail?id=1ceA5K9Jy5inq4Lzq1CLfFo_lBO4tmkf0&sz=w600" alt="Exterior View 2" referrerPolicy="no-referrer" />
                </div>
                <div className="gallery-item" onClick={() => openLightbox(3)}>
                  <img src="https://drive.google.com/thumbnail?id=19E0JerP-nPbxDCMHV2mxbbw1oawNHEW2&sz=w600" alt="Kitchen" referrerPolicy="no-referrer" />
                </div>
                <div className="gallery-item" onClick={() => openLightbox(4)}>
                  <img src="https://drive.google.com/thumbnail?id=1R5e7im4F8KPd0cDkyZLoN2VLOAoOqG9G&sz=w600" alt="Living Room" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>

            <div className="breadcrumb">
              <Link href="/new-construction">New Construction</Link>
              <span>→</span>
              <Link href="/available-communities">Communities</Link>
              <span>→</span>
              <strong>Pinehurst Village</strong>
            </div>

            <div className="hero-info">
              <div className="hero-main">
                <div className="community-status">
                  <span className="status-dot"></span>
                  Now Selling
                </div>
                <h1 className="hero-title">Pinehurst Village</h1>
                <div className="hero-location">
                  <a href="https://maps.google.com/?q=25+Belfry+Dr,+Felton,+DE+19943" target="_blank" rel="noreferrer">25 Belfry Dr, Felton, DE 19943</a>
                </div>
                <div className="quick-stats">
                  <div className="stat"><span className="stat-value">3 - 5</span><span className="stat-label">Bedrooms</span></div>
                  <div className="stat-divider"></div>
                  <div className="stat"><span className="stat-value">2 - 3.5</span><span className="stat-label">Bathrooms</span></div>
                  <div className="stat-divider"></div>
                  <div className="stat"><span className="stat-value">2</span><span className="stat-label">Garage</span></div>
                  <div className="stat-divider"></div>
                  <div className="stat"><span className="stat-value">1 - 2</span><span className="stat-label">Stories</span></div>
                  <div className="stat-divider"></div>
                  <div className="stat"><span className="stat-value">1,727 - 2,680</span><span className="stat-label">Sq. Ft.</span></div>
                </div>
              </div>
              <div className="hero-pricing">
                <div className="price-label">Starting From</div>
                <div className="price-value">$400,000</div>
              </div>
            </div>
          </div>
        </section>

        {/* Sub Navigation */}
        <nav className="sub-nav">
          <div className="sub-nav-content">
            <a href="#about" className="sub-nav-link active" onClick={(e) => scrollToSection(e, 'about')}>Overview</a>
            <a href="#floorplans" className="sub-nav-link" onClick={(e) => scrollToSection(e, 'floorplans')}>Floor Plans</a>
            <a href="#map" className="sub-nav-link" onClick={(e) => scrollToSection(e, 'map')}>Site Map</a>
            <a href="#location" className="sub-nav-link" onClick={(e) => scrollToSection(e, 'location')}>Location</a>
          </div>
        </nav>

        {/* About Section */}
        <section className="about-section" id="about">
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <h2>About Pinehurst Village</h2>
                <div className={`about-text ${isAboutCollapsed ? 'collapsed' : ''}`}>
                  <p>Pinehurst Village by Village Builders offers quality new construction homes in the heart of Kent County, Delaware. These thoughtfully designed residences feature open-concept floor plans, modern finishes, and the space your family needs to grow.</p>
                  <p style={{marginTop: '1rem'}}>Every home includes an unfinished basement with rough-in plumbing—ready to finish as your needs evolve. Take advantage of our limited-time 20% OFF design center options to personalize your new home.</p>
                  <p style={{marginTop: '1rem'}}>Ideally situated in Felton, Pinehurst Village offers a serene residential escape with easy access to Killens Pond State Park, Dover shopping, and Delaware beaches. Experience the quality and care of Village Builders in a neighborhood designed for real life.</p>
                </div>
                <button className={`read-more-btn ${!isAboutCollapsed ? 'expanded' : ''}`} onClick={() => setIsAboutCollapsed(!isAboutCollapsed)}>
                  {isAboutCollapsed ? 'Read more' : 'Read less'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>

                {/* QuickBuy Lock Banner */}
                <div className="quickbuy-banner">
                  <div className="quickbuy-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                  </div>
                  <div className="quickbuy-content">
                    <h4>NEED TO SELL YOUR CURRENT HOME FIRST?</h4>
                    <p>Ask about our <strong>RushHome QuickBuy Lock</strong> program. We&apos;ll give you a guaranteed backup offer so you can buy your next home today without a sale contingency. No stress, just certainty.</p>
                  </div>
                </div>

                <div className="builder-card">
                  <div className="builder-logo-img">
                    <img src="https://drive.google.com/thumbnail?id=10oYf7kWSBirByVTWoVLr6aUFNuZ4Lpep&sz=w200" alt="Ashburn Homes" referrerPolicy="no-referrer" />
                  </div>
                  <div className="builder-info">
                    <h4>Built by Ashburn Homes</h4>
                    <p>40+ years building quality homes in Delaware</p>
                  </div>
                </div>
              </div>
              <div className="features-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Standard Features
                </h3>
                <div className="features-list">
                  <div className="feature-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span>Unfinished Basement w/ Rough-In</span></div>
                  <div className="feature-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span>20% OFF Design Center Options</span></div>
                  <div className="feature-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span>Granite Countertops</span></div>
                  <div className="feature-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span>Stainless Steel Appliances</span></div>
                  <div className="feature-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span>LVP Flooring Throughout</span></div>
                  <div className="feature-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span>9&apos; Ceilings on First Floor</span></div>
                  <div className="feature-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span>2-Car Attached Garage</span></div>
                  <div className="feature-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span>Full Landscaping Included</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floor Plans Section */}
        <section className="floorplans-section" id="floorplans">
          <div className="container">
            <div className="section-header">
              <h2>Floor plans in this community ({floorPlans.length})</h2>
              <div className="sort-dropdown">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                Sort by
              </div>
            </div>

            <div className="floorplan-list">
              {floorPlans.map((plan) => (
                <div key={plan.id} className={`floorplan-card ${expandedPlan === plan.id ? 'expanded' : ''}`} id={`floorplan-${plan.id}`}>
                  <div className="floorplan-main" onClick={() => toggleFloorplan(plan.id)}>
                    <div className="floorplan-image">
                      <img src={plan.image} alt={plan.name} referrerPolicy="no-referrer" />
                    </div>
                    <div className="floorplan-content">
                      <h3 className="floorplan-name">{plan.name}</h3>
                      <div className="floorplan-price">Starting at {plan.price}</div>
                      <div className="floorplan-specs">
                        <span>{plan.beds} Bed</span><span className="divider">|</span>
                        <span>{plan.baths} Bath</span><span className="divider">|</span>
                        <span>{plan.garage} Garage</span><span className="divider">|</span>
                        <span>{plan.stories} Story</span><span className="divider">|</span>
                        <span>{plan.sqft} Sq. Ft.</span>
                      </div>
                    </div>
                    <div className="floorplan-action">
                      <button className="floorplan-view-btn">View Details</button>
                    </div>
                  </div>
                  <div className="floorplan-details">
                    <div className="floorplan-details-content">
                      <div className="details-left">
                        <h4>About {plan.name}</h4>
                        <p>{plan.description}</p>
                        {plan.elevations && plan.elevations.length > 0 && (
                          <>
                            <h4>Other Images</h4>
                            <div className="elevation-options">
                              {plan.elevations.slice(0, 5).map((elev, i) => (
                                <div 
                                  key={i} 
                                  className="elevation-thumb" 
                                  onClick={(e) => { e.stopPropagation(); openImageViewer(elev); }}
                                >
                                  <img src={elev.replace('w1600', 'w200')} alt={`Image ${i + 1}`} referrerPolicy="no-referrer" />
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        <div className="details-actions">
                          <button className="btn-floorplan" onClick={(e) => { e.stopPropagation(); openModal('request', plan.name); }}>Request Info</button>
                          {plan.floorPlanImgs && plan.floorPlanImgs.length > 0 && (
                            <button className="btn-floorplan-outline" onClick={(e) => { e.stopPropagation(); openImageViewer(plan.floorPlanImgs[0]); }}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                              View Floor Plan
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="details-right">
                        {plan.floorPlanImgs && plan.floorPlanImgs.length > 0 ? (
                          <div className="floorplan-diagram" onClick={(e) => { e.stopPropagation(); openImageViewer(plan.floorPlanImgs[0]); }} style={{cursor: 'pointer'}}>
                            <img src={plan.floorPlanImgs[0].replace('w1600', 'w600')} alt={`${plan.name} Floor Plan`} referrerPolicy="no-referrer" />
                          </div>
                        ) : (
                          <div className="floorplan-diagram-placeholder">
                            <p>Floor plan coming soon</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Site Map Section */}
        <section className="map-section" id="map">
          <div className="container">
            <div className="map-header">
              <h2>Interactive Site Map</h2>
            </div>
            <div className="map-container">
              <iframe src="https://app.higharc.com/builders/NrnKLBX5m3X2WpAR/locations/RBmOqZ9Y0jZoy8VD/sales-map" title="Pinehurst Village Site Map"></iframe>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="location-section" id="location">
          <div className="container">
            <div className="location-grid">
              <div className="location-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Schools
                </h3>
                <p className="school-district-name">Served by <strong>Lake Forest School District</strong></p>
                <ul className="school-list">
                  <li className="school-item"><div><div className="school-name">Lake Forest North Elementary</div><div className="school-grades">Grades PK, K-3</div></div><span className="school-distance">1.1 mi</span></li>
                  <li className="school-item"><div><div className="school-name">Lake Forest Central Elementary</div><div className="school-grades">Grades 4-5</div></div><span className="school-distance">2.5 mi</span></li>
                  <li className="school-item"><div><div className="school-name">W.T. Chipman Middle School</div><div className="school-grades">Grades 6-8</div></div><span className="school-distance">2.8 mi</span></li>
                  <li className="school-item"><div><div className="school-name">Lake Forest High School</div><div className="school-grades">Grades 9-12</div></div><span className="school-distance">3.1 mi</span></li>
                </ul>
              </div>
              <div className="location-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  What&apos;s Nearby
                </h3>
                <div className="nearby-list">
                  <div className="nearby-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 20.5H7A2.5 2.5 0 0 1 4.5 18v-1.5A2.5 2.5 0 0 1 7 14h10a2.5 2.5 0 0 1 2.5 2.5V18a2.5 2.5 0 0 1-2.5 2.5Z"/><path d="M12 14V7.5"/><path d="M12 7.5c0-2.5 3-4 5-2.5"/><path d="M12 7.5c0-2.5-3-4-5-2.5"/></svg>
                    <span>Killens Pond</span><span className="time">9 min</span>
                  </div>
                  <div className="nearby-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 14l2 2 4-4"/></svg>
                    <span>Walmart</span><span className="time">12 min</span>
                  </div>
                  <div className="nearby-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                    <span>Dover Air Force Base</span><span className="time">16 min</span>
                  </div>
                  <div className="nearby-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/></svg>
                    <span>Bayhealth Hospital</span><span className="time">18 min</span>
                  </div>
                  <div className="nearby-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                    <span>Dover Mall</span><span className="time">22 min</span>
                  </div>
                  <div className="nearby-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 20.5H7A2.5 2.5 0 0 1 4.5 18v-1.5A2.5 2.5 0 0 1 7 14h10a2.5 2.5 0 0 1 2.5 2.5V18a2.5 2.5 0 0 1-2.5 2.5Z"/><path d="M12 14V7.5"/><path d="M12 7.5c0-2.5 3-4 5-2.5"/><path d="M12 7.5c0-2.5-3-4-5-2.5"/></svg>
                    <span>Rehoboth Beach</span><span className="time">55 min</span>
                  </div>
                  <div className="nearby-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                    <span>Philadelphia Airport</span><span className="time">1 hr 15 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Find Your New Home?</h2>
              <p>Schedule a private tour of Pinehurst Village and discover why families love living here.</p>
              <div className="cta-buttons">
                <button className="btn-primary" onClick={() => openModal('request')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Schedule a Tour
                </button>
                <a href="tel:302-219-6707" className="btn-secondary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call 302-219-6707
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Share Modal */}
        {activeModal === 'share' && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal share-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div className="modal-header"><h3>Share with your family and friends</h3></div>
              <div className="modal-body">
                <div className="share-options">
                  <button className="share-option" onClick={shareToFacebook}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    <span>Facebook</span>
                  </button>
                  <button className="share-option" onClick={shareToLinkedIn}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    <span>LinkedIn</span>
                  </button>
                  <button className="share-option" onClick={shareByEmail}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <span>Email</span>
                  </button>
                </div>
                <button className="copy-link-btn" onClick={copyLink}>
                  {linkCopied ? (
                    <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><polyline points="20 6 9 17 4 12"/></svg> Link copied!</>
                  ) : (
                    <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Copy link</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Request Info Modal */}
        {activeModal === 'request' && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal request-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div className="modal-header">
                <h3>Request Information</h3>
                <p>{modalSubtitle}</p>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-row">
                    <div className="form-group"><label htmlFor="firstName">First Name *</label><input type="text" id="firstName" required /></div>
                    <div className="form-group"><label htmlFor="lastName">Last Name *</label><input type="text" id="lastName" required /></div>
                  </div>
                  <div className="form-group"><label htmlFor="email">Email *</label><input type="email" id="email" required /></div>
                  <div className="form-group"><label htmlFor="phone">Phone *</label><input type="tel" id="phone" required /></div>
                  <div className="form-group">
                    <label htmlFor="interest">I&apos;m Interested In</label>
                    <select id="interest">
                      <option value="">Select an option</option>
                      <option value="tour">Scheduling a Tour</option>
                      <option value="floorplan">Floor Plan Information</option>
                      <option value="pricing">Current Pricing</option>
                      <option value="availability">Lot Availability</option>
                    </select>
                  </div>
                  <div className="form-group"><label htmlFor="message">Message</label><textarea id="message" placeholder="Tell us about your timeline, questions, or what you're looking for..."></textarea></div>
                  <button type="submit" className="form-submit">Submit Request</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox */}
        {isLightboxOpen && (
          <div className="lightbox">
            <button className="lightbox-close" onClick={closeLightbox}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <button className="lightbox-nav prev" onClick={prevImage}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="lightbox-content">
              <img src={galleryImages[lightboxIndex]} alt="" referrerPolicy="no-referrer" />
            </div>
            <button className="lightbox-nav next" onClick={nextImage}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div className="lightbox-counter"><span>{lightboxIndex + 1}</span> / <span>{galleryImages.length}</span></div>
          </div>
        )}

        {/* Single Image Viewer */}
        {viewingImage && (
          <div className="lightbox" onClick={closeImageViewer}>
            <button className="lightbox-close" onClick={closeImageViewer}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={viewingImage} alt="" referrerPolicy="no-referrer" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PinehurstVillageContent;
