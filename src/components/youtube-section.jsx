// src/components/YoutubeSection.jsx
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlayCircle } from "lucide-react";

export default function YoutubeSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      const bg = root.querySelector(".yt-bg");
      const header = root.querySelector(".yt-header");
      const video = root.querySelector(".yt-video");
      const cta = root.querySelector(".yt-cta");

      // Estado inicial
      gsap.set([header, video, cta], { autoAlpha: 0, y: 28 });
      gsap.set(video, { scale: 0.98 });

      // Parallax suave del fondo
      if (bg) {
        gsap.fromTo(
          bg,
          { y: -20 },
          {
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Entrada / salida (se re-ejecuta cuando vuelves)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "restart none restart reverse",
        },
      });

      tl.to(header, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" })
        .to(
          video,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.35"
        )
        .to(
          cta,
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.35"
        );

      // Micro parallax del bloque de video (sutil)
      gsap.to(video, {
        y: -10,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="videos"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: "#f7f1e6" }} // tono crema similar a tus secciones
    >
      {/* Fondo parallax */}
      <div
        className="yt-bg pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 20%, rgba(251,191,36,.22) 0%, rgba(251,191,36,.08) 45%, rgba(0,0,0,0) 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(247,241,230,0.95), rgba(247,241,230,0.75), rgba(247,241,230,0.95))",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="yt-header text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border border-amber-200/60 bg-white/70 backdrop-blur">
            <PlayCircle className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-semibold tracking-wide text-amber-700">
              NUESTRO CANAL
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#151515]">
            Explora Nuestro Proceso Creativo
          </h2>

          <p className="mt-4 text-lg sm:text-xl text-[#4a4a4a] max-w-3xl mx-auto">
            Descubre cómo transformamos ideas en productos únicos. Síguenos en YouTube
            para ver más contenido.
          </p>
        </div>

        {/* Video */}
        <div className="yt-video max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-white border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/elu5LRkXPc8"
              title="Video de Universo Creativo"
              frameBorder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* CTA */}
        <div className="yt-cta mt-10 text-center">
          <a
            href="https://www.youtube.com/@Universo.Creativospa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
            style={{ backgroundColor: "#f59e0b", color: "#111" }}
          >
            <PlayCircle className="w-5 h-5" />
            Visita Nuestro Canal
          </a>
        </div>
      </div>
    </section>
  );
}
