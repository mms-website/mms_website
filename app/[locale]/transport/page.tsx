'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface TransportSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  advantages: string[];
  image: string;
}

const VerticalLine = () => {
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      const maxHeight = window.innerHeight * 0.8;
      setLineHeight(maxHeight * progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{ height: `${lineHeight}px` }}
      className="fixed top-0 left-1/2 -translate-x-1/2 w-0.5 bg-(--blue-main) z-10 transition-all duration-75 ease-linear"
    ></div>
  );
};

const TransportPage = () => {
  const pathname = usePathname();
  const [sections, setSections] = useState<TransportSection[]>([]);

  // Détecte la langue dans l’URL
  const locale = pathname?.split("/")[1] || "en";

  useEffect(() => {
    fetch(`/data/${locale}/transport.json`)
      .then((res) => res.json())
      .then((data) => setSections(data))
      .catch(() => setSections([]));
  }, [locale]);

  return (
    <main className="w-full flex flex-col items-center bg-(--bg-main-light) dark:bg-(--bg-high-dark)">
      <VerticalLine />

      {sections.map((item, index) => {
        const reverse = index % 2 === 1;

        return (
          <section
            key={item.id}
            id={item.id}
            className={`relative flex gap-12 items-start p-8 w-2/3 text-(--text-main-light) dark:text-(--text-main-dark) ${reverse ? 'flex-row-reverse' : ''}`}
          >
            <div className="w-1/2 relative h-[450px] rounded-xl overflow-hidden shadow-xl">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>

            <div className={`w-1/2 relative flex flex-col gap-6 ${reverse ? 'items-end text-right' : 'items-start text-left'}`}>
              <h1 className={`absolute top-0 ${reverse ? 'translate-x-1/2' : '-translate-x-1/2'} text-5xl font-bold font-myfont drop-shadow-xl tracking-wide mt-7 hollow-text-dark z-10`}>
                {item.title}
              </h1>

              <div className="mt-25">
                <h2 className="text-xl font-semibold opacity-80">{item.subtitle}</h2>
                <p className="text-lg leading-relaxed">{item.description}</p>

                <ul className="mt-2 space-y-2">
                  {item.advantages.map((adv, i) => (
                    <li key={i} className="flex items-start gap-3 text-base">
                      <span className="w-3 h-3 bg-(--text-main-light) dark:bg-(--text-main-dark) rounded-full mt-1"></span>
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default TransportPage;
