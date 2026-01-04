// ============================================
// FAQ DATA FOR ALL RUSH HOME PAGES
// ============================================
// 
// HOW TO USE:
// 1. Save components/FAQ.tsx to your project
// 2. Import the FAQ component and relevant data on each page
// 3. Replace existing FAQ sections with the component
//
// Example:
//   import FAQ from '@/components/FAQ';
//   import { homePageFaqs } from '@/data/faqData';
//   
//   // In your JSX:
//   <FAQ label="FAQ" title="Common Questions" faqs={homePageFaqs} />
// ============================================

// ============================================
// 1. HOME PAGE FAQs
// File: components/pages/HomeContent.tsx
// ============================================
export const homePageFaqs = [
  {
    question: "How does Rush Home determine my offer price?",
    answer: "Your offer is based on comparable home sales in your area, current market conditions, and your property's condition. We use the same data real estate professionals use to determine fair market value, then provide a competitive cash offer."
  },
  {
    question: "What types of homes qualify?",
    answer: "We work with most single-family homes, townhomes, and condos in Delaware valued at $250,000 or more. This includes properties in Kent, New Castle, and Sussex Counties. Enter your address to see if your home qualifies."
  },
  {
    question: "Can I list my home traditionally?",
    answer: "Yes! With our Lock option, you can list your home traditionally while keeping your guaranteed backup offer for 150 days. If you find a buyer on the open market for a higher price, great. If not, you can exercise your backup offer anytime."
  },
  {
    question: "How does the \"buy before you sell\" program work?",
    answer: "With Lock, we provide a guaranteed backup contract on your current home. This allows lenders to exclude your current mortgage from debt-to-income calculations, enabling you to qualify for and purchase your new home without waiting to sell first."
  },
  {
    question: "Am I obligated to accept the offer?",
    answer: "Absolutely not. Requesting an offer is completely free with no strings attached. You can review your options and decide what's best for your situation. There's no pressure and no hidden fees."
  }
];

// ============================================
// 2. GET YOUR OFFER PAGE FAQs
// File: app/get-offer/page.tsx
// ============================================
export const getOfferFaqs = [
  {
    question: "How does Rush Home determine my offer price?",
    answer: "Your offer is based on comparable home sales in your area, current market conditions, and your property's condition. QuickBuy uses the same data real estate professionals use to determine fair market value, then provides a competitive cash offer."
  },
  {
    question: "What types of homes qualify?",
    answer: "QuickBuy works with most single-family homes, townhomes, and condos. The program is available in all 50 states and works for conventional loan financing. Enter your address to see if your home qualifies."
  },
  {
    question: "Can I list my home traditionally?",
    answer: "Yes! With the Lock option, you can list your home traditionally while keeping your guaranteed backup offer for 150 days. If you find a buyer on the open market for a higher price, great. If not, you can exercise your backup offer anytime."
  },
  {
    question: "How does the \"buy before you sell\" program work?",
    answer: "With Lock, we provide a guaranteed backup contract on your current home. This allows lenders to exclude your current mortgage from debt-to-income calculations, enabling you to qualify for and purchase your new home without waiting to sell first. The backup offer is valid for 150 days."
  },
  {
    question: "Am I obligated to accept the offer?",
    answer: "Absolutely not. Requesting an offer is completely free with no strings attached. You can review your options and decide what's best for your situation."
  }
];

// ============================================
// 3. HOW TO BUY PAGE FAQs
// File: app/buy/page.tsx (or similar)
// ============================================
export const howToBuyFaqs = [
  {
    question: "How long does buying a house take from start to finish?",
    answer: "The typical home buying process takes 3-6 months from deciding to buy through closing. This includes 1-3 months to search and find a home, then 30-45 days to close once you're under contract. Being pre-approved can speed things up significantly."
  },
  {
    question: "What credit score do I need to buy a house?",
    answer: "Minimum credit scores vary by loan type: Conventional loans typically require 620+, FHA loans accept 580+ (or 500 with 10% down), and VA loans have no official minimum but most lenders want 620+. Higher scores qualify you for better interest rates."
  },
  {
    question: "How much money do I need to buy a house in Delaware?",
    answer: "Plan for 3-20% down payment plus 2-5% for closing costs. On a $350,000 home, that's roughly $17,500-$87,500 depending on your loan type and any negotiated seller concessions. Some programs offer down payment assistance for qualified buyers."
  },
  {
    question: "What happens if the house appraises for less than the purchase price?",
    answer: "You have several options: renegotiate the price with the seller, pay the difference in cash, request a new appraisal if you believe there were errors, or exercise your appraisal contingency to exit the contract. Your agent will guide you through the best approach."
  },
  {
    question: "Can I buy a new home before selling my current one?",
    answer: "Yes! Our Buy Before You Sell program uses your current home's guaranteed offer to help you qualify for your next home. This lets you make non-contingent offers, move on your timeline, and avoid the stress of selling first. Contact us to learn more."
  }
];

