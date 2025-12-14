// src/components/stands-section.jsx
import React, { useLayoutEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Store, MapPin } from "lucide-react";
import SolicitarStandModal from "./modales/solicitarStand-modal";

import standPrincipal from "../assets/stand_principal.png";

export default function StandsSection() {
  const rootRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      // Entradas / salidas (se reinician al volver)
      gsap.fromTo(
        ".st-anim",
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            end: "bottom 20%",
            toggleActions: "restart none none reverse",
          },
        }
      );

      // Parallax suave en la imagen
      gsap.to(".st-hero-img", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Micro-hover lift (suave)
      const card = root.querySelector(".st-card");
      if (card) {
        const onEnter = () =>
          gsap.to(card, { y: -4, duration: 0.25, ease: "power2.out" });
        const onLeave = () =>
          gsap.to(card, { y: 0, duration: 0.25, ease: "power2.out" });

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        return () => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        };
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const features = [
    "Montaje completo del stand (estructura, exhibición y orden)",
    "Productos ideales para congregación, ministerios, jóvenes y familias",
    "Atención cercana y respetuosa, cuidando el ambiente del evento",
    "Opciones para campañas, retiros, convenciones y ferias cristianas",
  ];

  return (
    <section
      ref={rootRef}
      id="stands"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
    >
      {/* glow sutil */}
      <div
        className="pointer-events-none absolute -z-10 left-1/2 top-[-260px] h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(40% 40% at 50% 50%, rgba(251,191,36,.22) 0%, rgba(251,191,36,.08) 45%, rgba(255,255,255,0) 78%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="st-anim mx-auto mb-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 shadow-sm">
            <Store className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-semibold tracking-wide text-black/80">
              Stand para Eventos
            </span>
          </div>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-black sm:text-5xl">
            Llevamos Nuestro Stand a Tu Actividad
          </h2>

          <p className="mt-4 text-base leading-relaxed text-black/60 sm:text-lg">
            Si tu iglesia está <b>planificando</b> una convención, retiro, campaña o feria,
            podemos coordinar un stand con productos personalizados listos para exhibición
            y venta, con una estética cuidada y acorde al entorno.
          </p>
        </div>

        {/* Main grid (responsive) */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image card */}
          <div className="st-anim order-1 lg:order-none">
            <div className="st-card overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <div className="relative">
                <div className="mx-auto max-w-[640px] p-4 sm:p-5">
                  <div className="overflow-hidden rounded-2xl bg-black/5">
                    <img
                      src={standPrincipal}
                      alt="Stand de Universo Creativo para eventos"
                      className="st-hero-img block h-auto w-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2 shadow-sm">
                    <MapPin className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium text-black/80">
                      Viña del Mar / Limache, Chile
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-black/60 sm:text-base">
                    Coordinamos la instalación y presentación del stand con productos pensados
                    para comunidad cristiana, ideal para actividades con asistentes de todas las edades.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="st-anim order-2 lg:order-none">
            <h3 className="text-2xl font-extrabold tracking-tight text-black sm:text-3xl">
              Servicio Completo para Actividades de Iglesia
            </h3>

            <p className="mt-4 text-base leading-relaxed text-black/60 sm:text-lg">
              Nos encargamos de coordinar todo: <b>montaje, exhibición y atención</b>, para que
              tu comunidad tenga una experiencia ordenada y bonita, sin complicaciones.
            </p>

            <ul className="mt-7 space-y-4">
              {features.map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-amber-500/15">
                    <Check className="h-4 w-4 text-amber-600" />
                  </span>
                  <span className="text-sm leading-relaxed text-black/75 sm:text-base">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA box */}
            <div className="st-anim mt-8 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <p className="text-sm text-black/70 sm:text-base">
                <span className="font-extrabold text-amber-600">
                  ¿Quieres cotizar un stand para tu iglesia?
                </span>{" "}
                Escríbenos y coordinamos fecha, lugar y lo que necesitas para tu actividad.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-black shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Solicitar Stand
                </button>

                <a
                  href="#footer"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black/80 shadow-sm transition-colors hover:bg-black/[0.03]"
                >
                  Ver Contacto
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal (sin mensajes prellenados) */}
      <SolicitarStandModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
