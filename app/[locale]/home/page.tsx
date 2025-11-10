'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <div className="w-full bg-(--bg-main-light) dark:bg-(--bg-main-dark) text-(--text-main-light) dark:text-(--text-main-dark) flex flex-col gap-8 p-4">
      {/* Section Hero / Accueil */}
      <section className="flex flex-col items-center justify-center gap-4" style={{ height: 'calc(100vh - 112px)' }}>
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="text-lg text-center max-w-xl">{t('subtitle')}</p>
      </section>
    </div>
  );
}
