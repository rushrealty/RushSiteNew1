'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AbbottsPondContent: React.FC = () => {
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(true);
  const [expandedFloorPlan, setExpandedFloorPlan] = useState<string | null>(null);
  const [expandedMoveIn, setExpandedMoveIn] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestSubtitle, setRequestSubtitle] = useState("Abbott's Pond Acres");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [copiedLink, setCopiedLink] = useState(false);

  const galleryImages = [
    'https://drive.google.com/thumbnail?id=1oF8FDvL11zdHgdIQtmllgWIAPoV6wgZY&sz=w1600',
    'https://drive.google.com/thumbnail?id=1cGvfb3LriU0loB1e-LtB2umqwUDH9LU9&sz=w1600',
    'https://drive.google.com/thumbnail?id=1EdjXo54My1a3K9Q19GBHJ77DEB0y_L6r&sz=w1600',
    'https://drive.google.com/thumbnail?id=1R5e7im4F8KPd0cDkyZLoN2VLOAoOqG9G&sz=w1600',
    'https://drive.google.com/thumbnail?id=1RnAGcAoxqxtbwPWSioGBeeQjuot_uoE2&sz=w1600'
  ];

  const floorPlans = [
    { id: 'lewes', name: 'Lewes', price: '$445,000', beds: '3', baths: '2', garage: '2', stories: '1', sqft: '2,022',
      description: 'Lewes is a spacious single-story ranch home perfect for those seeking main-level living. Featuring an open-concept great room and kitchen, plus a luxurious owner\'s suite.',
      img: 'https://drive.google.com/thumbnail?id=10bJIxlQx0IyarO1ODmXDf59XW1rLNpIJ&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=149HSk6Sgzg61xLuyYlemVjz06Oo6d_E2&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=1G21W80sdVTcQe1OM4TnJWpJN4j2FhR3F&sz=w1000',
        'https://drive.google.com/thumbnail?id=1o7UXDMiTJ7Cu9WhirIffRTcinhrlsXYc&sz=w1000',
        'https://drive.google.com/thumbnail?id=1nyaCrwAbnQRaXuU4DX11miwQSjyqg_MS&sz=w1000',
        'https://drive.google.com/thumbnail?id=1o4FpirFvnP7Q-e6whXfLEjUBcpL9KZb-&sz=w1000'
      ] },
    { id: 'burlington', name: 'Burlington', price: '$430,000', beds: '3', baths: '2.5', garage: '2', stories: '2', sqft: '1,955',
      description: 'A thoughtful design featuring a formal dining room and a sprawling 2 story living room. Starting with 3 upper level bedrooms and large primary ensuite, this layout maximizes every square foot.',
      img: 'https://drive.google.com/thumbnail?id=1oRtutWp8QKUPPu29luHWh8ytcVo838T7&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=16icNWKWKvoTWMIHCp8cpvbFv2gEwbbV1&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=1R5e7im4F8KPd0cDkyZLoN2VLOAoOqG9G&sz=w1000',
        'https://drive.google.com/thumbnail?id=1Re7WuqQU6EC0UXrrXGopiTVKLJHwwTyk&sz=w1000',
        'https://drive.google.com/thumbnail?id=1RW-3s6GUtZnAEobiK8MzZb0wWVj1-S89&sz=w1000'
      ] },
    { id: 'ashburton', name: 'Ashburton', price: '$465,000', beds: '4', baths: '2.5', garage: '2', stories: '1', sqft: '2,257',
      description: 'A premium single-story floor plan with an expansive central living area. The open floor plan allows the chef to oversee the family room and never feel separated from the party.',
      img: 'https://drive.google.com/thumbnail?id=16U1tFpQYEtBKxtd4DZfkCumjr5E7W2Xs&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=1LSA9h1M_quWCqQxT4grPM-EHx4jkWpaS&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=1X-9d5BB9-Dzajq2rRVDt6pcwQua9NCsv&sz=w1000',
        'https://drive.google.com/thumbnail?id=1EdjXo54My1a3K9Q19GBHJ77DEB0y_L6r&sz=w1000',
        'https://drive.google.com/thumbnail?id=1LEptssQ1V48f5H0VyhHXGaCVQyFeMSkR&sz=w1000'
      ] },
    { id: 'oceanview', name: 'Oceanview', price: '$510,000', beds: '3', baths: '2', garage: '2', stories: '1', sqft: '2,378',
      description: 'This ranch style home boasts over 2,300 square feet of luxury living with an open floor plan perfect for entertaining. The home features elegant finishes, large windows, and high ceilings.',
      img: 'https://drive.google.com/thumbnail?id=1tBLScrZHZBS36Lx2LkIm4PSdeyMs0Xrw&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=1cFtLug8fJtr0EqVefFmy-hmx9OJ72_mY&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=17ggeIFE-snJAnbN-7XWECEZWZDe9yzzB&sz=w1000',
        'https://drive.google.com/thumbnail?id=1Yjm5vq2GK9-zKjEotJhOX8Q_RK7W69wF&sz=w1000',
        'https://drive.google.com/thumbnail?id=1Yw33rtGDJe4sMm3o5kdljV_cTa6MPXrf&sz=w1000',
        'https://drive.google.com/thumbnail?id=15fYysN5W-1mvBY9ylW8t7AwmBOQzIrtH&sz=w1000'
      ] },
    { id: 'wyoming', name: 'Wyoming', price: '$440,000', beds: '4', baths: '2.5', garage: '2', stories: '2', sqft: '2,379',
      description: 'This beautiful 4-bedroom, 2.5-bath home offers 2,379 sq ft of thoughtfully designed living space. Upstairs, you\'ll love the oversized primary suite complete with a luxurious ensuite bath.',
      img: 'https://drive.google.com/thumbnail?id=1geLCtkZfc68Zx6vzf2Do2u5uoY6P1XMo&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=1UjKll52BEBh9XQUxpmPGxSYMrrHFPWcM&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=1IrBgP92YYCxU8lfT1ffEyRlt_AEqLhOa&sz=w1000',
        'https://drive.google.com/thumbnail?id=1h3WX0I5b3bi0JLou-1rTwgVRoBkUpxy&sz=w1000',
        'https://drive.google.com/thumbnail?id=1h5WI3H0eARReGf8b-OO1rzSudxsupZ6K&sz=w1000',
        'https://drive.google.com/thumbnail?id=1gvFg6UlzyqEjJtbB3GA7JButrfZt8Dlm&sz=w1000'
      ] },
    { id: 'georgetown', name: 'Georgetown', price: '$495,000', beds: '4', baths: '2.5', garage: '2', stories: '2', sqft: '2,513',
      description: 'This stunning property offers over 2,500 square feet of living space with the master bedroom conveniently located on the main level. Features a grand 2-story living room.',
      img: 'https://drive.google.com/thumbnail?id=1OAAtpIBWc7fMvpVPiwtDHsasdWYa0LY2&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=15hUnb4K6LyT7wdwgeovl7NU0Wj5nhw7a&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=1cGvfb3LriU0loB1e-LtB2umqwUDH9LU9&sz=w1000',
        'https://drive.google.com/thumbnail?id=1cy706xj69lA-TilGaypgyqrfdOcWtYBJ&sz=w1000',
        'https://drive.google.com/thumbnail?id=1chIFJtKPgIALLDgJ5AOeIlPbnkQLkUw0&sz=w1000',
        'https://drive.google.com/thumbnail?id=1cZ7booYQIkrjwY-omgah7J1XacwhSYXn&sz=w1000'
      ] }
  ];

  const moveInReadyHomes = [
    { id: 'hampshire', name: 'Hampshire', address: 'Hampshire Inventory Home', lot: 'Available Now', price: '$475,900', status: 'Ready Now',
      beds: '4', baths: '2.5', garage: '2', stories: '2', sqft: '2,415',
      description: "This Hampshire model features 4 bedrooms, 2 and a half bath and is beautifully designed. What better way to relax than in your master suite, which has an amazing en-suite full sized bathroom with tub and shower! The Hampshire's main floor also boasts an eat-in kitchen with dramatic maple 42\" cabinetry. Spacious 9 foot high ceilings make the open floor plan bright and welcoming. The great room is built for hosting or just relaxing and taking in your beautiful new home.",
      img: 'https://drive.google.com/thumbnail?id=17SgJm_eAMsAWMjMIFQIku6vcDizZzpVz&sz=w1000',
      floorPlanImg: 'https://drive.google.com/thumbnail?id=1hY4VDlMQgKMhIwqdnqDP2oj6IHMUXWHS&sz=w1000',
      elevations: [
        'https://drive.google.com/thumbnail?id=1nKN9-gYEntJ4NqpuN4WbsTFjk8FrYJN2&sz=w1000',
        'https://drive.google.com/thumbnail?id=1CfElppr3yD2ISfBmxL9kiJwSP4pvzjj4&sz=w1000',
        'https://drive.google.com/thumbnail?id=1Cn-xYMBupcddQEyUfzu-wdyd073U9utX&sz=w1000',
        'https://drive.google.com/thumbnail?id=1CfFrsoeYdRLDlMYuqwYA7uuAR2ilZyqZ&sz=w1000'
      ] }
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
        .gallery-main img { width: 100%; height: 100%; object-fit: contain; background: #fff; transition: transform 0.3s; }
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
        .builder-logo-img { width: 80px; height: auto; object-fit: contain; border-radius: 8px; }
        .quickbuy-banner { display: flex; align-items: center; gap: 1.5rem; background: linear-gradient(90deg, #111 0%, #222 100%); border-radius: 16px; padding: 1.75rem; margin-top: 2rem; border: 1px solid #333; }
        .quickbuy-icon { width: 56px; height: 56px; background: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .quickbuy-icon svg { width: 28px; height: 28px; color: var(--black); }
        .quickbuy-content h4 { font-size: 1rem; font-weight: 800; color: var(--white); text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 0.5rem; }
        .quickbuy-content p { font-size: 0.9rem; color: rgba(255,255,255,0.6); line-height: 1.6; margin: 0; }
        .quickbuy-content strong { color: var(--white); }
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
        .movein-badge { position: absolute; top: 1rem; left: 1rem; padding: 0.35rem 0.75rem; background: var(--success); color: var(--white); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; border-radius: 4px; }
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
        @media (max-width: 768px) { .container { padding: 0 1rem; } .hero { padding-top: 80px; } .hero-actions { flex-direction: column; align-items: stretch; gap: 0.75rem; } .btn-request-info { justify-content: center; } .gallery-main { height: 250px; } .hero-info { flex-direction: column; } .hero-pricing { text-align: left; } .quick-stats { flex-wrap: wrap; gap: 1.5rem; } .sub-nav { overflow-x: auto; padding: 0 1rem; } .sub-nav-content { min-width: max-content; } .sub-nav-link { padding: 1rem; font-size: 0.85rem; } .quickbuy-banner { flex-direction: column; text-align: center; padding: 1.5rem; } .quickbuy-icon { margin: 0 auto; } .floorplan-main { grid-template-columns: 1fr; } .floorplan-image { height: 200px; } .floorplan-content { padding: 1.25rem; } .floorplan-action { padding: 0 1.25rem 1.25rem; } .floorplan-view-btn { width: 100%; } .movein-card { grid-template-columns: 1fr; } .movein-image { height: 200px; } .movein-action { padding: 0 1.25rem 1.25rem; } .movein-btn { width: 100%; } .map-header { flex-direction: column; align-items: flex-start; gap: 1rem; } .map-container iframe { height: 400px; } .cta-content h2 { font-size: 1.75rem; } .form-row { grid-template-columns: 1fr; } .details-actions { flex-direction: column; } .btn-floorplan, .btn-floorplan-outline { width: 100%; justify-content: center; } }
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
              <div className="hero-location"><a href="https://maps.google.com/?q=20+Amanda+Ave,+Greenwood,+DE+19950" target="_blank" rel="noopener noreferrer">20 Amanda Ave, Greenwood, DE 19950</a></div>
              <div className="quick-stats">
                <div className="stat"><span className="stat-value">3 - 5</span><span className="stat-label">Bedrooms</span></div><div className="stat-divider"></div>
                <div className="stat"><span className="stat-value">2 - 3.5</span><span className="stat-label">Bathrooms</span></div><div className="stat-divider"></div>
                <div className="stat"><span className="stat-value">2</span><span className="stat-label">Garage</span></div><div className="stat-divider"></div>
                <div className="stat"><span className="stat-value">1 - 2</span><span className="stat-label">Stories</span></div><div className="stat-divider"></div>
                <div className="stat"><span className="stat-value">1,955 - 2,513</span><span className="stat-label">Sq. Ft.</span></div>
              </div>
            </div>
            <div className="hero-pricing"><div className="price-label">Starting From</div><div className="price-value">$430,000</div></div>
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
            <p>Located in Greenwood, Abbott&apos;s Pond Acres offers a peaceful residential setting with the perfect blend of privacy and convenience. This quiet community is known for its spacious surroundings, relaxed atmosphere, and easy access to nearby towns for shopping, dining, and everyday essentials.</p>
            <p>With quick connections to Route 13, residents enjoy a convenient commute to Milford and Dover, while Delaware&apos;s coastal beaches, state parks, and outdoor recreation are just a short drive away. Whether you&apos;re looking for a calm place to unwind or a central location that keeps you connected, Abbott&apos;s Pond Acres delivers comfortable living in a laid-back Delaware setting.</p>
          </div>
          <button className={`read-more-btn ${!isAboutCollapsed ? 'expanded' : ''}`} onClick={() => setIsAboutCollapsed(!isAboutCollapsed)}>{isAboutCollapsed ? 'Read more' : 'Read less'}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg></button>
          
          {/* QuickBuy Lock Banner */}
          <div className="quickbuy-banner">
            <div className="quickbuy-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg></div>
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
          <div className="features-list">{['Granite Countertops','42" Upper Kitchen Cabinets',"9' Ceilings on First Floor",'2-Car Attached Garage','Energy Star Certified','Weather Sealing System','LVP Flooring in Wet Areas','Full Landscaping Included'].map((f,i)=><div key={i} className="feature-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg><span>{f}</span></div>)}</div>
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
                <div className="elevation-options">{plan.elevations.slice(0, 4).map((elev, i) => <div key={i} className={`elevation-thumb ${i === 0 ? 'active' : ''}`}><img src={elev} alt={`${plan.name} view ${i + 1}`} /></div>)}</div>
                <div className="details-actions">
                  <button className="btn-floorplan" onClick={(e) => {e.stopPropagation(); openModal('request', plan.name);}}>Request Info</button>
                  <button className="btn-floorplan-outline"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>View Floor Plan</button>
                </div>
              </div>
              <div className="details-right"><div className="floorplan-diagram"><img src={plan.floorPlanImg} alt={`${plan.name} floor plan`} /></div></div>
            </div></div>
          </div>
        ))}</div>
      </div></section>

      <section className="movein-section" id="movein"><div className="container">
        <div className="section-header"><h2>Homes for sale in this community ({moveInReadyHomes.length})</h2></div>
        <div className="movein-list">{moveInReadyHomes.map(home => (
          <div key={home.id} className={`floorplan-card ${expandedMoveIn === home.id ? 'expanded' : ''}`}>
            <div className="floorplan-main" onClick={() => setExpandedMoveIn(expandedMoveIn === home.id ? null : home.id)}>
              <div className="floorplan-image"><img src={home.img} alt={home.name} /><span className="movein-badge">{home.status}</span></div>
              <div className="floorplan-content">
                <h3 className="floorplan-name">{home.price}</h3>
                <div className="floorplan-price">{home.address}</div>
                <div className="floorplan-specs"><span>{home.beds} Bed</span><span className="divider">|</span><span>{home.baths} Bath</span><span className="divider">|</span><span>{home.garage} Garage</span><span className="divider">|</span><span>{home.stories} Story</span><span className="divider">|</span><span>{home.sqft} Sq. Ft.</span></div>
              </div>
              <div className="floorplan-action"><button className="floorplan-view-btn">View Details</button></div>
            </div>
            <div className="floorplan-details"><div className="floorplan-details-content">
              <div className="details-left">
                <h4>About {home.name}</h4><p>{home.description}</p>
                <h4>Other Images</h4>
                <div className="elevation-options">{home.elevations.slice(0, 4).map((elev, i) => <div key={i} className={`elevation-thumb ${i === 0 ? 'active' : ''}`}><img src={elev} alt={`${home.name} view ${i + 1}`} /></div>)}</div>
                <div className="details-actions">
                  <button className="btn-floorplan" onClick={(e) => {e.stopPropagation(); openModal('request', home.name);}}>Request Info</button>
                  <button className="btn-floorplan-outline"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>View Floor Plan</button>
                </div>
              </div>
              <div className="details-right"><div className="floorplan-diagram"><img src={home.floorPlanImg} alt={`${home.name} floor plan`} /></div></div>
            </div></div>
          </div>
        ))}</div>
      </div></section>

      <section className="map-section" id="map"><div className="container"><div className="map-header"><h2>Interactive Site Map</h2></div><div className="map-container"><iframe src="https://app.higharc.com/builders/NrnKLBX5m3X2WpAR/locations/vqGWerxzkAp9d0B6/sales-map" title="Site Map" /></div></div></section>

      <section className="location-section" id="location"><div className="container"><div className="location-grid">
        <div className="location-card">
          <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Schools</h3>
          <p className="school-district-name">Served by <strong>Milford School District</strong></p>
          <ul className="school-list">
            <li className="school-item"><div><div className="school-name">Evelyn I. Morris Early Childhood</div><div className="school-grades">Grades PK, K</div></div><div className="school-distance">10.6 mi</div></li>
            <li className="school-item"><div><div className="school-name">Mispillion Elementary School</div><div className="school-grades">Grades 1-5</div></div><div className="school-distance">11.7 mi</div></li>
            <li className="school-item"><div><div className="school-name">Milford Central Academy</div><div className="school-grades">Grades 6-8</div></div><div className="school-distance">11.2 mi</div></li>
            <li className="school-item"><div><div className="school-name">Milford Senior High School</div><div className="school-grades">Grades 9-12</div></div><div className="school-distance">11.2 mi</div></li>
          </ul>
        </div>
        <div className="location-card">
          <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>What&apos;s Nearby</h3>
          <div className="nearby-list">
            <div className="nearby-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Local Dining & Shops (Greenwood)</span><span className="time">3 min</span></div>
            <div className="nearby-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Harrington Casino & Raceway</span><span className="time">10 min</span></div>
            <div className="nearby-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Killens Pond State Park</span><span className="time">14 min</span></div>
            <div className="nearby-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Walmart Supercenter (Milford)</span><span className="time">18 min</span></div>
            <div className="nearby-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Delaware Beaches (Rehoboth)</span><span className="time">48 min</span></div>
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
