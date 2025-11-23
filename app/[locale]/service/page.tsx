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

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const openModal = (index: number) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);

  return (
    <main className="relative flex flex-col gap-8 shadow-2xl z-50">

      {/* WRAPPER QUI CONFINERA LE BACKGROUND À CETTE PAGE */}
      <section className="relative w-full min-h-screen overflow-hidden">

        {/* 🌄 BACKGROUND UNIQUEMENT POUR CETTE PAGE */}
        <div className="absolute inset-0 bg-[url('/img/service.jpg')] bg-cover bg-center bg-fixed -z-20" /> {/* bg-[url('/img/service.jpg')] bg-cover bg-center bg-fixed */}

        {/* 🌫️ FILTRE */}
        <div className="absolute inset-0 -z-10" />

        {/* --- CONTENU --- */}
        <div className="relative z-10 w-full text-center pb-5 px-50">
          <h1
            className="
              text-7xl font-bold font-myfont 
              hollow-text
              text-center 
              py-5
              tracking-widest
            "
          >
            {t("title")}
          </h1>

          {/* Cards */}
          <div className="grid gap-8 place-items-center grid-cols-[repeat(auto-fit,minmax(320px,1fr))] m-4">
            {services.map((service, index) => (
              <div
                key={index}
                data-aos="flip-left"
                className="relative w-full max-w-xs h-[380px] mx-auto group cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div
                  className="
                    relative w-full h-[380px] rounded-3xl p-1 
                    bg-black/5 backdrop-blur-xs
                    border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                    group-hover:shadow-[0_12px_40px_rgb(0,0,0,0.35)]
                    transition-all duration-300 group-hover:scale-[1.03]
                  "
                >
                  {/* IMG */}
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="
                        object-cover transition-all duration-500
                        group-hover:scale-110
                      "
                    />
                    <div className="absolute inset-0 bg-linear-to-b" />
                  </div>

                  {/* ---- OVERLAY ANIMÉ ---- */}
                  <div
                    className="
                      absolute bottom-0 left-0 right-0
                      h-0 group-hover:h-full
                      bg-black/60 backdrop-blur-md
                      flex flex-col items-center justify-center
                      text-center px-4
                      rounded-3xl
                      opacity-0 group-hover:opacity-100
                      transition-all duration-500 ease-out
                      overflow-hidden
                    "
                  >
                    <h3 className="text-xl font-bold text-(--text-main-dark) tracking-wide">
                      {service.name}
                    </h3>
                    <p className="text-sm text-(--text-main-dark) font-semibold mt-2">
                      {service.title}
                    </p>

                    <CirclePlus
                      className="
                        mt-4 w-12 h-12 p-3
                        bg-(--text-main-dark) text-(--text-main-light)
                        rounded-full shadow-lg
                        hover:bg-[#6d4728]
                        transition-all duration-300
                      "
                    />
                  </div>

                  {/* ---- Texte visible avant le hover ---- */}
                  <div className="flex items-center justify-between px-4 py-4 group-hover:opacity-0 transition-opacity duration-300">
                    <div className="flex flex-col text-left">
                      <h3 className="text-xl font-bold text-(--text-main-dark)">
                        {service.name}
                      </h3>
                      <p className="text-sm text-(--text-main-dark) opacity-90 mt-1">
                        {service.title}
                      </p>
                    </div>

                    <CirclePlus
                      className="
                        w-10 h-10 p-2 ml-4
                        bg-(--text-main-dark) text-(--text-main-light)
                        rounded-full shadow-lg
                        hover:bg-[#6d4728]
                        transition-all duration-300
                        shrink-0
                      "
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MODAL */}
          {modalIndex !== null && (
            <Modal>
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex justify-center items-center p-4"
                onClick={closeModal}
              >
                <div
                  className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 max-w-4xl w-full rounded-2xl max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="absolute top-4 right-4" onClick={closeModal}>
                    <X className="text-(--text-main-dark) hover:text-(--text-high-light)" />
                  </button>

                  {(() => {
                    const service = services[modalIndex];
                    return (
                      <div className="flex flex-col lg:flex-row gap-6 text-(--text-main-dark)">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold">{service.name}</h3>

                          {service.title && (
                            <p className="text-(--text-main-dark) mb-2">{service.title}</p>
                          )}

                          {service.details?.map((detail: string, i: number) => (
                            <p key={i} className="mt-4">
                              {detail}
                            </p>
                          ))}

                          <div className="text-center mt-6">
                            <button
                              onClick={closeModal}
                              className="px-6 py-2 bg-(--text-main-dark) text-(--text-main-light) rounded-xl hover:bg-(--text-main-light) hover:text-(--text-main-dark) cursor-pointer transition-all duration-75"
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
      </section>
    </main>
  );
};

export default RosterPage;