// ============================================
// 4. MORTGAGE 101 PAGE FAQs
// File: app/mortgage-101/page.tsx (or similar)
// ============================================
export const mortgage101Faqs = [
  {
    question: "How much should I save for a down payment?",
    answer: "The traditional recommendation is 20% to avoid private mortgage insurance (PMI), but many programs allow 3-5% down. FHA loans require just 3.5%, and VA/USDA loans offer 0% down for eligible buyers. Your ideal down payment depends on your financial situation and loan type."
  },
  {
    question: "What credit score do I need to buy a home?",
    answer: "Minimum credit scores vary by loan type: Conventional loans typically require 620+, FHA loans accept 580+ (or 500 with 10% down), and VA loans have no official minimum but most lenders prefer 620+. Higher scores qualify you for better interest rates and terms."
  },
  {
    question: "What's the difference between pre-qualification and pre-approval?",
    answer: "Pre-qualification is a quick estimate based on self-reported information—useful for initial planning. Pre-approval involves a full credit check, income verification, and provides a conditional commitment letter that sellers take seriously. Always get pre-approved before house hunting."
  },
  {
    question: "How long does the mortgage process take?",
    answer: "From application to closing typically takes 30-45 days. Pre-approval can be done in 1-3 days. The timeline depends on how quickly you provide documentation, the complexity of your financial situation, and any issues that arise during underwriting."
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer: "A 30-year mortgage has lower monthly payments but more total interest over the life of the loan. A 15-year mortgage builds equity faster with significantly less total interest but requires higher monthly payments. Choose based on your monthly budget and long-term financial goals."
  },
  {
    question: "What happens if my appraisal comes in low?",
    answer: "You can negotiate with the seller to lower the price, pay the difference between the appraised value and purchase price in cash, dispute the appraisal if you believe there were errors, or walk away if you have an appraisal contingency. Your lender and agent will help you navigate the options."
  },
  {
    question: "Can I buy a home if I'm self-employed?",
    answer: "Yes, but you'll typically need 2 years of tax returns showing consistent income, a good credit score, and possibly a larger down payment. Lenders average your income over the 2-year period, so consistent or increasing income helps. Bank statement loans are also available for some self-employed borrowers."
  },
  {
    question: "Am I eligible for a VA or USDA loan?",
    answer: "VA loans require military service (active duty, veteran, National Guard/Reserve, or eligible surviving spouse). USDA loans are for rural and suburban properties in designated areas with household income limits—many Delaware areas qualify. We can help determine your eligibility."
  },
  {
    question: "What are closing costs and how much should I expect?",
    answer: "Closing costs typically run 2-5% of your loan amount and include lender fees, title insurance, appraisal, attorney fees, prepaid taxes and insurance, and more. On a $350,000 home, expect $7,000-$17,500. Some costs can be negotiated or covered by seller concessions."
  }
];

// ============================================
// 5. HOW TO SELL PAGE FAQs
// File: app/sell/page.tsx (or similar)
// ============================================
export const howToSellFaqs = [
  {
    question: "How long does it take to sell a house in Delaware?",
    answer: "The average time on market in Delaware is 30-60 days, plus 30-45 days to close. However, this varies by location, price point, condition, and market conditions. Well-priced homes in good condition often sell faster, sometimes within days of listing."
  },
  {
    question: "Should I make repairs before selling?",
    answer: "It depends on the repair and your goals. Minor cosmetic updates often provide good ROI. Major repairs can be worth it if they'd otherwise scare off buyers. Alternatively, our guaranteed sale program lets you sell as-is without any repairs. We can advise on what makes sense for your situation."
  },
  {
    question: "What's the difference between listing traditionally and a guaranteed sale?",
    answer: "Traditional listing exposes your home to the full market for potentially the highest price, but comes with uncertainty about timing and final price. Our guaranteed sale gives you a firm cash offer you can accept anytime, with the option to list traditionally while holding that backup offer."
  },
  {
    question: "How much will I net from selling my home?",
    answer: "Your net proceeds depend on your sale price minus mortgage payoff, agent commissions (typically 5-6%), closing costs (1-3%), and any repairs or concessions. We provide a detailed net sheet estimate so you know exactly what to expect before making decisions."
  },
  {
    question: "Can I sell my home if I still have a mortgage?",
    answer: "Absolutely. Most sellers have mortgages. At closing, your mortgage is paid off from the sale proceeds, and you receive the remaining equity. If you owe more than your home is worth (underwater), we can discuss options like short sales or waiting for appreciation."
  },
  {
    question: "Do I need to be moved out before closing?",
    answer: "Typically yes, but there's flexibility. With our programs, leaseback options let you stay in your home after closing—giving you time to find and move into your next home without the pressure of a double move. Traditional sales can also negotiate post-closing occupancy."
  }
];

