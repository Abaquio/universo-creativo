// src/components/stands-section.jsx
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Store, MapPin } from "lucide-react";

// ✅ Ajusta esta ruta según tu proyecto
import standPrincipal from "../assets/stand_principal.png";

export default function StandsSection() {
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const heroCardRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      // --- Parallax suave del fondo ---
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: -20 },
          {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // --- Parallax suave de la imagen principal ---
      if (heroCardRef.current) {
        gsap.fromTo(
          heroCardRef.current,
          { y: 0 },
          {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 90%",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // --- Animación de entrada (y salida suave) re-ejecutable ---
      gsap.fromTo(
        root.querySelectorAll("[data-anim]"),
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "restart none none reverse", // ✅ se re-ejecuta al volver
          },
        }
      );

      // --- Animación extra en bullets (más orgánica) ---
      gsap.fromTo(
        root.querySelectorAll("[data-bullet]"),
        { x: -8, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            toggleActions: "restart none none reverse",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const features = [
    "Instalación completa del stand en tu evento",
    "Variedad de productos personalizados disponibles",
    "Atención profesional y dedicada",
    "Productos exclusivos para eventos y ferias",
  ];

  return (
    <section
      ref={rootRef}
      id="stands"
      className="relative overflow-hidden py-24 sm:py-28"
      style={{ backgroundColor: "#0000" }}
    >
      {/* Fondo textura / glow (parallax) */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 30%, rgba(251,191,36,.22) 0%, rgba(251,191,36,.08) 45%, rgba(0,0,0,0) 75%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            data-anim
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-black/10 shadow-sm"
          >
            <Store className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-black/80 tracking-wide">
              Stands para Eventos
            </span>
          </div>

          <h2
            data-anim
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black"
          >
            Llevamos Nuestro Stand a Tu Evento
          </h2>

          <p
            data-anim
            className="mt-4 text-lg sm:text-xl text-black/70 max-w-3xl mx-auto"
          >
            ¿Tu comunidad organiza ferias, convenciones o actividades especiales?
            Instalamos nuestro stand con productos personalizados perfectos para tu ocasión.
          </p>
        </div>

        {/* Layout principal */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Imagen principal (más pequeña) */}
          <div className="flex justify-center lg:justify-start">
            <div
              ref={heroCardRef}
              data-anim
              className="
                w-full
                max-w-[520px]            /* ✅ controla tamaño (antes era gigante) */
                sm:max-w-[560px]
                lg:max-w-[520px]
              "
            >
              <div className="rounded-3xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-black/10">
                <div className="relative">
                  <img
                    src={standPrincipal}
                    alt="Stand Universo Creativo"
                    className="w-full h-[260px] sm:h-[320px] object-cover"
                    loading="lazy"
                  />

                  {/* Tag ubicación */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 border border-black/10 shadow-sm backdrop-blur">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-semibold text-black/80">
                        Limache / Viña del Mar, Chile
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mini texto bajo imagen */}
                <div className="p-5">
                  <p className="text-black/75 leading-relaxed">
                    Montamos un stand completo con productos listos para exhibición y venta,
                    ideal para ferias, encuentros y actividades comunitarias.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Texto + features */}
          <div className="space-y-6">
            <div data-anim className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-black">
                Servicio Completo de Stand
              </h3>
              <p className="text-black/70 text-lg leading-relaxed">
                Nos encargamos de llevar la experiencia Universo Creativo a tu evento:
                instalación, exhibición y atención. Todo con una estética cuidada y productos
                que conectan con la gente.
              </p>
            </div>

            <ul className="space-y-4">
              {features.map((txt, i) => (
                <li
                  key={i}
                  data-bullet
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 h-6 w-6 rounded-full bg-amber-500/15 grid place-items-center border border-amber-600/20">
                    <Check className="w-4 h-4 text-amber-700" />
                  </span>
                  <span className="text-black/80 leading-relaxed">{txt}</span>
                </li>
              ))}
            </ul>

            {/*<div data-anim className="pt-2 flex flex-wrap gap-3">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 text-black font-bold shadow-sm hover:bg-amber-400 transition-colors"
              >
                Solicitar Stand
              </a>
              <a
                href="#eventos"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/70 border border-black/10 text-black/80 font-semibold hover:bg-white transition-colors"
              >
                Ver Próximos Eventos
              </a>
            </div>*/}

            {/* Caja final */}
            <div
              data-anim
              className="mt-6 rounded-2xl bg-white/70 border border-black/10 p-5 shadow-sm"
            >
              <p className="text-black/80 font-medium">
                <span className="text-amber-700 font-extrabold">
                  ¿Organizas un evento?
                </span>{" "}
                Escríbenos y coordinamos fechas, espacio y tipo de productos para tu comunidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
