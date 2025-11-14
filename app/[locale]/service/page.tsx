"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import artists from "../../../public/data/services.json";
import AOS from "aos";
import "aos/dist/aos.css";

const RosterPage = () => {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Open Modal
  const openModal = (index: number) => {
    setModalIndex(index);
  };

  // Close Modal
  const closeModal = () => setModalIndex(null);

  function getYouTubeEmbedUrl(url: string): string | null {
    try {
      const parsedUrl = new URL(url);
      let videoId = "";

      if (parsedUrl.hostname === "youtu.be") {
        videoId = parsedUrl.pathname.slice(1);
      } else if (
        parsedUrl.hostname === "www.youtube.com" ||
        parsedUrl.hostname === "youtube.com"
      ) {
        videoId = parsedUrl.searchParams.get("v") || "";
      }

      if (!videoId) return null;
      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return null;
    }
  }

  return (
    <div className="relative w-full text-center text-white pb-20 overflow-hidden">
      {/* Purple BG */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/img/bg/purple_bg.png')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
          backgroundAttachment: "fixed",
        }}
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4">
        <h2 className="text-3xl lg:text-7xl font-extrabold pt-4 mb-8">ARTISTES</h2>

        {/* Cards */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {artists.map((artist, index) => (
            <button
              key={index}
              onClick={() => openModal(index)}
              className="focus:outline-none"
            >
              <div data-aos="flip-left" className="relative w-full max-w-xs h-[360px] mx-auto">
                <div
                  className="rounded-lg w-full h-full shadow-lg transition-transform duration-200 group"
                >
                  <div className="relative w-full h-[320px] rounded-lg overflow-hidden">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="absolute bottom-0 w-full rounded-b-lg px-4 py-4 backdrop-blur-sm bg-gradient-to-t from-[rgba(44,93,50,0.7)] to-[rgba(44,93,50,0.3)] group-hover:bg-[rgba(44,93,50,0.85)]">
                    <h3 className="text-xl font-semibold text-white drop-shadow-md">
                      {artist.name}
                    </h3>
                    <p className="text-sm font-black text-[#d6e7d1] drop-shadow-md">
                      {artist.title}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {modalIndex !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="relative bg-black/90 border border-green-900 p-6 max-w-4xl w-full rounded-lg overflow-y-auto max-h-[90vh]">
            <button className="absolute top-4 right-4" onClick={closeModal}>
              <X className="text-white hover:text-green-400" />
            </button>

            {(() => {
              const artist = artists[modalIndex];
              return (
                <div className="flex flex-col lg:flex-row gap-6 text-left">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">{artist.name}</h3>
                    {artist.title && <p className="mb-2">{artist.title}</p>}
                    {artist.location && (
                      <p className="text-sm text-green-200 italic mb-2">{artist.location}</p>
                    )}

                    {artist.details?.map((detail, i) => (
                      <p key={i} className="mt-4 text-white leading-relaxed">
                        {detail}
                      </p>
                    ))}

                    {artist.syn && (
                      <p className="mt-4 text-green-300 italic text-sm">{artist.syn}</p>
                    )}

                    {artist.contact && (
                      <p className="mt-2 text-white">
                        Contact : <span className="font-bold">{artist.contact}</span>
                      </p>
                    )}
                  </div>

                  {artist.poster ? (
                    <div className="w-full lg:w-[50%] aspect-video relative rounded-lg overflow-hidden">
                      <Image
                        src={artist.poster}
                        alt={`${artist.name} poster`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ) : artist.video ? (
                    <div className="w-full lg:w-[50%] aspect-video">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={getYouTubeEmbedUrl(artist.video) || ""}
                        title={artist.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default RosterPage;
