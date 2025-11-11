// src/components/Footer.jsx
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import logo from "../assets/universo-creativo-logo.PNG"; // logo amarillo

export default function Footer() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ft-col, .ft-map-col",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            toggleActions: "restart none none reverse"
          }
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="relative text-amber-100" style={{ backgroundColor: "#1e1c17" }} id="footer">
      {/* glow sutil */}
      <div
        className="pointer-events-none absolute -z-10 left-1/2 -translate-x-1/2 bottom-20 w-[900px] h-[900px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(40% 40% at 50% 50%, rgba(251,191,36,.22) 0%, rgba(251,191,36,.06) 50%, rgba(0,0,0,0) 80%)"
        }}
      />

      {/* columnas */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
        {/* 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Columna 1: Marca */}
          <div className="ft-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-amber-400 grid place-items-center shadow-md">
                <img
                  src={logo}
                  alt="Universo Creativo"
                  className="h-8 w-8 object-contain"
                  title="Universo Creativo"
                />
              </div>
              <span className="text-lg font-semibold tracking-wide">Universo Creativo</span>
            </div>

            <p className="text-amber-100/80 leading-relaxed max-w-sm">
              Papelería artesanal y diseño con alma. Creando experiencias visuales únicas,
              hechas a mano y con amor al detalle.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <a
                href="#"
                aria-label="Instagram"
                className="h-9 w-9 rounded-full border border-amber-300/30 bg-[#2a2721] text-amber-200 hover:border-amber-400 hover:text-amber-300 transition-colors grid place-items-center"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="h-9 w-9 rounded-full border border-amber-300/30 bg-[#2a2721] text-amber-200 hover:border-amber-400 hover:text-amber-300 transition-colors grid place-items-center"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="h-9 w-9 rounded-full border border-amber-300/30 bg-[#2a2721] text-amber-200 hover:border-amber-400 hover:text-amber-300 transition-colors grid place-items-center"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="ft-col">
            <h5 className="text-amber-200 uppercase tracking-wider text-xs font-semibold mb-4">
              Navegación
            </h5>
            <ul className="space-y-3 text-amber-100/85">
              <li><a className="hover:text-amber-300 transition-colors" href="#home">Inicio</a></li>
              <li><a className="hover:text-amber-300 transition-colors" href="#nosotros">Nosotros</a></li>
              <li><a className="hover:text-amber-300 transition-colors" href="#proceso">Nuestro Proceso</a></li>
              <li><a className="hover:text-amber-300 transition-colors" href="#eventos">Próximos Eventos</a></li>
              <li><a className="hover:text-amber-300 transition-colors" href="#contacto">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="ft-col">
            <h5 className="text-amber-200 uppercase tracking-wider text-xs font-semibold mb-4">
              Contacto
            </h5>
            <ul className="space-y-3 text-amber-100/85">

              <li className="flex items-start gap-3">
                <Phone size={18} className="text-amber-400 mt-0.5" />
                <span>+56 9 1234 5678</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-amber-400 mt-0.5" />
                <span>hola@universocreativo.cl</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Mapa (independiente) */}
          <div className="ft-map-col">
            <h5 className="text-amber-200 uppercase tracking-wider text-xs font-semibold mb-4">
              Ubicación
            </h5>
            <li className="flex items-start gap-3 ">
                <MapPin size={18} className="text-amber-400 mt-0.5" />
                <span>Viña del Mar, Chile</span>
            </li>
            <div className="rounded-xl overflow-hidden border border-amber-200/15 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <iframe
                title="Mapa Viña del Mar, Chile"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                width="100%"
                height="140"
                style={{ border: 0, display: "block" }}
                src={
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10636.868784998095!2d-71.5606!3d-33.0245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de734f7f5a0f%3A0xa6d2e8a7f4c2d5b3!2sVi%C3%B1a%20del%20Mar%2C%20Valpara%C3%ADso%2C%20Chile!5e0!3m2!1ses-419!2scl!4v1700000000000"
                }
                allowFullScreen
              />
            </div>
            <a
              href="https://maps.google.com/?q=Vi%C3%B1a+del+Mar%2C+Chile"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-amber-300/90 hover:text-amber-300 text-sm"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Separador */}
      <div className="border-t border-amber-200/20" />

      {/* Barra inferior */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-amber-100/70 text-sm">
          © {new Date().getFullYear()} Universo Creativo. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4 text-amber-100/70 text-sm">
          <a href="#" className="hover:text-amber-300 transition-colors">Privacidad</a>
          <span className="opacity-30">•</span>
          <a href="#" className="hover:text-amber-300 transition-colors">Términos</a>
          <span className="opacity-30">•</span>
          <a href="#contacto" className="hover:text-amber-300 transition-colors">Soporte</a>
        </div>
      </div>
    </footer>
  );
}