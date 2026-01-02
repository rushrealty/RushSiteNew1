import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { COMMUNITIES_DATA } from '../data/communities';

const AvailableCommunities: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  
  const communitiesMap = COMMUNITIES_DATA as Record<string, any>;
  const [visibleCount, setVisibleCount] = useState(Object.keys(communitiesMap).length);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMap = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const infoWindow = useRef<any>(null);

  useEffect(() => {
    document.title = "New Construction Communities | Rush Home Team";
    
    let isMounted = true;

    const initMap = async () => {
      const g = (window as any).google;
      if (!g?.maps?.importLibrary || !mapRef.current) return;

      try {
        const { Map, InfoWindow } = await g.maps.importLibrary("maps");
        const { Geocoder } = await g.maps.importLibrary("geocoding");
        const { AdvancedMarkerElement, PinElement } = await g.maps.importLibrary("marker");
        const { LatLngBounds, LatLng } = await g.maps.importLibrary("core");

        if (!isMounted) return;

        const center = { lat: 38.85, lng: -75.45 };
        googleMap.current = new Map(mapRef.current, {
          zoom: 9,
          center: center,
          mapId: 'DEMO_MAP_ID', 
          styles: [
            { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] }
          ]
        });

        infoWindow.current = new InfoWindow();
        const geocoder = new Geocoder();
        const bounds = new LatLngBounds();

        const communities = Object.entries(communitiesMap);
        if (communities.length === 0) return;

        let processedCount = 0;

        communities.forEach(([id, community]) => {
          geocoder.geocode({ address: community.address }, (results: any, status: any) => {
            if (!isMounted) return;
            
            let position;
            if (status === 'OK' && results[0]) {
              position = results[0].geometry.location;
            } else {
              position = new LatLng(community.lat, community.lng);
            }

            bounds.extend(position);

            // Determine marker color based on county to match legend
            let markerColor = '#d4a84b'; // Sussex (Gold)
            if (community.county === 'kent') markerColor = '#000000'; // Kent (Black)
            else if (community.county === 'newcastle') markerColor = '#2563EB'; // New Castle (Blue)

            const pin = new PinElement({
              background: markerColor,
              borderColor: '#FFFFFF',
              glyphColor: '#FFFFFF',
              scale: 1.1
            });

            const marker = new AdvancedMarkerElement({
              position: position,
              map: googleMap.current,
              title: community.name,
              content: pin.element
            });

            // Custom properties for filtering
            (marker as any).communityId = id;
            (marker as any).county = community.county;
            (marker as any).externalUrl = community.externalUrl;

            marker.addListener('click', () => {
              const contentString = `
                <div style="padding: 12px; max-width: 250px; font-family: 'Montserrat', sans-serif;">
                    <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 4px; color: #171717;">${community.name}</h3>
                    <p style="font-size: 0.85rem; color: #525252; margin-bottom: 8px;">${community.location}</p>
                    <p style="font-size: 1rem; font-weight: 700; color: #171717; margin-bottom: 12px;">${community.price}</p>
                    <button id="marker-btn-${id}" style="
                        width: 100%;
                        padding: 10px 16px;
                        background: #000;
                        color: #fff;
                        border: none;
                        border-radius: 6px;
                        font-size: 0.85rem;
                        font-weight: 600;
                        cursor: pointer;
                        font-family: inherit;
                    ">View Community</button>
                </div>
              `;
              infoWindow.current.setContent(contentString);
              infoWindow.current.open(googleMap.current, marker);
              
              setTimeout(() => {
                const btn = document.getElementById(`marker-btn-${id}`);
                if (btn) btn.onclick = () => {
                  if (community.externalUrl) {
                    window.open(community.externalUrl, '_blank');
                  } else {
                    navigate(`/available-communities/${id}`);
                  }
                };
              }, 100);
            });

            markers.current.push(marker);
            processedCount++;
            if (processedCount === communities.length && googleMap.current) {
              googleMap.current.fitBounds(bounds);
            }
          });
        });
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      markers.current.forEach(m => m.map = null);
      markers.current = [];
    };
  }, [navigate, communitiesMap]);

  useEffect(() => {
    let count = 0;
    const g = (window as any).google;
    if (!g?.maps?.importLibrary) return;

    const updateFilterBounds = async () => {
      const { LatLngBounds, event } = await g.maps.importLibrary("core");
      const bounds = new LatLngBounds();
      let hasVisible = false;

      Object.entries(communitiesMap).forEach(([id, comm]) => {
        const isVisible = filter === 'all' || comm.county === filter;
        if (isVisible) {
            count++;
            bounds.extend({ lat: comm.lat, lng: comm.lng });
            hasVisible = true;
        }
      });
      setVisibleCount(count);

      markers.current.forEach(marker => {
        if (marker) {
          const shouldShow = filter === 'all' || marker.county === filter;
          marker.map = shouldShow ? googleMap.current : null;
        }
      });

      if (googleMap.current && hasVisible) {
          if (filter === 'all') {
              googleMap.current.fitBounds(bounds);
          } else {
              googleMap.current.panTo(bounds.getCenter());
              googleMap.current.fitBounds(bounds);
              const listener = event.addListener(googleMap.current, "idle", () => {
                  if (googleMap.current.getZoom() > 11) googleMap.current.setZoom(11);
                  event.removeListener(listener);
              });
          }
      }

      if (infoWindow.current) infoWindow.current.close();
    };

    updateFilterBounds();
  }, [filter, communitiesMap]);

  return (
    <div className="available-communities-page">
      <style>{`
        .available-communities-page {
            --black: #000000;
            --white: #ffffff;
            --gray-50: #fafafa;
            --gray-100: #f4f4f4;
            --gray-200: #e5e5e5;
            --gray-300: #d4d4d4;
            --gray-400: #a3a3a3;
            --gray-500: #737373;
            --gray-600: #525252;
            --gray-700: #404040;
            --gray-800: #262626;
            --gray-900: #171717;
            --accent-gold: #d4a84b;
            --accent-gold-light: #e8c97a;
            --success: #22c55e;
            --kent-color: #000000;
            --sussex-color: #d4a84b;
            --newcastle-color: #2563EB;
            font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
            color: var(--gray-900);
            line-height: 1.7;
            background: var(--white);
        }

        .hero {
            min-height: 25vh;
            padding: 90px 2rem 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--gray-900) 0%, var(--black) 100%);
            color: var(--white);
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            z-index: 0;
        }

        .hero-content { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1.25rem;
            background: rgba(212, 168, 75, 0.15);
            border: 1px solid rgba(212, 168, 75, 0.3);
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--accent-gold);
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.15em;
        }

        .hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 0.75rem; color: var(--white); }
        .hero h1 .gold { color: var(--accent-gold); }
        .hero-subtitle { font-size: 1.05rem; color: var(--gray-400); max-width: 650px; margin: 0 auto; line-height: 1.6; }

        .filter-section {
            background: var(--white);
            padding: 2rem;
            border-bottom: 1px solid var(--gray-200);
            position: sticky;
            top: 72px;
            z-index: 100;
        }

        .filter-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            flex-wrap: wrap;
        }

        .filter-label { font-size: 0.85rem; font-weight: 600; color: var(--gray-600); text-transform: uppercase; letter-spacing: 0.1em; }
        .filter-buttons { display: flex; gap: 0.75rem; flex-wrap: wrap; }

        .filter-btn {
            padding: 0.75rem 1.5rem;
            background: var(--white);
            border: 1px solid var(--gray-300);
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--gray-600);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .filter-btn.active { background: var(--black); border-color: var(--black); color: var(--white); }
        .filter-btn .county-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 0.5rem; }
        .filter-btn .county-dot.kent { background: var(--kent-color); }
        .filter-btn .county-dot.sussex { background: var(--sussex-color); }
        .filter-btn .county-dot.newcastle { background: var(--newcastle-color); }

        .main-content { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
        .communities-panel { padding: 2rem; background: var(--gray-50); overflow-y: auto; max-height: 800px; }
        .communities-grid { display: flex; flex-direction: column; gap: 1.5rem; }

        .community-card {
            background: var(--white);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
            border: 1px solid var(--gray-200);
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
        }

        .community-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12); border-color: var(--gray-300); }

        .community-card-inner { display: grid; grid-template-columns: 180px 1fr; gap: 0; }
        .community-logo-wrapper { background: var(--gray-50); display: flex; align-items: center; justify-content: center; padding: 1rem; border-right: 1px solid var(--gray-100); min-height: 140px; overflow: hidden; }
        .community-logo-wrapper img { width: 100%; height: 100%; border-radius: 8px; }
        .community-info { padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; }
        .community-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem; }
        .community-name { font-size: 1.25rem; font-weight: 700; color: var(--black); margin: 0; }
        .community-status { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.35rem 0.75rem; background: rgba(34, 197, 94, 0.1); border-radius: 50px; font-size: 0.7rem; font-weight: 700; color: var(--success); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; }
        .community-status::before { content: ''; width: 6px; height: 6px; background: var(--success); border-radius: 50%; animation: pulse 2s infinite; }
        .community-status.closing-out { background: rgba(212, 168, 75, 0.15); color: #b8860b; }
        .community-status.closing-out::before { background: #d4a84b; }
        .community-location { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--gray-600); margin-bottom: 0.75rem; }
        .county-tag { display: inline-block; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-left: 0.5rem; }
        .county-tag.kent { background: rgba(0, 0, 0, 0.1); color: var(--kent-color); }
        .county-tag.sussex { background: rgba(212, 168, 75, 0.15); color: #b8860b; }
        .county-tag.newcastle { background: rgba(37, 99, 235, 0.15); color: var(--newcastle-color); }
        .community-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .community-price { font-size: 1.1rem; font-weight: 700; color: var(--black); }
        .community-price span { font-size: 0.8rem; font-weight: 500; color: var(--gray-500); }
        .community-cta { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.25rem; background: var(--black); color: var(--white); border-radius: 8px; font-size: 0.8rem; font-weight: 600; }

        .map-panel { position: relative; background: var(--gray-200); }
        #map-container { width: 100%; height: 100%; min-height: 600px; }
        .map-legend { position: absolute; bottom: 2rem; left: 2rem; background: var(--white); padding: 1rem 1.25rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); z-index: 10; }
        .map-legend-title { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gray-500); margin-bottom: 0.75rem; }
        .map-legend-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--gray-700); margin-bottom: 0.5rem; }
        .map-legend-dot { width: 12px; height: 12px; border-radius: 50%; }
        .map-legend-dot.newcastle { background: var(--newcastle-color); }
        .map-legend-dot.kent { background: var(--kent-color); }
        .map-legend-dot.sussex { background: var(--sussex-color); }

        .represent-section { padding: 100px 2rem; background: var(--white); }
        .represent-container { max-width: 1200px; margin: 0 auto; }
        .represent-header { text-align: center; margin-bottom: 4rem; }
        .represent-label { display: inline-block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray-500); margin-bottom: 1rem; }
        .represent-title { font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.02em; color: var(--black); margin-bottom: 1rem; }
        .represent-subtitle { font-size: 1.1rem; color: var(--gray-600); max-width: 700px; margin: 0 auto; }
        .represent-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        .represent-card { text-align: center; padding: 2.5rem 2rem; background: var(--gray-50); border-radius: 20px; border: 1px solid var(--gray-100); transition: all 0.3s ease; }
        .represent-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06); }
        .represent-icon { width: 64px; height: 64px; background: var(--black); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
        .represent-icon svg { width: 28px; height: 28px; color: var(--white); }
        .represent-card h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: var(--black); }
        .represent-card p { font-size: 0.95rem; color: var(--gray-600); line-height: 1.6; }

        .cta-section { padding: 80px 2rem; background: var(--black); text-align: center; }
        .cta-content { max-width: 700px; margin: 0 auto; }
        .cta-content h2 { font-size: 2.25rem; font-weight: 800; color: var(--white); margin-bottom: 1rem; letter-spacing: -0.02em; }
        .cta-content p { font-size: 1.1rem; color: var(--gray-400); margin-bottom: 2rem; }
        .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: var(--white); color: var(--black); font-size: 1rem; font-weight: 600; border-radius: 8px; transition: all 0.3s ease; }
        .btn-secondary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: transparent; color: var(--white); font-size: 1rem; font-weight: 600; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); transition: all 0.3s ease; }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

        @media (max-width: 1024px) {
            .main-content { grid-template-columns: 1fr; }
            .communities-panel { order: 2; max-height: none; }
            .map-panel { order: 1; min-height: 400px; }
            .represent-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
            .hero { padding: 80px 1.5rem 40px; }
            .community-card-inner { grid-template-columns: 1fr; }
            .community-logo-wrapper { border-right: none; border-bottom: 1px solid var(--gray-100); }
            .represent-grid { grid-template-columns: 1fr; }
            .filter-container { flex-direction: column; align-items: flex-start; gap: 1rem; }
            .filter-buttons { width: 100%; }
        }
      `}</style>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            New Construction
          </div>
          <h1>Available <span className="gold">Communities</span></h1>
          <p className="hero-subtitle">Explore brand-new homes in Delaware's most desirable communities. With Rush Home Team as your buyer representative, you get expert guidance—at no cost to you.</p>
        </div>
      </section>

      <section className="filter-section">
        <div className="filter-container">
          <div className="filter-left"><span className="filter-label">Filter by County:</span></div>
          <div className="filter-buttons">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Communities</button>
            <button className={`filter-btn ${filter === 'newcastle' ? 'active' : ''}`} onClick={() => setFilter('newcastle')}><span className="county-dot newcastle"></span>New Castle</button>
            <button className={`filter-btn ${filter === 'kent' ? 'active' : ''}`} onClick={() => setFilter('kent')}><span className="county-dot kent"></span>Kent</button>
            <button className={`filter-btn ${filter === 'sussex' ? 'active' : ''}`} onClick={() => setFilter('sussex')}><span className="county-dot sussex"></span>Sussex</button>
          </div>
          <div className="community-count">Showing <strong>{visibleCount}</strong> of <strong>{Object.keys(communitiesMap).length}</strong> communities</div>
        </div>
      </section>

      <div className="main-content">
        <div className="communities-panel">
          <div className="communities-grid">
            {Object.entries(communitiesMap).map(([id, community]) => {
              if (filter !== 'all' && community.county !== filter) return null;
              
              const isExternal = !!community.externalUrl;
              
              const cardInner = (
                <div className="community-card-inner">
                  <div className="community-logo-wrapper">
                    <img 
                      src={community.img} 
                      alt={community.name} 
                      style={{ 
                        objectFit: community.mainImageContain ? 'contain' : 'cover',
                        padding: community.mainImageContain ? '1rem' : '0' 
                      }} 
                    />
                  </div>
                  <div className="community-info">
                    <div className="community-header">
                      <h3 className="community-name">{community.name}</h3>
                      <span className={`community-status ${community.status === 'Closing Out' ? 'closing-out' : ''}`}>{community.status}</span>
                    </div>
                    <div className="community-location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {community.location}
                      <span className={`county-tag ${community.county}`}>{community.county}</span>
                    </div>
                    <div className="community-footer">
                      <div className="community-price"><span>From</span> {community.price.includes('From ') ? community.price.split('From ')[1] : community.price}</div>
                      <span className="community-cta">Learn More</span>
                    </div>
                  </div>
                </div>
              );

              return isExternal ? (
                <a key={id} href={community.externalUrl} target="_blank" rel="noopener noreferrer" className="community-card">
                  {cardInner}
                </a>
              ) : (
                <Link key={id} to={`/available-communities/${id}`} className="community-card">
                  {cardInner}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="map-panel">
          <div id="map-container" ref={mapRef}></div>
          <div className="map-legend">
            <div className="map-legend-title">County Legend</div>
            <div className="map-legend-item"><span className="map-legend-dot newcastle"></span> New Castle</div>
            <div className="map-legend-item"><span className="map-legend-dot kent"></span> Kent</div>
            <div className="map-legend-item"><span className="map-legend-dot sussex"></span> Sussex</div>
          </div>
        </div>
      </div>

      <section className="represent-section">
        <div className="represent-container">
          <div className="represent-header">
            <span className="represent-label">Expertise</span>
            <h2 className="represent-title">New Construction <em>Specialists</em></h2>
          </div>
          <div className="represent-grid">
            <div className="represent-card">
              <div className="represent-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
              <h3>Exclusive Access</h3>
              <p>Get first look at new communities and pre-construction pricing before it hits the market.</p>
            </div>
            <div className="represent-card">
              <div className="represent-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20h20M5 20V8.5l7-4.5 7 4.5V20"/></svg></div>
              <h3>Process Expertise</h3>
              <p>From lot selection to final walkthrough, we guide you through every phase of building.</p>
            </div>
            <div className="represent-card">
              <div className="represent-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
              <h3>Timeline Management</h3>
              <p>We track construction milestones and keep you informed every step of the way.</p>
            </div>
            <div className="represent-card">
              <div className="represent-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h3>Builder Relations</h3>
              <p>Our established partnerships mean smoother transactions and faster resolution of concerns.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Build?</h2>
          <p>Let us guide you through the process with expert representation and local market knowledge.</p>
          <div className="cta-buttons">
            <a href="tel:302-219-6707" className="btn-primary">Call 302-219-6707</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AvailableCommunities;