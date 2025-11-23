'use client';

import { useEffect } from 'react';
import ContactPage from './contact/page';
import HomePage from './home/page';
import OpeningHoursPage from './openingHours/page';
import ServicePage from './service/page';
import TransportPage from './transport/page';

export default function Main() {

  useEffect(() => {
  }, []);

  return (
    <div className="relative flex flex-col text-(--text-main-light) dark:text-(--text-main-dark)">

      {/* Sections */}
      <div className="relative z-10 bg-transparent">

        {/* Section Home */}
        <div id="home">
          <HomePage />
        </div>

        {/* Section Service */}
        <div id="service">
          <ServicePage />
        </div>

        <div id="transport">
          <TransportPage />
        </div>

        {/* Section Contact */}
        <div id="contact">
          <ContactPage />
        </div>

        {/* Section OpeningHours */}
        <div id="openingHours">
          <OpeningHoursPage />
        </div>
      </div>
    </div>
  );
}
