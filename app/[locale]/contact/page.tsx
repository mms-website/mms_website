'use client';

import { useTranslations } from 'next-intl';

const ContactPage = () => {
  const t = useTranslations('Contact');

  return (
    <main className="w-full mx-auto p-4 flex flex-col gap-8 rounded-lg shadow-2xl bg-(--bg-main-light) dark:bg-(--bg-high-dark) text-(--text-main-light) dark:text-(--text-main-dark)">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="text-lg text-(--text-main-light) dark:text-(--text-main-dark)">
        {t('description')}
      </p>
    </main>
  );
};

export default ContactPage;
