'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <div className="relative w-full h-screen overflow-hidden z-50">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/video/main.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center bg-black/40 px-4">
        <section className="text-center mx-auto space-y-6">

          {/* Title (garde font-myfont) */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-myfont font-bold leading-tight text-(--text-main-dark) drop-shadow-xl hollow-text-big">
            {t('title')}
          </h1>

          {/* Subtitle with different font */}
          <p className="text-xl md:text-2xl lg:text-3xl font-winkysans text-(--text-main-dark) drop-shadow-lg">
            {t('subtitle')}
          </p>

          {/* Description with different font */}
          <p className="text-lg md:text-xl lg:text-2xl font-winkysans text-(--text-main-dark) drop-shadow-md max-w-3xl mx-auto">
            {t('description')}
          </p>

        </section>
      </div>
    </div>
  );
}
