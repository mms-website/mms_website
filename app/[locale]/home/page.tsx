'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Vidéo en background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/video/main.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Contenu au-dessus */}
      <div className="relative z-10 w-full h-full flex items-center justify-center bg-black/40 px-4">
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white/90 drop-shadow-lg">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/80 drop-shadow-md">
            {t('subtitle')}
          </p>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/70 drop-shadow-sm">
            {t('description')}
          </p>
        </section>
      </div>
    </div>
  );
}
