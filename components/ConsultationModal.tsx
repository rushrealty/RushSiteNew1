'use client';

import React, { useState } from 'react';
import { X, MapPin, Loader2, CheckCircle2 } from 'lucide-react';

interface ConsultationModalProps {
  onClose: () => void;
  isOpen: boolean;
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
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
                     required
                     type="text"
                     autoComplete="street-address"
                     className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black outline-none transition-all"
                     value={formData.address}
                     onChange={e => setFormData({...formData, address: e.target.value})}
                     placeholder="123 Main St, City, State"
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