// ============================================
// 6. NEW CONSTRUCTION PROCESS PAGE FAQs
// File: app/new-construction/page.tsx (or similar)
// ============================================
export const newConstructionFaqs = [
  {
    question: "How long does it take to build a new home?",
    answer: "Most new construction homes take 6-12 months from contract to completion, depending on the builder, home size, customization level, and current demand. Production builders with established floor plans are typically faster than fully custom builds."
  },
  {
    question: "Do I need my own agent for new construction?",
    answer: "Absolutely! The builder's sales representatives work for the builder, not you. Your own agent advocates for your interests, helps negotiate upgrades and pricing, reviews contracts, and ensures the builder follows through on commitments—all at no extra cost to you."
  },
  {
    question: "What upgrades are worth the investment?",
    answer: "Focus on structural upgrades that are hard to add later: electrical outlets, plumbing rough-ins, ceiling heights, and garage size. Cosmetic upgrades like flooring, countertops, and paint can often be done later for less. We help you prioritize based on resale value and your budget."
  },
  {
    question: "Can I negotiate on new construction pricing?",
    answer: "Yes! While builders may not lower the base price, they often negotiate on upgrades, closing costs, or incentives like rate buydowns. Timing matters—builders are more flexible at quarter/year end or when inventory is high. Having an experienced agent helps significantly."
  },
  {
    question: "What inspections do I need for new construction?",
    answer: "We recommend at minimum: a pre-drywall inspection (to see framing, electrical, plumbing before it's covered), and a final inspection before closing. Some buyers also do foundation and 11-month warranty inspections. These catch issues while they're the builder's responsibility to fix."
  },
  {
    question: "What if I need to sell my current home first?",
    answer: "Our Buy Before You Sell program is perfect for this. We provide a guaranteed backup offer on your current home so you can confidently commit to new construction without a home sale contingency—which builders often don't accept. This gives you leverage and flexibility."
  },
  {
    question: "What warranties come with new construction?",
    answer: "Most builders provide a tiered warranty: 1 year for workmanship and materials, 2 years for mechanical systems (HVAC, plumbing, electrical), and 10 years for structural defects. Some builders offer more comprehensive coverage. We review warranty terms as part of your contract review."
  }
];

// ============================================
// 7. RUSH HOME ASSURANCE PAGE FAQs
// File: app/assurance/page.tsx (or similar)
// ============================================
export const assuranceFaqs = [
  {
    question: "What is the Rush Home Assurance Guarantee?",
    answer: "The Rush Home Assurance Guarantee is our commitment to stand behind the homes we help you purchase. If major issues arise that were missed during inspection, we help make it right—giving you peace of mind that you're protected beyond the typical home buying process."
  },
  {
    question: "What does the guarantee cover?",
    answer: "Coverage includes major structural issues, HVAC systems, electrical and plumbing problems, roof defects, and other significant home systems that may have been missed during the standard inspection process. Specific terms and conditions apply—we'll explain everything in detail."
  },
  {
    question: "How long does the coverage last?",
    answer: "Our Assurance Guarantee provides coverage during a critical initial ownership period, complementing your home inspection and any seller disclosures. The specific duration depends on your program tier and property type. Contact us for complete details."
  },
  {
    question: "Is there a cost for the Assurance Guarantee?",
    answer: "The Rush Home Assurance Guarantee is included when you work with our team to purchase your home—it's our way of demonstrating confidence in our process and commitment to your satisfaction. No hidden fees or surprise costs."
  },
  {
    question: "How is this different from a home warranty?",
    answer: "Unlike standard home warranties that cover appliance breakdowns with service fees, our Assurance Guarantee specifically addresses issues that should have been caught during the buying process. It's an additional layer of protection, not a replacement for home warranties or inspections."
  },
  {
    question: "What if I find a problem after moving in?",
    answer: "Contact us immediately. We'll assess the situation, determine if it falls under our guarantee, and work with you on a resolution. Our goal is to make the process as smooth as possible—we're your advocates even after closing."
  }
];

// ============================================
// EXPORT ALL FAQ DATA
// ============================================
export const faqData = {
  homePage: homePageFaqs,
  getOffer: getOfferFaqs,
  howToBuy: howToBuyFaqs,
  mortgage101: mortgage101Faqs,
  howToSell: howToSellFaqs,
  newConstruction: newConstructionFaqs,
  assurance: assuranceFaqs
};

export default faqData;
