import React, { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CardSwap, { Card } from "./CardSwap"

import fotoBaby from "../assets/foto-baby.png"
import fotoCuaderno from "../assets/foto-cuaderno.png"
import fotoGrupos from "../assets/foto-grupos.png"
import fotoRegalo from "../assets/foto-regalo.png"

export default function Nosotros() {
  const sectionRef = useRef(null)
  const count1Ref = useRef(null)
  const count2Ref = useRef(null)
  const count3Ref = useRef(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animación del texto
      gsap.fromTo(
        ".nos-content",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "restart none none reverse",
          },
        }
      )

      // Animación del CardSwap
      gsap.fromTo(
        ".nos-cards",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "restart none none reverse",
          },
        }
      )

      // CountUp animación
      const animateCount = (el, to, suffix = "", dur = 1.6) => {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: to,
          duration: dur,
          ease: "power2.out",
          onUpdate: () => {
            const v = Math.round(obj.val)
            el.textContent = `${v}${suffix}`
          },
        })
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          animateCount(count1Ref.current, 500, "+")
          animateCount(count2Ref.current, 15, "+")
          animateCount(count3Ref.current, 100, "%")
        },
        onEnterBack: () => {
          animateCount(count1Ref.current, 500, "+")
          animateCount(count2Ref.current, 15, "+")
          animateCount(count3Ref.current, 100, "%")
        },
        onLeaveBack: () => {
          count1Ref.current.textContent = "0+"
          count2Ref.current.textContent = "0+"
          count3Ref.current.textContent = "0%"
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="relative bg-amber-50 py-24 sm:py-28 overflow-hidden"
    >
      {/* Glow decorativo */}
      <div
        className="pointer-events-none absolute -z-10 left-1/2 top-20 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(40% 40% at 50% 50%, rgba(251,191,36,.28) 0%, rgba(251,191,36,.10) 40%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* Contenedor adaptable */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 flex flex-col-reverse lg:grid lg:grid-cols-2 lg:items-center gap-12">
        {/* IZQUIERDA (texto) */}
        <div className="nos-content flex flex-col justify-center">
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-amber-100 text-amber-900 text-sm font-semibold">
            Nuestra Historia
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 mb-6 leading-tight">
            Creando experiencias<br />
            <span className="text-amber-500">desde el corazón</span>
          </h2>

          <p className="text-neutral-700 leading-relaxed mb-4">
            En <strong>Universo Creativo</strong>, cada producto es una obra de arte única.
            Combinamos técnicas artesanales tradicionales con diseños contemporáneos
            para crear piezas que inspiran y emocionan.
          </p>

          <p className="text-neutral-700 leading-relaxed mb-4">
            Nuestra pasión por la papelería nace del amor por los detalles,
            la textura del papel de calidad y la satisfacción de crear algo
            verdaderamente especial con nuestras manos.
          </p>

          <p className="text-neutral-700 leading-relaxed mb-10">
            Desde libretas personalizadas hasta cajas de regalo únicas,
            cada creación lleva nuestra firma de calidad y dedicación.
          </p>

          {/* Contadores */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p
                ref={count1Ref}
                className="text-3xl sm:text-4xl font-extrabold text-amber-500"
              >
                0+
              </p>
              <p className="text-sm text-neutral-600 mt-1">Productos Creados</p>
            </div>
            <div className="text-center">
              <p
                ref={count2Ref}
                className="text-3xl sm:text-4xl font-extrabold text-amber-500"
              >
                0+
              </p>
              <p className="text-sm text-neutral-600 mt-1">Ferias Asistidas</p>
            </div>
            <div className="text-center">
              <p
                ref={count3Ref}
                className="text-3xl sm:text-4xl font-extrabold text-amber-500"
              >
                0%
              </p>
              <p className="text-sm text-neutral-600 mt-1">Artesanal</p>
            </div>
          </div>
        </div>

        {/* DERECHA (cards) */}
        <div className="nos-cards flex justify-center lg:justify-end lg:items-center min-h-[400px] sm:min-h-[480px]">
          <div className="relative">
            <CardSwap
              width={360}
              height={280}
              cardDistance={70}
              verticalDistance={78}
              delay={4200}
              pauseOnHover={true}
              easing="elastic"
            >
              <Card className="bg-white overflow-hidden shadow-xl border border-amber-100">
                <img src={fotoBaby} alt="Productos Baby" className="w-full h-full object-cover" />
              </Card>
              <Card className="bg-white overflow-hidden shadow-xl border border-amber-100">
                <img src={fotoCuaderno} alt="Cuadernos personalizados" className="w-full h-full object-cover" />
              </Card>
              <Card className="bg-white overflow-hidden shadow-xl border border-amber-100">
                <img src={fotoGrupos} alt="Proyectos en grupo" className="w-full h-full object-cover" />
              </Card>
              <Card className="bg-white overflow-hidden shadow-xl border border-amber-100">
                <img src={fotoRegalo} alt="Empaques de regalo" className="w-full h-full object-cover" />
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  )
}