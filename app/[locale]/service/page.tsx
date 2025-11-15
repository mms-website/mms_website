"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, CirclePlus } from "lucide-react";
import services from "../../../public/data/services.json";
import AOS from "aos";
import Modal from "../../components/Modal";
import "aos/dist/aos.css";
import { useTranslations } from "next-intl";

const RosterPage = () => {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const t = useTranslations("Service");

  // AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const openModal = (index: number) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);

  return (
    <main className="mx-3 flex flex-col gap-8 rounded-lg shadow-2xl bg-(--bg-main-light) dark:bg-(--bg-high-dark) text-(--text-main-light) dark:text-(--text-main-dark)">
      <div className="relative w-full text-center text-white pb-5 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-left pl-4 py-4 text-(--text-main-light) dark:text-(--text-main-dark)">
            {t("title")}
          </h1>
          <p className="text-justify px-4 text-(--text-main-light) dark:text-(--text-main-dark)">Bienvenue chez MISSILLAC MARINE SERVICE, votre partenaire de confiance pour tous les besoins liés à votre embarcation. Notre chantier naval, fort d'une expertise reconnue, vous propose une gamme exhaustive de services spécialisés pour assurer la performance et la longévité de votre bateau.</p>
          {/* Cards */}
          <div
            className="
              grid gap-8
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
              justify-center
              m-4
            "
          >
            {services.map((artist, index) => (
              <div
                key={index}
                data-aos="flip-left"
                className="relative w-full max-w-xs h-[360px] mx-auto group perspective-[1000px] cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div
                  className="transition-transform duration-200 ease-out transform rounded-lg w-full h-full shadow-lg"
                  style={{
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,0.7), 0 15px 25px rgba(30, 58, 138, 0.4)",
                  }}
                >
                  <div className="relative w-full h-[320px] rounded-lg overflow-hidden">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover rounded-lg"
                    />

                    {/* FILTRE NOIR */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all"></div>
                  </div>

                  {/* Bandeau avec dégradé cuivre → noir */}
                  <div
                    className="
                      absolute bottom-0 w-full rounded-b-lg px-4 py-4 
                      backdrop-blur-sm 
                      bg-gradient-to-t 
                      from-[#5c3b21]/90 
                      to-[#1a1a1a]/50
                      group-hover:from-[#6d4728]/95
                      group-hover:to-[#1a1a1a]/60
                      transition
                    "
                  >
                    <h3 className="text-xl font-semibold text-white drop-shadow-md">
                      {artist.name}
                    </h3>
                    <p className="text-sm font-black text-[#f0d2b5] drop-shadow-md">
                      {artist.title}
                    </p>
                  </div>

                  {/* CirclePlus Button */}
                  <div className="absolute bottom-4 right-4">
                    <CirclePlus className="w-10 h-10 p-2 bg-[#5c3b21] text-white rounded-full shadow-lg hover:bg-[#6d4728] hover:scale-110 transition-transform duration-200 cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {modalIndex !== null && (
          <Modal>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[999] flex justify-center items-center p-4"
              onClick={closeModal}
            >
              <div
                className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 max-w-4xl w-full rounded-2xl overflow-y-auto max-h-[90vh] transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="absolute top-4 right-4" onClick={closeModal}>
                  <X className="text-white hover:text-[#f0d2b5] transition" />
                </button>

                {(() => {
                  const artist = services[modalIndex];
                  return (
                    <div className="flex flex-col lg:flex-row gap-6 text-left text-white">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold">{artist.name}</h3>
                        {artist.title && (
                          <p className="mb-2 text-[#f0d2b5]">{artist.title}</p>
                        )}
                        {artist.location && (
                          <p className="text-sm text-[#d1bfa7] italic mb-2">
                            {artist.location}
                          </p>
                        )}

                        {artist.details?.map((detail: string, i: number) => (
                          <p key={i} className="mt-4 leading-relaxed">
                            {detail}
                          </p>
                        ))}

                        {artist.syn && (
                          <p className="mt-4 text-[#f0d2b5] italic text-sm">
                            {artist.syn}
                          </p>
                        )}

                        <div className="text-center mt-6">
                          <button
                            onClick={closeModal}
                            className="px-6 py-2 bg-[#5c3b21]/70 backdrop-blur-md text-white rounded-xl hover:bg-[#6d4728]/80 transition"
                          >
                            Fermer
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </main>
  );
};

export default RosterPage;
