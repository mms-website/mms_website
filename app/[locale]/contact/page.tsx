'use client';

import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Copy } from 'lucide-react';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface ContactData {
  phone: string;
  email: string;
  address: string;
}

const ContactPage = () => {
  const t = useTranslations('Contact');

  const [contact, setContact] = useState<ContactData | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  useEffect(() => {
    fetch('/data/contact.json')
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.error('Erreur chargement contact.json', err));
  }, []);

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!contact) return <p>Loading...</p>;

  const mapsQuery = encodeURIComponent(contact.address);

  return (
    <main className="mx-3 p-6 flex flex-col gap-4 rounded-xl shadow-2xl bg-(--bg-main-light) dark:bg-(--bg-high-dark) text-(--text-main-light) dark:text-(--text-main-dark)">
      <h1 
        className="text-3xl md:text-4xl font-bold"
        data-aos="fade-up"
        >
          {t('title')}
      </h1>
      <h1 
        className="text-xl md:text-2xl font-bold"
        data-aos="fade-up"
      >
        {t('subtitle')}
      </h1>
      <p 
        className="text-xs md:text-lg text-justify text-(--text-main-light) dark:text-(--text-main-dark)"
        data-aos="fade-up"
      >
        {t('description')}
      </p>

      {/* Warning + bouton sur la même ligne */}
      <div
        data-aos="fade-up"
        className="flex flex-wrap items-center text-xs md:text-lg text-(--text-main-light) dark:text-(--text-main-dark)"
      >
        <span className="mr-1">{t('warning')}</span>
        <button
          onClick={() => {
            const element = document.getElementById('openingHours');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="cursor-pointer relative text-(--color-light) dark:text-(--color-dark) after:block after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          {t('buttonLabel')}
        </button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Phone */}
        <div
          data-aos="fade-up"
          className="flex items-center justify-between gap-2 p-4 rounded-lg bg-(--bg-high-light) dark:bg-(--bg-main-dark) hover:bg-(--text-main-light) dark:hover:bg-(--bg-highlight-dark) hover:text-(--bg-high-light) transition"
        >
          <a href={`tel:${contact.phone}`} className="flex items-center gap-2">
            <Phone className="w-6 h-6" />
            <span>{t('phone')}: {contact.phone}</span>
          </a>
          <button
            onClick={() => handleCopy(contact.phone, 'phone')}
            className="p-1 rounded hover:bg-white/30 dark:hover:bg-black/30 transition cursor-pointer"
            title="Copier"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>

        {/* Email */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="flex items-center justify-between gap-2 p-4 rounded-lg bg-(--bg-high-light) dark:bg-(--bg-main-dark) hover:bg-(--text-main-light) dark:hover:bg-(--bg-highlight-dark) hover:text-(--bg-high-light) transition"
        >
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2">
            <Mail className="w-6 h-6" />
            <span>{t('email')}: {contact.email}</span>
          </a>
          <button
            onClick={() => handleCopy(contact.email, 'email')}
            className="p-1 rounded hover:bg-white/30 dark:hover:bg-black/30 transition cursor-pointer"
            title="Copier"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>

        {/* Address */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="flex items-center justify-between gap-2 p-4 rounded-lg bg-(--bg-high-light) dark:bg-(--bg-main-dark) hover:bg-(--text-main-light) dark:hover:bg-(--bg-highlight-dark) hover:text-(--bg-high-light) transition"
        >
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <MapPin className="w-6 h-6" />
            <span>{t('address')}: {contact.address}</span>
          </a>
          <button
            onClick={() => handleCopy(contact.address, 'address')}
            className="p-1 rounded hover:bg-white/30 dark:hover:bg-black/30 transition cursor-pointer"
            title="Copier"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </div>

      {copied && (
        <div className="fixed bottom-6 right-6 px-4 py-2 rounded-lg bg-black/70 text-white text-sm">
          {copied === 'phone' && 'Numéro copié !'}
          {copied === 'email' && 'Email copié !'}
          {copied === 'address' && 'Adresse copiée !'}
        </div>
      )}
    </main>
  );
};

export default ContactPage;
