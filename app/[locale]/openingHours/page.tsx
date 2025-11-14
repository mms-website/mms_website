'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface OpeningHour {
  day: string;
  morning?: string;
  afternoon?: string;
}

const OpeningHoursPage = () => {
  const t = useTranslations('OpeningHours');
  const [hours, setHours] = useState<OpeningHour[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    fetch('/data/openingHours.json')
      .then(res => res.json())
      .then((data: OpeningHour[]) => setHours(data))
      .catch(err => console.error('Erreur chargement openingHours.json', err));
  }, []);

  if (hours.length === 0) return <p>Loading...</p>;

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="mx-3 p-4 flex flex-col gap-4 rounded-lg shadow-2xl bg-(--bg-main-light) dark:bg-(--bg-high-dark) text-(--text-main-light) dark:text-(--text-main-dark)">
      <h1 data-aos="fade-up" className="text-3xl font-bold">{t('title')}</h1>

      {/* Description + Bouton sur la même ligne */}
      <div data-aos="fade-up" className="flex">
        <p className="text-lg text-(--text-main-light) dark:text-(--text-main-dark) mr-1">
          {t('description')}
        </p>
        <button
          onClick={scrollToContact}
          className="text-lg cursor-pointer relative text-(--color-light) dark:text-(--color-dark) after:block after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          {t('buttonLabel')}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {hours.map((hour, index) => {
          const morning = hour.morning?.toLowerCase() ?? '';
          const afternoon = hour.afternoon?.toLowerCase() ?? '';
          const isClosed = morning === 'closed' && afternoon === 'closed';

          return (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`p-4 rounded-lg shadow flex flex-col items-center ${
                isClosed
                  ? 'bg-gray-300  text-gray-700'
                  : 'bg-green-100 text-green-800 '
              }`}
            >
              <span className="font-semibold">{t(hour.day)}</span>
              {isClosed ? (
                <span>{t('close')}</span>
              ) : (
                <span>
                  {morning} {afternoon ? `/ ${afternoon}` : ''}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default OpeningHoursPage;
