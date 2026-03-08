'use client';

import { useEffect, useMemo, useState } from 'react';
import { MOCK_PROPERTIES, MOCK_COMMUNITIES } from '../constants';
import { Property } from '../types';

// School type from API
export interface ApiSchoolInfo {
  name: string;
  grades: string;
  distance: string;
}

// Nearby place type from API
export interface NearbyPlace {
  name: string;
  location?: string;
  time: string;
  type: string;
}

// Mortgage breakdown
export interface MortgageBreakdown {
  total: number;
  principalAndInterest: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
}

export function usePropertyData(property: Property, allProperties?: Property[]) {
  // State for schools and nearby places from API
  const [apiSchools, setApiSchools] = useState<ApiSchoolInfo[]>([]);
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [loadingNearby, setLoadingNearby] = useState(true);

  // State for community data fetched from API (for schoolDistrict, address, etc.)
  const [apiCommunityData, setApiCommunityData] = useState<{ schoolDistrict?: string; address?: string } | null>(null);

  // State for similar homes fetched from API
  const [similarHomes, setSimilarHomes] = useState<Property[]>([]);

  // Check if this is a quick move-in home
  const isQuickMoveIn = property.isQuickMoveIn ||
    (property.priceHistory.length === 0 && !property.mlsId);

  const hasMlsData = !!property.mlsId;

  const community = MOCK_COMMUNITIES.find(c => c.name === property.community);
  const effectiveCommunityId = property.communityId || community?.id;

  // Fetch community data from API when not found in static MOCK_COMMUNITIES
  useEffect(() => {
    async function fetchCommunityData() {
      if (community || !effectiveCommunityId) return;
      try {
        const response = await fetch('/api/communities');
        if (response.ok) {
          const data = await response.json();
          const found = (data.communities || []).find((c: { id: string }) => c.id === effectiveCommunityId);
          if (found) {
            setApiCommunityData({ schoolDistrict: found.schoolDistrict, address: found.address });
          }
        }
      } catch (error) {
        console.error('Error fetching community data:', error);
      }
    }
    fetchCommunityData();
  }, [community, effectiveCommunityId]);

  // Resolved community address and school district
  const communityAddress = community?.address || apiCommunityData?.address;
  const communitySchoolDistrict = community?.schoolDistrict || apiCommunityData?.schoolDistrict;

  // Fetch schools from API
  useEffect(() => {
    async function fetchSchools() {
      if (!effectiveCommunityId) {
        setApiSchools([]);
        setLoadingSchools(false);
        return;
      }
      setLoadingSchools(true);
      try {
        const response = await fetch(`/api/schools?communityId=${encodeURIComponent(effectiveCommunityId)}`);
        if (response.ok) {
          const data = await response.json();
          setApiSchools(data.schools || []);
        } else {
          setApiSchools([]);
        }
      } catch (error) {
        console.error('Error fetching schools:', error);
        setApiSchools([]);
      } finally {
        setLoadingSchools(false);
      }
    }
    fetchSchools();
  }, [effectiveCommunityId]);

  // Fetch nearby places from API
  useEffect(() => {
    async function fetchNearbyPlaces() {
      const address = communityAddress || `${property.address}, ${property.city}, ${property.state}`;
      setLoadingNearby(true);
      try {
        const response = await fetch(`/api/nearby-places?address=${encodeURIComponent(address)}&limit=7`);
        if (response.ok) {
          const data = await response.json();
          setNearbyPlaces(data.places || []);
        } else {
          setNearbyPlaces([]);
        }
      } catch (error) {
        console.error('Error fetching nearby places:', error);
        setNearbyPlaces([]);
      } finally {
        setLoadingNearby(false);
      }
    }
    fetchNearbyPlaces();
  }, [communityAddress, property.address, property.city, property.state]);

  // Fetch similar homes from Repliers API (within 1 mile, ±500 sqft)
  useEffect(() => {
    async function fetchSimilarHomes() {
      // Build query params for the similar-homes API
      const params = new URLSearchParams();
      if (property.mlsId) params.set('mlsId', property.mlsId);
      if (property.zip) params.set('zip', property.zip);
      if (property.city) params.set('city', property.city);
      if (property.sqft) params.set('sqft', String(property.sqft));
      if (property.latitude) params.set('lat', String(property.latitude));
      if (property.longitude) params.set('lng', String(property.longitude));
      params.set('limit', '6');

      try {
        const response = await fetch(`/api/similar-homes?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.homes && data.homes.length > 0) {
            setSimilarHomes(data.homes);
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching similar homes:', error);
      }

      // Fallback: use local data if API returned nothing
      const propertyList = allProperties && allProperties.length > 0 ? allProperties : MOCK_PROPERTIES;
      const others = propertyList.filter(p => p.id !== property.id);

      setSimilarHomes(
        others
          .filter(p => {
            const sameCounty = p.county === property.county;
            const similarPrice = Math.abs(p.price - property.price) < 75000;
            const similarBeds = Math.abs(p.beds - property.beds) <= 1;
            const matchScore = (sameCounty ? 2 : 0) + (similarPrice ? 2 : 0) + (similarBeds ? 1 : 0);
            return matchScore >= 3;
          })
          .slice(0, 6)
      );
    }
    fetchSimilarHomes();
  }, [property, allProperties]);

  // Mortgage calculation
  const mortgage = useMemo<MortgageBreakdown>(() => {
    const interestRate = 0.062;
    const downPayment = 0.035;
    const principal = property.price * (1 - downPayment);
    const monthlyRate = interestRate / 12;
    const numPayments = 30 * 12;

    const principalAndInterest = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const propertyTax = hasMlsData && property.taxAssessment > 0 ? property.taxAssessment / 12 : 0;
    const insurance = (property.price * 0.0035) / 12;
    const hoa = hasMlsData ? property.hoaFee : 0;

    return {
      total: principalAndInterest + propertyTax + insurance + hoa,
      principalAndInterest,
      propertyTax,
      insurance,
      hoa,
    };
  }, [property.price, property.taxAssessment, property.hoaFee, hasMlsData]);

  return {
    // Data
    apiSchools,
    nearbyPlaces,
    similarHomes,
    community,
    communitySchoolDistrict,
    mortgage,

    // Loading states
    loadingSchools,
    loadingNearby,

    // Derived flags
    isQuickMoveIn,
    hasMlsData,
  };
}
