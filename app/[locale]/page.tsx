'use client';

import { useEffect } from 'react';
import ContactPage from './contact/page';
import HomePage from './home/page';
import OpeningHoursPage from './openingHours/page';
import ServicePage from './service/page';
import TirePage from './tire/page';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Main() {

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  return (
    <div className="bg-(--bg-main-light) dark:bg-(--bg-main-dark) text-(--text-main-light) dark:text-(--text-main-dark) flex flex-col gap-8">
      {/* Section Home */}
      <div 
        id="home"
      >
        <HomePage />
      </div>

      {/* Section Service */}
      <div 
        id="service"
        data-aos="fade-left"
      >
        <ServicePage />
      </div>

      {/* Section Pneus */}
      <div 
        id="tire"
        data-aos="fade-left"
      >
        <TirePage />
      </div>

      {/* Section Contact */}
      <div 
        id="contact"
        data-aos="fade-left"
      >
        <ContactPage />
      </div>

      {/* Section OpeningHours */}
      <div 
        id="openingHours"
        data-aos="fade-left"
      >
        <OpeningHoursPage />
      </div>

    </div>
  );
}
