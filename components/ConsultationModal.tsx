'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Loader2, CheckCircle2 } from 'lucide-react';

interface ConsultationModalProps {
  onClose: () => void;
  isOpen: boolean;
}

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: typeof google;
    initGooglePlaces: () => void;
  }
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Load Google Places API and initialize autocomplete
  useEffect(() => {
    if (!isOpen) return;

    const initAutocomplete = () => {
      if (addressInputRef.current && window.google?.maps?.places) {
        // Only initialize once
        if (autocompleteRef.current) return;

        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          addressInputRef.current,
          {
            types: ['address'],
            componentRestrictions: { country: 'us' },
            fields: ['formatted_address', 'address_components']
          }
        );

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace();
          if (place?.formatted_address) {
            setFormData(prev => ({ ...prev, address: place.formatted_address || '' }));
          }
        });
      }
    };

    // Check if Google Maps is already loaded
    if (window.google?.maps?.places) {
      initAutocomplete();
      return;
    }

    // Load Google Maps script if not already loaded
    const existingScript = document.getElementById('google-maps-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&libraries=places&callback=initGooglePlaces`;
      script.async = true;
      script.defer = true;

      window.initGooglePlaces = () => {
        initAutocomplete();
      };

      document.head.appendChild(script);
    } else {
      // Script exists but might still be loading
      window.initGooglePlaces = initAutocomplete;
      if (window.google?.maps?.places) {
        initAutocomplete();
      }
    }

    return () => {
      // Cleanup autocomplete reference when modal closes
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://formspree.io/f/xdazjvpw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Selling Consultation Request: ${formData.address}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          propertyAddress: formData.address,
          inquiryType: 'Selling Consultation'
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Unable to submit form. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
       <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full text-center relative shadow-2xl">
             <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
               <X size={20} />
             </button>
             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle2 size={32} />
             </div>
             <h3 className="text-2xl font-serif font-bold mb-2 text-gray-900">Request Received!</h3>
             <p className="text-gray-500 mb-8 font-light leading-relaxed">
               Thanks {formData.firstName}. We&apos;ll be in touch shortly to schedule your consultation.
             </p>
             <button onClick={onClose} className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all">
               Close
             </button>
          </div>
       </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white rounded-[2rem] w-full max-w-lg relative overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
           <h3 className="font-serif font-bold text-xl text-gray-900">Schedule Consultation</h3>
           <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-600">
             <X size={20} />
           </button>
        </div>

        <div className="p-8 overflow-y-auto">
           {error && (
             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
               {error}
             </div>
           )}
           <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">First Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black outline-none transition-all"
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      placeholder="Jane"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Last Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black outline-none transition-all"
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Doe"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                 <input
                   required
                   type="email"
                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black outline-none transition-all"
                   value={formData.email}
                   onChange={e => setFormData({...formData, email: e.target.value})}
                   placeholder="jane@example.com"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone Number</label>
                 <input
                   required
                   type="tel"
                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black outline-none transition-all"
                   value={formData.phone}
                   onChange={e => setFormData({...formData, phone: e.target.value})}
                   placeholder="(302) 555-0123"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Property Address</label>
                 <div className="relative">
                   <input
                     ref={addressInputRef}
                     required
                     type="text"
                     autoComplete="off"
                     className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black outline-none transition-all"
                     value={formData.address}
                     onChange={e => setFormData({...formData, address: e.target.value})}
                     placeholder="Start typing your address..."
                   />
                   <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 </div>
                 <p className="text-[10px] text-gray-400">We&apos;ll prepare a preliminary market analysis for this address.</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Processing...
                  </>
                ) : (
                  'Schedule Consultation'
                )}
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;
