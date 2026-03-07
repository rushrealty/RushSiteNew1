'use client';

import React from 'react';
import Link from 'next/link';

const TermsContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 text-lg">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing or using the Rush Home Team website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. Rush Home Team is a team of licensed real estate agents affiliated with Compass RE, a licensed real estate brokerage. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Brokerage Relationship</h2>
            <p className="text-gray-600 mb-6">
              Rush Home Team operates as a team of licensed real estate professionals under Compass RE. All real estate transactions are conducted through Compass RE as the licensed brokerage. The information provided on this website is for general informational purposes and does not constitute a formal brokerage agreement. A formal agency relationship is established only through the execution of appropriate written agreements as required by Delaware law.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Real Estate Services</h2>
            <p className="text-gray-600 mb-4">
              Our services include but are not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Buyer representation and home search assistance</li>
              <li>Seller representation and property marketing</li>
              <li>New construction home sales representation</li>
              <li>Market analysis and property valuations</li>
              <li>Transaction coordination and negotiation</li>
              <li>Referrals to mortgage lenders, home inspectors, and other service providers</li>
            </ul>
            <p className="text-gray-600 mb-6">
              All services are subject to the terms of any written agreements executed between you and Rush Home Team or Compass RE.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Property Information Disclaimer</h2>
            <p className="text-gray-600 mb-6">
              Property listings and information displayed on this website are deemed reliable but not guaranteed. Information may be sourced from Multiple Listing Services (MLS), builders, developers, public records, and other third-party sources. Rush Home Team and Compass RE make no warranties regarding the accuracy, completeness, or timeliness of listing information. Buyers are advised to independently verify all property information, including but not limited to square footage, lot size, taxes, HOA fees, and property features.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. No Guarantee of Results</h2>
            <p className="text-gray-600 mb-6">
              While we strive to provide excellent service and achieve the best possible outcomes for our clients, we cannot guarantee specific results including sale prices, time on market, or successful transactions. Real estate transactions are subject to many variables beyond our control, including market conditions, buyer/seller decisions, financing contingencies, inspection results, and other factors.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Guaranteed Sale Programs</h2>
            <p className="text-gray-600 mb-6">
              Rush Home Team offers various guaranteed sale programs including Rush Home Immediate, Rush Home Advantage, and Rush Home Flex. These programs are subject to specific terms, conditions, and eligibility requirements that will be provided in separate written agreements. All guaranteed offers are subject to property evaluation, approval, and market conditions. The terms presented on this website are for informational purposes only and do not constitute a binding offer.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Third-Party Services</h2>
            <p className="text-gray-600 mb-6">
              We may recommend or refer you to third-party service providers including mortgage lenders, home inspectors, title companies, attorneys, contractors, and others. These referrals are provided as a convenience and do not constitute an endorsement. You are under no obligation to use any referred service provider, and we receive no compensation for referrals unless disclosed in writing. You are responsible for conducting your own due diligence on any service provider you choose to engage.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-600 mb-6">
              The content on this website, including text, graphics, logos, images, and software, is the property of Rush Home Team, Compass RE, or their content suppliers and is protected by United States and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content without express written permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. User Conduct</h2>
            <p className="text-gray-600 mb-4">
              When using our website and services, you agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Provide false or misleading information</li>
              <li>Use the site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any portion of the website</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Harvest or collect user information without consent</li>
              <li>Use automated systems to access the website without permission</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              To the fullest extent permitted by law, Rush Home Team, Compass RE, and their agents, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of this website or our services. Our total liability for any claim arising from these terms or our services shall not exceed the amount of any commission or fees actually paid by you to us.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Indemnification</h2>
            <p className="text-gray-600 mb-6">
              You agree to indemnify and hold harmless Rush Home Team, Compass RE, and their officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising from your use of this website, your violation of these terms, or your violation of any rights of another party.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These Terms of Service shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved in the state or federal courts located in Delaware, and you consent to the jurisdiction of such courts.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Fair Housing Commitment</h2>
            <p className="text-gray-600 mb-6">
              Rush Home Team and Compass RE are committed to compliance with all federal, state, and local fair housing laws. We do not discriminate on the basis of race, color, religion, sex, national origin, familial status, disability, or any other protected class. We are dedicated to providing equal professional service to all persons.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this website. Your continued use of the website following any changes constitutes acceptance of the modified terms. We encourage you to review these terms periodically.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-gray-800 font-semibold mb-2">Rush Home Team at Compass</p>
              <p className="text-gray-600">200 S. Dupont Blvd, Suite 105</p>
              <p className="text-gray-600">Smyrna, DE 19977</p>
              <p className="text-gray-600 mt-2">
                Phone: <a href="tel:302-219-6707" className="text-blue-600 hover:underline">302-219-6707</a>
              </p>
              <p className="text-gray-600">
                Email: <a href="mailto:info@rushhome.com" className="text-blue-600 hover:underline">info@rushhome.com</a>
              </p>
            </div>

            <div className="border-t pt-8 mt-8">
              <p className="text-gray-500 text-sm">
                Rush Home Team is a team of licensed real estate agents affiliated with Compass RE. Compass RE is a licensed real estate broker. Equal Housing Opportunity.
              </p>
            </div>

          </div>

          <div className="mt-12">
            <Link href="/" className="text-blue-600 hover:underline flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsContent;
