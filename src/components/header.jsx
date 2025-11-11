import { useEffect, useRef } from "react";
import BubbleMenu from "./BubbleMenu";
import { gsap } from "gsap";
import logo from "../assets/universo-creativo-logo.PNG";

/* Enlaces a secciones (asegúrate de que existan #home, #nosotros, #proceso, #eventos, #contacto) */
const navItems = [
  { label: "Inicio",    href: "#home",     ariaLabel: "Ir a Inicio",            rotation: -8, hoverStyles: { bgColor: "#3b82f6", textColor: "#fff" } },
  { label: "Nosotros",  href: "#nosotros", ariaLabel: "Ir a Nosotros",          rotation:  8, hoverStyles: { bgColor: "#10b981", textColor: "#fff" } },
  { label: "Proceso",   href: "#proceso",  ariaLabel: "Ir a Nuestro Proceso",   rotation:  8, hoverStyles: { bgColor: "#f59e0b", textColor: "#fff" } },
  { label: "Eventos",   href: "#eventos",  ariaLabel: "Ir a Próximos Eventos",  rotation:  8, hoverStyles: { bgColor: "#ef4444", textColor: "#fff" } },
  { label: "Contacto",  href: "#footer", ariaLabel: "Ir a Contacto",          rotation: -8, hoverStyles: { bgColor: "#8b5cf6", textColor: "#fff" } },
];

export default function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const logoEl = logoRef.current;
    if (!header || !logoEl) return;

    /* Scroll suave + cerrar menú si está abierto (delegación en el header) */
    const handleClick = (e) => {
      const link = e.target.closest("a");
      if (!link || !link.getAttribute("href")?.startsWith("#")) return;

      const hash = link.getAttribute("href");
      const id = hash.slice(1);
      const target = document.getElementById(id);
      e.preventDefault();

      if (target) {
        const offset = 80; // compensa la altura del header
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      const openBtn = header.querySelector(".menu-btn.open");
      if (openBtn) openBtn.click();
    };
    header.addEventListener("click", handleClick);

    /* Animaciones del logo con GSAP (robustas para build) */
    const ctx = gsap.context(() => {
      // giro automático cada ~6s
      gsap.to(logoEl, {
        rotate: "+=360",
        duration: 1.6,
        ease: "power2.inOut",
        repeat: -1,
        repeatDelay: 6,
      });

      // hover: giro más rápido
      const enter = () => gsap.to(logoEl, { rotate: "+=360", duration: 1, ease: "power2.out" });
      logoEl.addEventListener("mouseenter", enter);

      // click: volver al inicio
      const clickLogo = (ev) => { ev.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); };
      logoEl.addEventListener("click", clickLogo);

      return () => {
        logoEl.removeEventListener("mouseenter", enter);
        logoEl.removeEventListener("click", clickLogo);
      };
    }, header);

    return () => {
      header.removeEventListener("click", handleClick);
      ctx.revert();
    };
  }, []);

  return (
    <header ref={headerRef} className="relative z-50">
      <BubbleMenu
        logo={
          <img
            ref={logoRef}
            src={logo}
            alt="Universo Creativo"
            className="bubble-logo cursor-pointer select-none"
            style={{ transformOrigin: "center center" }}
          />
        }
        items={navItems}
        menuAriaLabel="Abrir navegación"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
    </header>
  );
}