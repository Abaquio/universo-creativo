// src/components/NuestroProceso.jsx
import { useLayoutEffect, useRef } from 'react'
import { Lightbulb, Pencil, Code2, Rocket } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  { n: '01', title: 'Descubrimiento', text: 'Entendemos tu visión, objetivos y audiencia para crear una estrategia sólida.', Icon: Lightbulb, side: 'right' },
  { n: '02', title: 'Diseño',         text: 'Creamos conceptos visuales innovadores que capturan la esencia de tu marca.', Icon: Pencil,     side: 'left'  },
  { n: '03', title: 'Desarrollo',     text: 'Transformamos el diseño en experiencias digitales funcionales y optimizadas.', Icon: Code2,     side: 'right' },
  { n: '04', title: 'Lanzamiento',    text: 'Implementamos y optimizamos para asegurar el máximo impacto y resultados.',   Icon: Rocket,    side: 'left'  },
]

export default function NuestroProceso() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      // Desktop y tablet
      mm.add('(min-width: 768px)', () => {
        gsap.utils.toArray('.np-row').forEach((row) => {
          const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
              trigger: row,
              start: 'top 75%',
              end: 'bottom 25%',
              // ▶️ Entra al bajar, ◀️ revierte suave al subir (sin reset brusco)
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            },
          })

          const content  = row.querySelector('.np-content')
          const chip     = row.querySelector('.np-chip')
          const numLeft  = row.querySelector('.np-num-left')
          const numRight = row.querySelector('.np-num-right')

          tl.from(content, { opacity: 0, y: 30, duration: 0.6 }, 0)
            .from(chip,    { opacity: 0, scale: 0.7, duration: 0.45 }, 0.05)
            .from([numLeft, numRight].filter(Boolean), { opacity: 0, y: 18, duration: 0.4 }, 0.1)

          // Parallax suave (valores moderados para que no maree)
          const parallax = (el, yPercent) => ({
            yPercent,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          })
          if (numLeft)  gsap.to(numLeft,  parallax(numLeft,  -14))
          if (numRight) gsap.to(numRight, parallax(numRight, -14))
          if (chip)     gsap.to(chip,     parallax(chip,       8))
          if (content)  gsap.to(content,  parallax(content,     6))
        })
      })

      // Mobile: animaciones más cortas y parallax muy leve (mejor performance)
      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray('.np-row').forEach((row) => {
          const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              end: 'bottom 30%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            },
          })

          const content  = row.querySelector('.np-content')
          const chip     = row.querySelector('.np-chip')

          tl.from(content, { opacity: 0, y: 20, duration: 0.45 }, 0)
            .from(chip,    { opacity: 0, scale: 0.8, duration: 0.35 }, 0.05)

          // Parallax muy sutil o casi nada
          gsap.to(chip, {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.2,
            },
          })
        })
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      // Limpia matchMedia
      // (gsap 3.12+: mm.revert(); para versiones previas no hace falta)
    }
  }, [])

  return (
    <section id="proceso" ref={sectionRef} className="relative bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-neutral-900">
          Nuestro <span className="text-amber-500">Proceso</span>
        </h2>
        <p className="mt-3 text-center text-neutral-500">
          Un enfoque estructurado que garantiza resultados excepcionales
        </p>

        <div className="relative mt-16 md:mt-20">
          {/* Línea vertical: centrada en desktop, alineada a ~40px en mobile para más aire */}
          <div
            className="
              pointer-events-none absolute inset-y-0
              left-10 w-[2px] bg-gradient-to-b from-amber-300/60 via-neutral-300 to-amber-300/60
              md:left-1/2 md:-translate-x-px
            "
          />

          <div className="space-y-20 sm:space-y-24">
            {steps.map(({ n, title, text, Icon, side }) => (
              <div key={n} className="np-row">
                {/* Mobile: una sola columna. Desktop: 3 columnas (izq/chip/der) */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_120px_1fr] items-start gap-8 md:gap-10">
                  {/* IZQ */}
                  <div>
                    {/* Desktop: contenido si side='right', número si side='left' */}
                    <div className="hidden md:block">
                      {side === 'right' ? (
                        <div className="np-content">
                          <h3 className="text-2xl font-semibold text-neutral-900">{title}</h3>
                          <p className="mt-3 text-neutral-600 max-w-prose">{text}</p>
                        </div>
                      ) : (
                        <div className="relative h-20 md:h-28 flex items-center justify-end pr-6">
                          <span className="np-num-left text-6xl lg:text-7xl xl:text-8xl font-extrabold text-amber-200/60 select-none">
                            {n}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Mobile: siempre contenido aquí (debajo de la línea y chip) */}
                    <div className="md:hidden np-content pl-16">
                      {/* pl-16 para dejar la línea/chip a la izquierda */}
                      <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
                      <p className="mt-2 text-neutral-600">{text}</p>
                    </div>
                  </div>

                  {/* CHIP */}
                  <div className="relative flex items-center md:justify-center">
                    <div className="np-chip relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-500 text-black shadow-xl ring-4 ring-amber-500/25 flex items-center justify-center">
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    {/* línea extra para mobile (columna izquierda) */}
                    <div className="absolute left-10 top-0 bottom-0 w-px bg-neutral-300 md:hidden" />
                  </div>

                  {/* DER */}
                  <div className="relative hidden md:block">
                    {side === 'right' ? (
                      <div className="relative h-20 md:h-28 flex items-center justify-start pl-6">
                        <span className="np-num-right text-6xl lg:text-7xl xl:text-8xl font-extrabold text-amber-200/60 select-none">
                          {n}
                        </span>
                      </div>
                    ) : (
                      <div className="np-content">
                        <h3 className="text-2xl font-semibold text-neutral-900">{title}</h3>
                        <p className="mt-3 text-neutral-600 max-w-prose">{text}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}