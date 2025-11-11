// src/components/Header.jsx
import { useEffect, useRef } from "react";
import BubbleMenu from "./BubbleMenu";
import { gsap } from "gsap";
import logo from "../assets/universo-creativo-logo.PNG"; // tu logo

const navItems = [
  {
    label: "Inicio",
    href: "#home",
    ariaLabel: "Ir a Inicio",
    rotation: -8,
    hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
  },
  {
    label: "Nosotros",
    href: "#nosotros",
    ariaLabel: "Ir a Nosotros",
    rotation: 8,
    hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
  },
  {
    label: "Proceso",
    href: "#proceso",
    ariaLabel: "Ir a Nuestro Proceso",
    rotation: 8,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
  },
  {
    label: "Eventos",
    href: "#eventos",
    ariaLabel: "Ir a Próximos Eventos",
    rotation: 8,
    hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
  },
  {
    label: "Contacto",
    href: "#contacto",
    ariaLabel: "Ir a Contacto",
    rotation: -8,
    hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
  },
];

export default function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    if (!header || !logo) return;

    // Scroll suave + cierre de menú
    const handleClick = (e) => {
      const link = e.target.closest("a");
      if (!link || !link.getAttribute("href")?.startsWith("#")) return;

      const hash = link.getAttribute("href");
      const id = hash.slice(1);
      const target = document.getElementById(id);
      e.preventDefault();

      if (target) {
        const offset = 80; // compensar header
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      const openBtn = header.querySelector(".menu-btn.open");
      if (openBtn) openBtn.click();
    };
    header.addEventListener("click", handleClick);

    // Rotación automática cada 6 s
    const rotateLoop = gsap.timeline({ repeat: -1, repeatDelay: 6 });
    rotateLoop.to(logo, {
      rotateY: 360,
      duration: 2,
      ease: "power2.inOut",
    });

    // Hover → rotación más rápida
    const handleHover = () => {
      gsap.to(logo, { rotateY: "+=360", duration: 1, ease: "power2.out" });
    };
    logo.addEventListener("mouseenter", handleHover);

    // Click → volver al home
    const handleLogoClick = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    logo.addEventListener("click", handleLogoClick);

    return () => {
      header.removeEventListener("click", handleClick);
      logo.removeEventListener("mouseenter", handleHover);
      logo.removeEventListener("click", handleLogoClick);
      rotateLoop.kill();
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
            className="h-8 w-8 object-contain cursor-pointer select-none"
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