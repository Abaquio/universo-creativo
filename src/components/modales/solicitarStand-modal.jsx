// src/components/modales/solicitarStand-modal.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, MessageCircle, Mail } from "lucide-react";

export default function SolicitarStandModal({ open, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, ease: "power2.out" }
      );

      gsap.fromTo(
        modalRef.current,
        { y: 30, scale: 0.96, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.35,
          ease: "power3.out",
        }
      );
    });

    return () => ctx.revert();
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-black/10 px-6 py-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
              Stand para eventos
            </span>
            <h3 className="mt-1 text-xl font-extrabold text-black">
              ¿Cómo quieres contactarnos?
            </h3>
            <p className="mt-2 text-sm text-black/60">
              Elige la opción que te resulte más cómoda. Te responderemos a la brevedad.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-black/50 hover:bg-black/5 hover:text-black"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/message/R4CMEK5WNUOXC1?autoload=1"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"
            >
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500/15">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>

                <h4 className="text-base font-bold text-black">
                  Hablar por WhatsApp
                </h4>
                <p className="mt-1 text-sm text-black/60">
                  Ideal para coordinar rápido disponibilidad y valores.
                </p>
              </div>

              <span className="mt-4 inline-block text-sm font-semibold text-green-600">
                Abrir WhatsApp →
              </span>
            </a>

            {/* Correo */}
            <a
              href="mailto:contacto.universocreativospa@gmail.com"
              className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"
            >
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15">
                  <Mail className="h-5 w-5 text-amber-600" />
                </div>

                <h4 className="text-base font-bold text-black">
                  Escribir por correo
                </h4>
                <p className="mt-1 text-sm text-black/60">
                  Recomendado si necesitas enviar información más detallada.
                </p>
              </div>

              <span className="mt-4 inline-block text-sm font-semibold text-amber-600">
                Redactar correo →
              </span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="rounded-b-3xl border-t border-black/10 bg-black/[0.02] px-6 py-4">
          <p className="text-xs text-black/50">
            Universo Creativo · Viña del Mar 
          </p>
        </div>
      </div>
    </div>
  );
}
