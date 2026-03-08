'use client';

import React, { useState } from 'react';
import { Loader2, CheckCircle2, Calendar, MessageSquare, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { sendFubEvent } from '@/lib/fub';

interface PropertyContactFormProps {
  propertyAddress: string;
  propertyDetails: string;
  propertyCity: string;
  propertyState: string;
}

const PropertyContactForm: React.FC<PropertyContactFormProps> = ({
  propertyAddress,
  propertyDetails,
  propertyCity,
  propertyState,
}) => {
  const [isTourMode, setIsTourMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I am interested in ${propertyAddress}. Please contact me.`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xlgnveeb';

    // Split name into first/last
    const nameParts = formData.name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: isTourMode
            ? `Tour Request: ${propertyAddress}`
            : `New Inquiry: ${propertyAddress}`,
          inquiryType: isTourMode ? 'Home Tour Request' : 'Home Inquiry',
          propertyOrCommunity: propertyAddress,
          additionalDetails: propertyDetails,
          firstName,
          lastName,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          ...(formData.message && { message: formData.message }),
        }),
      });

      if (response.ok) {
        setSubmitted(true);

        // Send event to Follow Up Boss CRM (fire-and-forget)
        sendFubEvent({
          type: isTourMode ? 'Property Inquiry' : 'General Inquiry',
          firstName,
          lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message || undefined,
          description: [
            isTourMode ? 'Tour Request' : 'Information Request',
            `Property: ${propertyAddress}`,
            propertyDetails,
          ].filter(Boolean).join(' | '),
          tags: [
            isTourMode ? 'Tour Request' : 'Inquiry',
            'Property',
          ],
          property: {
            street: propertyAddress,
            city: propertyCity,
            state: propertyState,
            type: 'Residential',
          },
        });
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Unable to submit form. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-serif font-bold mb-2 text-gray-900">
          {isTourMode ? 'Tour Request Sent!' : 'Message Sent!'}
        </h3>
        <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">
          A member of the Rush Home Team will be in touch within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              message: `I am interested in ${propertyAddress}. Please contact me.`,
            });
          }}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
      {/* Toggle buttons */}
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={() => setIsTourMode(true)}
          className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${
            isTourMode
              ? 'bg-black text-white shadow-md'
              : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Calendar size={18} /> Schedule a Tour
        </button>
        <button
          onClick={() => setIsTourMode(false)}
          className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${
            !isTourMode
              ? 'bg-black text-white shadow-md'
              : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
          }`}
        >
          <MessageSquare size={18} /> Request Info
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all text-sm"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all text-sm"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all text-sm"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
        />
        <textarea
          rows={3}
          placeholder="Message"
          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all resize-none text-sm"
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gray-900 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><Loader2 className="animate-spin" size={18} /> Sending...</>
          ) : (
            'Send Message'
          )}
        </button>
      </form>

      {/* Call / Email links */}
      <div className="flex items-center justify-center gap-4 mt-5 text-sm">
        <a href="tel:+13023101560" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors">
          <Phone size={14} /> Call Agent
        </a>
        <span className="text-gray-300">|</span>
        <a href="mailto:rush@compass.com" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors">
          <Mail size={14} /> Email Agent
        </a>
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-4 leading-tight">
        By submitting this form, you agree to our{' '}
        <Link href="/terms" className="underline hover:text-gray-600">Terms of Service</Link>
        {' '}and{' '}
        <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
      </p>
    </div>
  );
};

export default PropertyContactForm;
