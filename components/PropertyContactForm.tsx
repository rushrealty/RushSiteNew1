'use client';

import React, { useState } from 'react';
import { Loader2, CheckCircle2, Calendar, MessageSquare, Info, Clock, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { sendFubEvent } from '@/lib/fub';

type FormMode = 'tour' | 'info' | 'message';

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
  const [mode, setMode] = useState<FormMode>('tour');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: `I am interested in ${propertyAddress}. Please contact me.`,
    preferredDate: '',
    preferredTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Minimum date = today
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xlgnveeb';

    // Format date for display
    const formattedDate = formData.preferredDate
      ? new Date(formData.preferredDate + 'T00:00:00').toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: mode === 'tour'
            ? `Tour Request: ${propertyAddress}`
            : `New Inquiry: ${propertyAddress}`,
          inquiryType: mode === 'tour' ? 'Home Tour Request' : 'Home Inquiry',
          propertyOrCommunity: propertyAddress,
          additionalDetails: propertyDetails,
          // Tour scheduling info
          ...(mode === 'tour' && {
            preferredDate: formattedDate,
            preferredTime: formData.preferredTime,
            tourDateTime: `${formattedDate} at ${formData.preferredTime}`,
          }),
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || '',
          ...(formData.message && mode !== 'tour' && { message: formData.message }),
        }),
      });

      if (response.ok) {
        setSubmitted(true);

        // Send event to Follow Up Boss CRM (fire-and-forget)
        const tourInfo = mode === 'tour' && formData.preferredDate
          ? `Preferred: ${formattedDate} at ${formData.preferredTime}`
          : undefined;

        sendFubEvent({
          type: mode === 'tour' ? 'Property Inquiry' : 'General Inquiry',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          message: mode !== 'tour' ? (formData.message || undefined) : undefined,
          description: [
            mode === 'tour' ? 'Tour Request' : mode === 'info' ? 'Information Request' : 'Message',
            `Property: ${propertyAddress}`,
            propertyDetails,
            tourInfo,
          ].filter(Boolean).join(' | '),
          tags: [
            mode === 'tour' ? 'Tour Request' : 'Inquiry',
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
          {mode === 'tour' ? 'Tour Request Sent!' : mode === 'info' ? 'Request Sent!' : 'Message Sent!'}
        </h3>
        {mode === 'tour' && formData.preferredDate && (
          <div className="bg-gray-50 rounded-xl p-3 mb-3 text-sm text-gray-600">
            <span className="font-semibold">Requested:</span>{' '}
            {new Date(formData.preferredDate + 'T00:00:00').toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}{' '}
            at {formData.preferredTime}
          </div>
        )}
        <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">
          A member of the Rush Home Team will {mode === 'tour' ? 'confirm your tour' : 'be in touch'} within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              message: `I am interested in ${propertyAddress}. Please contact me.`,
              preferredDate: '',
              preferredTime: '',
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
      {/* Mode toggle buttons */}
      <div className="flex flex-col gap-2.5 mb-6">
        <button
          onClick={() => setMode('tour')}
          className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
            mode === 'tour'
              ? 'bg-black text-white shadow-md'
              : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Calendar size={16} /> Schedule a Tour
        </button>
        <button
          onClick={() => setMode('info')}
          className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
            mode === 'info'
              ? 'bg-black text-white shadow-md'
              : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Info size={16} /> Request Info
        </button>
        <button
          onClick={() => setMode('message')}
          className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
            mode === 'message'
              ? 'bg-black text-white shadow-md'
              : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
          }`}
        >
          <MessageSquare size={16} /> Send Message
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Tour: Date & Time picker */}
        {mode === 'tour' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1 mb-1.5">
                <Calendar size={10} /> Date <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="date"
                min={today}
                className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all text-sm"
                value={formData.preferredDate}
                onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1 mb-1.5">
                <Clock size={10} /> Time <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all text-sm"
                value={formData.preferredTime}
                onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
              >
                <option value="">Select</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
              </select>
            </div>
          </div>
        )}

        {/* Name: First + Last */}
        <div className="grid grid-cols-2 gap-3">
          <input
            required
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all text-sm"
            value={formData.firstName}
            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all text-sm"
            value={formData.lastName}
            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>

        {/* Email */}
        <input
          required
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all text-sm"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />

        {/* Phone — required for tour and message modes */}
        <input
          required={mode === 'tour' || mode === 'message'}
          type="tel"
          placeholder={`Phone Number${mode === 'info' ? ' (optional)' : ''}`}
          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all text-sm"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
        />

        {/* Message — shown for info and message modes */}
        {mode !== 'tour' && (
          <textarea
            required
            rows={3}
            placeholder="Message"
            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all resize-none text-sm"
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          />
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gray-900 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><Loader2 className="animate-spin" size={18} /> Sending...</>
          ) : (
            mode === 'tour' ? 'Request Tour' : mode === 'info' ? 'Request Info' : 'Send Message'
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
