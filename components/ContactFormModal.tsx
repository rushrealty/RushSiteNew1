'use client';

import React, { useState } from 'react';
import { X, Loader2, CheckCircle2, Home, Building2, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  // The property address or community name
  subjectName: string;
  // Type of inquiry: 'property' for homes, 'community' for communities
  subjectType: 'property' | 'community';
  // Optional: additional context like price, location, etc.
  subjectDetails?: string;
  // Whether this is a tour request (shows date/time fields) or general inquiry
  isTourRequest?: boolean;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  subjectName,
  subjectType,
  subjectDetails,
  isTourRequest = false
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Formspree endpoint
    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xlgnveeb';

    // Format the date for display
    const formattedDate = formData.preferredDate
      ? new Date(formData.preferredDate + 'T00:00:00').toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : '';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          // Subject information
          _subject: isTourRequest
            ? `Tour Request: ${subjectName}`
            : `New Inquiry: ${subjectName}`,
          inquiryType: isTourRequest
            ? (subjectType === 'property' ? 'Home Tour Request' : 'Community Tour Request')
            : (subjectType === 'property' ? 'Home Inquiry' : 'Community Inquiry'),
          propertyOrCommunity: subjectName,
          additionalDetails: subjectDetails || '',
          // Tour scheduling info (if applicable)
          ...(isTourRequest && {
            preferredDate: formattedDate,
            preferredTime: formData.preferredTime,
            tourDateTime: `${formattedDate} at ${formData.preferredTime}`
          }),
          // Contact information
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone
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

  const handleClose = () => {
    // Reset form state when closing
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: ''
    });
    setSubmitted(false);
    setError(null);
    onClose();
  };

  // Success state
  if (submitted) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
        <div className="bg-white rounded-[2rem] p-8 max-w-md w-full text-center relative shadow-2xl">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-2xl font-serif font-bold mb-2 text-gray-900">
            {isTourRequest ? 'Tour Request Received!' : 'Request Received!'}
          </h3>
          <p className="text-gray-500 mb-4 font-light leading-relaxed">
            Thanks {formData.firstName}! We&apos;ve received your {isTourRequest ? 'tour request' : 'inquiry'} for:
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="font-bold text-gray-900">{subjectName}</p>
            {subjectDetails && <p className="text-sm text-gray-500">{subjectDetails}</p>}
            {isTourRequest && formData.preferredDate && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Requested:</span>{' '}
                  {new Date(formData.preferredDate + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}{' '}
                  at {formData.preferredTime}
                </p>
              </div>
            )}
          </div>
          <p className="text-gray-500 mb-8 font-light leading-relaxed text-sm">
            A member of the Rush Home Team will {isTourRequest ? 'confirm your tour' : 'be in touch'} within 24 hours.
          </p>
          <button
            onClick={handleClose}
            className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white rounded-[2rem] w-full max-w-lg relative overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-serif font-bold text-xl text-gray-900">
            {isTourRequest ? 'Schedule a Tour' : 'Request Information'}
          </h3>
          <button
            onClick={handleClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 overflow-y-auto">
          {/* Subject Display */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-compass-gold/10 flex items-center justify-center flex-shrink-0">
                {subjectType === 'property' ? (
                  <Home size={20} className="text-compass-gold" />
                ) : (
                  <Building2 size={20} className="text-compass-gold" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                  {subjectType === 'property' ? 'Home' : 'Community'}
                </span>
                <p className="font-bold text-gray-900">{subjectName}</p>
                {subjectDetails && <p className="text-sm text-gray-500 mt-0.5">{subjectDetails}</p>}
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Tour Date/Time - Only shown for tour requests */}
            {isTourRequest && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <Calendar size={12} /> Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    min={today}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all"
                    value={formData.preferredDate}
                    onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <Clock size={12} /> Preferred Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all"
                    value={formData.preferredTime}
                    onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                  >
                    <option value="">Select time</option>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Jane"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="tel"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-compass-gold focus:border-transparent outline-none transition-all"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(302) 555-0123"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Submitting...
                </>
              ) : (
                isTourRequest ? 'Request Tour' : 'Submit Request'
              )}
            </button>

            <p className="text-center text-[10px] text-gray-400 mt-4 leading-tight">
              By submitting this form, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-gray-600">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;
