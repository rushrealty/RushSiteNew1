'use client';

import React from 'react';
import Link from 'next/link';

const PrivacyContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <p className="text-gray-800 font-medium mb-2">Important Notice</p>
              <p className="text-gray-600">
                By providing your information through this website, you consent to being contacted by Rush Home Team and our affiliated lender partners regarding real estate services, mortgage pre-approval, and related offerings.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-6">
              Rush Home Team (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a team of licensed real estate agents affiliated with Compass RE, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our real estate search and related services. Please read this privacy policy carefully. By using our website and services, you consent to the practices described in this policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information You Provide</h3>
            <p className="text-gray-600 mb-4">
              We collect personal information that you voluntarily provide when you:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Fill out contact forms or inquiry forms</li>
              <li>Request property information or schedule showings</li>
              <li>Sign up for property alerts or newsletters</li>
              <li>Request a home valuation or market analysis</li>
              <li>Apply for our guaranteed sale programs</li>
              <li>Communicate with us via phone, email, or text</li>
            </ul>
            <p className="text-gray-600 mb-4">
              This information may include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Name and contact information (email, phone number, address)</li>
              <li>Property search preferences (location, price range, features)</li>
              <li>Current homeownership status</li>
              <li>Timeline for buying or selling</li>
              <li>Financial information relevant to real estate transactions</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Information Collected Automatically</h3>
            <p className="text-gray-600 mb-4">
              When you visit our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Device information (browser type, operating system, device type)</li>
              <li>IP address and general location information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website or source</li>
              <li>Property searches and saved listings</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Respond to your inquiries and provide requested information</li>
              <li>Facilitate real estate transactions and provide our services</li>
              <li>Send property listings matching your search criteria</li>
              <li>Provide market updates and real estate news</li>
              <li>Contact you regarding properties, services, and opportunities</li>
              <li>Improve our website and user experience</li>
              <li>Analyze website usage and marketing effectiveness</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Sharing Your Information with Lender Partners</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <p className="text-gray-800 font-medium mb-2">Lender Partner Disclosure</p>
              <p className="text-gray-600">
                By submitting your information through our website, you expressly consent to us sharing your contact information and relevant details with our affiliated mortgage lender partners. This enables our lender partners to contact you regarding mortgage pre-approval, financing options, and related services to facilitate your home purchase.
              </p>
            </div>
            <p className="text-gray-600 mb-6">
              Our lender partners may contact you via phone, email, or text message to discuss your financing needs. You understand that obtaining pre-approval or discussing financing options with our lender partners is optional but may be beneficial to your home buying process. Our lender partners are bound by their own privacy policies and applicable financial regulations.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Other Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              In addition to sharing with lender partners, we may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li><strong>Compass RE:</strong> Our affiliated brokerage for transaction management and compliance</li>
              <li><strong>Service Providers:</strong> Third parties who assist with website hosting, email delivery, analytics, and marketing</li>
              <li><strong>Transaction Parties:</strong> Other parties involved in real estate transactions (title companies, inspectors, attorneys) when necessary to complete a transaction</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of business assets</li>
            </ul>
            <p className="text-gray-600 mb-6">
              We do not sell your personal information to third parties for their independent marketing purposes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Right to Contact</h2>
            <p className="text-gray-600 mb-6">
              By providing your contact information, you consent to receive communications from Rush Home Team and our partners regarding real estate services. These communications may include property alerts, market updates, service offerings, and promotional materials. You may opt out of marketing communications at any time by clicking the unsubscribe link in emails, replying STOP to text messages, or contacting us directly.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mb-6">
              We use cookies, web beacons, and similar technologies to enhance your experience, analyze website traffic, and understand user behavior. You can control cookies through your browser settings, but disabling cookies may affect website functionality. We may use third-party analytics services such as Google Analytics to collect and analyze usage data.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Data Security</h2>
            <p className="text-gray-600 mb-6">
              We implement reasonable administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Data Retention</h2>
            <p className="text-gray-600 mb-6">
              We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. For clients involved in real estate transactions, we may retain records as required by Delaware real estate regulations and brokerage policies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Your Privacy Rights</h2>
            <p className="text-gray-600 mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to opt out of marketing communications</li>
              <li>The right to opt out of certain data sharing</li>
            </ul>
            <p className="text-gray-600 mb-6">
              To exercise these rights, please contact us using the information provided below. We will respond to your request in accordance with applicable law.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Third-Party Websites</h2>
            <p className="text-gray-600 mb-6">
              Our website may contain links to third-party websites, including MLS listings, lender websites, and other service providers. We are not responsible for the privacy practices of these third-party sites. We encourage you to review the privacy policies of any website you visit.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Children&apos;s Privacy</h2>
            <p className="text-gray-600 mb-6">
              Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Changes to This Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy from time to time. Changes will be effective immediately upon posting to this website. The &quot;Last updated&quot; date at the top of this policy indicates when it was last revised. Your continued use of our website following any changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
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

export default PrivacyContent;
