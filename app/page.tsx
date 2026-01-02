
"use client";

import React from 'react';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Comparison from '../components/Comparison';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';
import CtaSection from '../components/CtaSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Comparison />
      <Testimonials />
      <Faq />
      <CtaSection />
    </>
  );
}
