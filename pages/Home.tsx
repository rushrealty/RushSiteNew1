import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Comparison from '../components/Comparison';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';
import CtaSection from '../components/CtaSection';

const Home: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [hash]);

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
};

export default Home;