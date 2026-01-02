'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Share2, ChevronDown, CheckCircle, X, Calendar, Phone, Copy, Facebook, Linkedin, Mail, MapPin, ShieldCheck } from 'lucide-react';

const AbbottsPondContent: React.FC = () => {
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(true);
  const [expandedFloorPlan, setExpandedFloorPlan] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestSubtitle, setRequestSubtitle] = useState("Abbott's Pond Acres");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModal = (type: 'share' | 'request', subtitle?: string) => {
    if (type === 'share') setIsShareModalOpen(true);
    else {
      setRequestSubtitle(subtitle || "Abbott's Pond Acres");
      setIsRequestModalOpen(true);
    }
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsShareModalOpen(false);
    setIsRequestModalOpen(false);
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

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div className="abbotts-pond-page">
      <style>{`
        /* CSS Variables from Style Guide */
        .abbotts-pond-page {
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
          --success-dark: #037f4c;
          --error: #ef4444;
          --warning: #f59e0b;
          
          background: var(--white);
          min-height: 100vh;
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Status Indicator */
        .status-dot {
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

        /* About Text Collapse */
        .about-text.collapsed {
          max-height: 150px;
          overflow: hidden;
          position: relative;
        }

        .about-text.collapsed::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(transparent, var(--white));
        }

        /* Sub Navigation */
        .sub-nav {
          position: sticky;
          top: 72px;
          z-index: 100;
          background: var(--white);
          border-top: 1px solid var(--gray-200);
          border-bottom: 1px solid var(--gray-200);
        }

        .sub-nav-link {
          padding: 1rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--gray-500);
          border-bottom: 3px solid transparent;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .sub-nav-link:hover {
          color: var(--black);
        }

        /* Floor Plan Cards */
        .floorplan-details {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
          background: var(--gray-50);
        }

        .floorplan-card.expanded .floorplan-details {
          max-height: 800px;
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Guaranteed Sold Banner */
        .guaranteed-sold-banner {
          background: linear-gradient(90deg, #111 0%, #222 100%);
          border-radius: 16px;
          padding: 2rem;
          color: var(--white);
          margin-top: 2.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border: 1px solid #333;
        }

        /* Hero Section */
        .hero-header {
          padding-top: 100px;
          background: var(--white);
          padding-bottom: 1rem;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        /* Gallery Grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 0.5rem;
          border-radius: 12px;
          overflow: hidden;
          height: 400px;
        }

        .gallery-main {
          position: relative;
          cursor: pointer;
          overflow: hidden;
        }

        .gallery-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-main:hover img {
          transform: scale(1.02);
        }

        .gallery-thumbnails {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 0.5rem;
        }

        .gallery-thumb {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .gallery-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-thumb:hover img {
          transform: scale(1.05);
        }

        /* Breadcrumb */
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--gray-500);
          margin-top: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--gray-200);
        }

        .breadcrumb a {
          color: var(--gray-500);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .breadcrumb a:hover {
          color: var(--black);
        }

        .breadcrumb strong {
          color: var(--black);
          font-weight: 700;
        }

        /* Hero Info */
        .hero-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 2rem 0;
          gap: 2rem;
        }

        .hero-details {
          flex: 1;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--gray-600);
          margin-bottom: 0.75rem;
        }

        .hero-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--black);
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }

        .hero-address {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: var(--gray-600);
        }

        .hero-address a {
          color: var(--gray-600);
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s ease;
        }

        .hero-address a:hover {
          color: var(--black);
        }

        /* Property Stats */
        .property-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          margin-top: 1.5rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--black);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--gray-500);
          text-transform: uppercase;
          font-weight: 500;
        }

        .stat-divider {
          width: 1px;
          background: var(--gray-200);
        }

        /* Price Display */
        .price-display {
          text-align: right;
        }

        .price-label {
          font-size: 0.8rem;
          color: var(--gray-500);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .price-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--black);
        }

        /* Buttons */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: var(--black);
          color: var(--white);
          font-size: 0.95rem;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .btn-primary:hover {
          background: var(--gray-800);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: var(--white);
          color: var(--black);
          font-size: 0.95rem;
          font-weight: 600;
          border: 2px solid var(--black);
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .btn-secondary:hover {
          background: var(--black);
          color: var(--white);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: transparent;
          color: var(--gray-700);
          font-size: 0.95rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-ghost:hover {
          color: var(--black);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--white);
          color: var(--black);
          font-size: 0.9rem;
          font-weight: 600;
          border: 2px solid var(--black);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-outline:hover {
          background: var(--black);
          color: var(--white);
        }

        .btn-gold {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2.5rem;
          background: var(--gold);
          color: var(--black);
          font-size: 1rem;
          font-weight: 700;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-gold:hover {
          background: var(--gold-light);
        }

        .btn-outline-white {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2.5rem;
          background: transparent;
          color: var(--white);
          font-size: 1rem;
          font-weight: 700;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .btn-outline-white:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Sections */
        .section {
          padding: 4rem 0;
        }

        .section-alt {
          padding: 4rem 0;
          background: var(--gray-50);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--black);
          margin-bottom: 2rem;
        }

        /* Overview Grid */
        .overview-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 4rem;
        }

        .about-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--black);
          margin-bottom: 1.5rem;
        }

        .about-text {
          color: var(--gray-600);
          font-size: 1rem;
          line-height: 1.8;
        }

        .about-text p {
          margin-bottom: 1rem;
        }

        .read-more-btn {
          margin-top: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: var(--black);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-size: 0.95rem;
          transition: opacity 0.2s ease;
        }

        .read-more-btn:hover {
          opacity: 0.7;
        }

        .read-more-btn svg {
          transition: transform 0.2s ease;
        }

        .read-more-btn.expanded svg {
          transform: rotate(180deg);
        }

        /* Builder Card */
        .builder-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--gray-50);
          border-radius: 12px;
          margin-top: 2rem;
          border: 1px solid var(--gray-100);
        }

        .builder-logo {
          width: 56px;
          height: 56px;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.7rem;
          color: var(--gray-500);
          text-transform: uppercase;
        }

        .builder-info h4 {
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .builder-info p {
          font-size: 0.85rem;
          color: var(--gray-500);
          font-weight: 500;
        }

        /* Features Card */
        .features-card {
          background: var(--gray-900);
          border-radius: 16px;
          padding: 2rem;
          color: var(--white);
        }

        .features-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .features-grid {
          display: grid;
          gap: 1rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--gray-100);
        }

        .feature-item svg {
          color: var(--gold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Floor Plan Cards */
        .floorplan-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .floorplan-header {
          display: grid;
          grid-template-columns: 320px 1fr auto;
          cursor: pointer;
        }

        .floorplan-image {
          height: 200px;
          overflow: hidden;
        }

        .floorplan-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .floorplan-info {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .floorplan-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .floorplan-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--gray-700);
          margin-bottom: 0.5rem;
        }

        .floorplan-specs {
          color: var(--gray-500);
          font-weight: 500;
        }

        .floorplan-actions {
          padding: 2rem;
          display: flex;
          align-items: center;
        }

        .floorplan-expanded {
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .floorplan-label {
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          color: var(--gray-500);
          margin-bottom: 1rem;
        }

        .floorplan-description {
          color: var(--gray-600);
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }

        .floorplan-thumbs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .floorplan-thumb {
          width: 80px;
          height: 64px;
          background: var(--gray-200);
          border-radius: 4px;
          overflow: hidden;
        }

        .floorplan-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .floorplan-buttons {
          display: flex;
          gap: 1rem;
        }

        .floorplan-preview {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--white);
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid var(--gray-100);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .floorplan-preview img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }

        /* Move-In Ready Cards */
        .mir-card {
          display: grid;
          grid-template-columns: 280px 1fr auto;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          overflow: hidden;
        }

        .mir-image {
          position: relative;
          height: 180px;
        }

        .mir-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mir-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--success);
          color: var(--white);
          padding: 0.35rem 0.75rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          border-radius: 4px;
        }

        .mir-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .mir-price {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .mir-address {
          color: var(--gray-600);
          margin-bottom: 0.5rem;
        }

        .mir-specs {
          color: var(--gray-500);
          font-size: 0.9rem;
        }

        .mir-actions {
          padding: 2rem;
          display: flex;
          align-items: center;
        }

        /* Site Map */
        .site-map-container {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          height: 500px;
          background: var(--white);
        }

        .site-map-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        /* Location Grid */
        .location-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .location-card {
          background: var(--gray-50);
          padding: 2rem;
          border-radius: 12px;
        }

        .location-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .location-title svg {
          color: var(--gold);
        }

        .school-district {
          color: var(--gray-600);
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .school-list {
          border-top: 1px solid var(--gray-200);
          padding-top: 1rem;
        }

        .school-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--gray-100);
          margin-bottom: 1rem;
        }

        .school-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .school-name {
          font-weight: 700;
          font-size: 0.9rem;
        }

        .school-grades {
          font-size: 0.8rem;
          color: var(--gray-500);
        }

        .school-distance {
          font-size: 0.85rem;
          color: var(--gray-400);
          font-weight: 700;
        }

        .nearby-list {
          display: grid;
          gap: 0.5rem;
        }

        .nearby-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--white);
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid var(--gray-100);
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--gray-700);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .nearby-item svg {
          color: var(--gold);
        }

        /* CTA Section */
        .cta-section {
          padding: 6rem 0;
          background: var(--gray-900);
          text-align: center;
          color: var(--white);
        }

        .cta-container {
          max-width: 700px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .cta-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .cta-subtitle {
          color: var(--gray-400);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Modal */
        .modal {
          background: var(--white);
          border-radius: 16px;
          width: 100%;
          max-width: 420px;
          padding: 2rem;
          position: relative;
        }

        .modal-lg {
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--gray-400);
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .modal-close:hover {
          color: var(--black);
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .modal-subtitle {
          color: var(--gray-500);
          text-align: center;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
        }

        /* Share Modal */
        .share-options {
          display: grid;
          gap: 0.5rem;
        }

        .share-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--gray-700);
          width: 100%;
          text-align: left;
          transition: background 0.2s ease;
        }

        .share-option:hover {
          background: var(--gray-50);
        }

        .copy-link-btn {
          width: 100%;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem;
          border: 2px solid var(--black);
          border-radius: 50px;
          background: none;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .copy-link-btn:hover {
          background: var(--black);
          color: var(--white);
        }

        /* Request Form */
        .request-form {
          display: grid;
          gap: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-input {
          width: 100%;
          padding: 1rem;
          font-size: 0.95rem;
          font-family: inherit;
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-radius: 8px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .form-input:focus {
          border-color: var(--black);
        }

        .form-textarea {
          width: 100%;
          padding: 1rem;
          font-size: 0.95rem;
          font-family: inherit;
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-radius: 8px;
          outline: none;
          min-height: 120px;
          resize: vertical;
          transition: border-color 0.2s ease;
        }

        .form-textarea:focus {
          border-color: var(--black);
        }

        .form-submit {
          width: 100%;
          padding: 1rem;
          background: var(--black);
          color: var(--white);
          border: none;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .form-submit:hover {
          background: var(--gray-800);
        }

        /* Lightbox */
        .lightbox-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          color: var(--white);
          cursor: pointer;
          padding: 0;
        }

        .lightbox-nav {
          position: absolute;
          background: none;
          border: none;
          color: var(--white);
          cursor: pointer;
          font-size: 2.5rem;
          font-weight: 800;
          padding: 1rem;
        }

        .lightbox-prev {
          left: 1.5rem;
        }

        .lightbox-next {
          right: 1.5rem;
        }

        .lightbox-image {
          max-width: 90%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 8px;
        }

        .lightbox-counter {
          position: absolute;
          bottom: 2.5rem;
          color: var(--white);
          font-weight: 700;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .overview-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .location-grid {
            grid-template-columns: 1fr;
          }

          .floorplan-header {
            grid-template-columns: 1fr;
          }

          .floorplan-expanded {
            grid-template-columns: 1fr;
          }

          .mir-card {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .hero-container {
            padding: 0 1rem;
          }

          .container {
            padding: 0 1rem;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
            height: auto;
          }

          .gallery-main {
            height: 250px;
          }

          .gallery-thumbnails {
            display: none;
          }

          .hero-info {
            flex-direction: column;
          }

          .price-display {
            text-align: left;
          }

          .property-stats {
            gap: 1rem;
          }

          .stat-divider {
            display: none;
          }

          .cta-title {
            font-size: 1.75rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .floorplan-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      {/* Hero Header Actions */}
      <section className="hero-header">
        <div className="hero-container">
          <div className="hero-actions">
            <button onClick={() => openModal('request')} className="btn-primary">
              Request information
            </button>
            <button onClick={() => openModal('share')} className="btn-ghost">
              <Share2 size={20} /> Share
            </button>
          </div>

          {/* Image Gallery Grid */}
          <div className="gallery-grid">
            <div className="gallery-main" onClick={() => openLightbox(0)}>
              <img src={galleryImages[0]} alt="Main Community View" />
            </div>
            <div className="gallery-thumbnails">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="gallery-thumb" onClick={() => openLightbox(i)}>
                  <img src={galleryImages[i]} alt={`Gallery View ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link href="/new-construction">New Construction</Link>
            <span>→</span>
            <Link href="/communities">Communities</Link>
            <span>→</span>
            <strong>Abbott&apos;s Pond Acres</strong>
          </nav>

          {/* Hero Main Info */}
          <div className="hero-info">
            <div className="hero-details">
              <div className="status-badge">
                <span className="status-dot"></span>
                Now Selling
              </div>
              <h1 className="hero-title">Abbott&apos;s Pond Acres</h1>
              <div className="hero-address">
                <a 
                  href="https://maps.google.com/?q=123+Model+Home+Drive,+Clayton,+DE+19938" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  123 Model Home Drive, Clayton, DE 19938
                </a>
              </div>
              <div className="property-stats">
                <div className="stat-item">
                  <span className="stat-value">3 - 5</span>
                  <span className="stat-label">Bedrooms</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-value">2 - 3.5</span>
                  <span className="stat-label">Bathrooms</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-value">2</span>
                  <span className="stat-label">Garage</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-value">1 - 2</span>
                  <span className="stat-label">Stories</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-value">2,022 - 2,890</span>
                  <span className="stat-label">Sq. Ft.</span>
                </div>
              </div>
            </div>
            <div className="price-display">
              <div className="price-label">Starting From</div>
              <div className="price-value">$489,900</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-nav */}
      <nav className="sub-nav">
        <div className="container" style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {['Overview', 'Floor Plans', 'Move-In Ready', 'Site Map', 'Location'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              className="sub-nav-link"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Overview Section */}
      <section className="section" id="overview">
        <div className="container">
          <div className="overview-grid">
            <div>
              <h2 className="about-title">About Abbott&apos;s Pond Acres</h2>
              <div className={`about-text ${isAboutCollapsed ? 'collapsed' : ''}`}>
                <p>Discover peaceful country living just minutes from Dover in the heart of Kent County. Abbott&apos;s Pond Acres offers spacious homesites, modern floor plans, and the charm of rural Delaware without sacrificing convenience.</p>
                <p>Each home features open-concept layouts, energy-efficient construction, and the quality craftsmanship you expect from Ashburn Homes. With quick access to Route 13 and downtown Dover, you&apos;ll enjoy the perfect blend of tranquility and accessibility.</p>
              </div>
              <button 
                onClick={() => setIsAboutCollapsed(!isAboutCollapsed)} 
                className={`read-more-btn ${!isAboutCollapsed ? 'expanded' : ''}`}
              >
                {isAboutCollapsed ? 'Read more' : 'Read less'} 
                <ChevronDown size={18} />
              </button>
              
              {/* Guaranteed Sold USP Banner */}
              <div className="guaranteed-sold-banner">
                <div style={{ 
                  flexShrink: 0, 
                  width: 64, 
                  height: 64, 
                  background: 'white', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'black',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                    Need to sell your current home first?
                  </h4>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Ask about our <strong>RushHome QuickBuy Lock</strong> program. We&apos;ll give you a guaranteed backup offer so you can buy your next home today without a sale contingency. No stress, just certainty.
                  </p>
                </div>
              </div>

              <div className="builder-card">
                <div className="builder-logo">ASHBURN</div>
                <div className="builder-info">
                  <h4>Built by Ashburn Homes</h4>
                  <p>40+ years building quality homes in Delaware</p>
                </div>
              </div>
            </div>

            <div className="features-card">
              <h3 className="features-title">
                <CheckCircle size={24} style={{ color: 'var(--gold)' }} /> 
                Standard Features
              </h3>
              <div className="features-grid">
                {[
                  'Granite Countertops',
                  'Stainless Steel Appliances',
                  'LVP Flooring Throughout',
                  "9' Ceilings on First Floor",
                  '2-Car Attached Garage',
                  'Energy Star Certified',
                  'Smart Home Technology',
                  'Full Landscaping Included'
                ].map((feature, i) => (
                  <div key={i} className="feature-item">
                    <CheckCircle size={18} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section className="section-alt" id="floor-plans">
        <div className="container">
          <h2 className="section-title">Floor plans in this community (3)</h2>
          <div>
            {[
              { 
                id: 'lewes', 
                name: 'Lewes', 
                price: '$489,900', 
                specs: '3 Bed | 2 Bath | 2 Garage | 1 Story | 2,022 Sq. Ft.', 
                img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' 
              },
              { 
                id: 'georgetown', 
                name: 'Georgetown', 
                price: '$555,900', 
                specs: '4 Bed | 3.5 Bath | 2 Garage | 2 Story | 2,890 Sq. Ft.', 
                img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' 
              },
              { 
                id: 'livingston', 
                name: 'Livingston', 
                price: '$599,900', 
                specs: '5 Bed | 3 Bath | 2 Garage | 2 Story | 2,650 Sq. Ft.', 
                img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' 
              }
            ].map((plan) => (
              <div 
                key={plan.id} 
                className={`floorplan-card ${expandedFloorPlan === plan.id ? 'expanded' : ''}`}
              >
                <div 
                  className="floorplan-header" 
                  onClick={() => setExpandedFloorPlan(expandedFloorPlan === plan.id ? null : plan.id)}
                >
                  <div className="floorplan-image">
                    <img src={plan.img} alt={plan.name} />
                  </div>
                  <div className="floorplan-info">
                    <h3 className="floorplan-name">{plan.name}</h3>
                    <div className="floorplan-price">Starting at {plan.price}</div>
                    <div className="floorplan-specs">{plan.specs}</div>
                  </div>
                  <div className="floorplan-actions">
                    <button className="btn-outline">View Details</button>
                  </div>
                </div>
                <div className="floorplan-details">
                  <div className="floorplan-expanded">
                    <div>
                      <h4 className="floorplan-label">About {plan.name}</h4>
                      <p className="floorplan-description">
                        Experience the perfect balance of luxury and practicality. This home features an open concept layout designed for modern life.
                      </p>
                      <h4 className="floorplan-label">Other Images</h4>
                      <div className="floorplan-thumbs">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="floorplan-thumb">
                            <img src={plan.img} alt={`${plan.name} view ${i}`} />
                          </div>
                        ))}
                      </div>
                      <div className="floorplan-buttons">
                        <button 
                          onClick={(e) => { e.stopPropagation(); openModal('request', plan.name); }} 
                          className="btn-primary"
                          style={{ borderRadius: 8 }}
                        >
                          Request Info
                        </button>
                        <button className="btn-outline">
                          <Copy size={18} /> View Floor Plan
                        </button>
                      </div>
                    </div>
                    <div className="floorplan-preview">
                      <img src={plan.img} alt={`${plan.name} floor plan`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Move-In Ready Section */}
      <section className="section" id="move-in-ready">
        <div className="container">
          <h2 className="section-title">Homes for sale in this community (2)</h2>
          <div className="mir-card">
            <div className="mir-image">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800" alt="Move-in ready home" />
              <span className="mir-badge">Ready Now</span>
            </div>
            <div className="mir-info">
              <div className="mir-price">$525,000</div>
              <div className="mir-address">123 Abbott Lane, Lot 24</div>
              <div className="mir-specs">4 Bed | 3 Bath | 2 Garage | 2 Story | 2,450 Sq. Ft.</div>
            </div>
            <div className="mir-actions">
              <button 
                onClick={() => openModal('request', '123 Abbott Lane')} 
                className="btn-outline"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Site Map Section */}
      <section className="section-alt" id="site-map">
        <div className="container">
          <h2 className="section-title">Interactive Site Map</h2>
          <div className="site-map-container">
            <iframe 
              src="https://app.higharc.com/builders/NrnKLBX5m3X2WpAR/locations/RBmOqZ9Y0jZoy8VD/sales-map" 
              title="Site Map"
            />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section" id="location">
        <div className="container">
          <div className="location-grid">
            <div className="location-card">
              <h3 className="location-title">
                <CheckCircle size={22} /> Schools
              </h3>
              <p className="school-district">
                Served by <strong>Smyrna School District</strong>
              </p>
              <div className="school-list">
                {[
                  { name: 'Smyrna Elementary', grades: 'K-4', distance: '2.3 mi' },
                  { name: 'Smyrna Middle', grades: '5-8', distance: '3.1 mi' },
                  { name: 'Smyrna High', grades: '9-12', distance: '3.4 mi' }
                ].map(school => (
                  <div key={school.name} className="school-item">
                    <div>
                      <div className="school-name">{school.name}</div>
                      <div className="school-grades">Grades {school.grades}</div>
                    </div>
                    <div className="school-distance">{school.distance}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="location-card">
              <h3 className="location-title">
                <MapPin size={22} /> What&apos;s Nearby
              </h3>
              <div className="nearby-list">
                {[
                  'Smyrna Walmart & Shopping (4 min)',
                  'Local Restaurants & Dining (5 min)',
                  'Bayhealth Hospital (12 min)',
                  'Dover Mall & Outlets (15 min)'
                ].map(place => (
                  <div key={place} className="nearby-item">
                    <MapPin size={16} /> {place}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Find Your New Home?</h2>
          <p className="cta-subtitle">
            Schedule a private tour of Abbott&apos;s Pond Acres and discover why families love living here.
          </p>
          <div className="cta-buttons">
            <button onClick={() => openModal('request')} className="btn-gold">
              <Calendar size={20} /> Schedule a Tour
            </button>
            <a href="tel:302-219-6707" className="btn-outline-white">
              <Phone size={20} /> Call 302-219-6707
            </a>
          </div>
        </div>
      </section>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="modal-close">
              <X size={24} />
            </button>
            <h3 className="modal-title">Share with friends</h3>
            <div className="share-options">
              <button className="share-option">
                <Facebook size={20} /> Facebook
              </button>
              <button className="share-option">
                <Linkedin size={20} /> LinkedIn
              </button>
              <button className="share-option">
                <Mail size={20} /> Email
              </button>
            </div>
            <button className="copy-link-btn">
              <Copy size={18} /> Copy Link
            </button>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {isRequestModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="modal-close">
              <X size={24} />
            </button>
            <h3 className="modal-title" style={{ fontSize: '1.75rem' }}>Request Info</h3>
            <p className="modal-subtitle">{requestSubtitle}</p>
            <form 
              className="request-form" 
              onSubmit={e => { 
                e.preventDefault(); 
                alert('Request sent!'); 
                closeModal(); 
              }}
            >
              <div className="form-row">
                <input 
                  type="text"
                  placeholder="First Name" 
                  className="form-input" 
                  required 
                />
                <input 
                  type="text"
                  placeholder="Last Name" 
                  className="form-input" 
                  required 
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="form-input" 
                required 
              />
              <input 
                type="tel" 
                placeholder="Phone" 
                className="form-input" 
                required 
              />
              <textarea 
                placeholder="Message" 
                className="form-textarea"
              />
              <button type="submit" className="form-submit">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="lightbox">
          <button onClick={closeLightbox} className="lightbox-close">
            <X size={40} />
          </button>
          <button onClick={prevLightbox} className="lightbox-nav lightbox-prev">
            ‹
          </button>
          <img 
            src={galleryImages[lightboxIndex]} 
            alt={`Gallery image ${lightboxIndex + 1}`}
            className="lightbox-image" 
          />
          <button onClick={nextLightbox} className="lightbox-nav lightbox-next">
            ›
          </button>
          <div className="lightbox-counter">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default AbbottsPondContent;
