import React, { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, MapPin } from "lucide-react"

import feria1 from "../assets/feria1.jpg"
import feria2 from "../assets/feria2.jpg"
import feria3 from "../assets/feria3.jpg"

export default function ProximosEventos() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animación de aparición suave
      gsap.fromTo(
        ".event-card",
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "restart none none reverse",
          },
        }
      )

      // Parallax sutil del fondo de las imágenes
      gsap.utils.toArray(".event-img").forEach((img) => {
        gsap.to(img, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const eventos = [
    {
      titulo: "Feria de Diseño Artesanal",
      fecha: "15–17 Marzo 2025",
      lugar: "Centro de Convenciones",
      img: feria1,
    },
    {
      titulo: "Mercado Creativo de Primavera",
      fecha: "20–22 Abril 2025",
      lugar: "Plaza Central",
      img: feria2,
    },
    {
      titulo: "Festival de Arte y Papel",
      fecha: "10–12 Mayo 2025",
      lugar: "Parque Cultural",
      img: feria3,
    },
  ]

  return (
    <section
      id="eventos"
      ref={sectionRef}
      className="relative py-24 sm:py-28 overflow-hidden"
      style={{ backgroundColor: "#808080" }} // fondo más oscuro
    >
      {/* Glow decorativo */}
      <div
        className="pointer-events-none absolute -z-10 left-1/2 top-20 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(40% 40% at 50% 50%, rgba(251,191,36,.25) 0%, rgba(251,191,36,.05) 50%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Encabezado */}
      <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center mb-14">
        <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-amber-200/20 text-amber-300 text-sm font-semibold">
          Próximos Eventos
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 leading-tight">
          Encuéntranos en <span className="text-amber-400">Ferias</span>
        </h2>
        <p className="text-amber-100/80 max-w-2xl mx-auto text-lg">
          Visita nuestro stand y descubre nuestras creaciones en persona.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventos.map((evento, index) => (
          <div
            key={index}
            className="event-card bg-[#2a2721] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-200/20 flex flex-col"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={evento.img}
                alt={evento.titulo}
                className="event-img w-full h-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-amber-50 mb-3">
                {evento.titulo}
              </h3>
              <div className="flex items-center text-sm text-amber-100/80 mb-2">
                <Calendar size={16} className="mr-2 text-amber-400" />
                {evento.fecha}
              </div>
              <div className="flex items-center text-sm text-amber-100/80">
                <MapPin size={16} className="mr-2 text-amber-400" />
                {evento.lugar}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}