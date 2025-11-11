// src/pages/home.jsx
import Header from '../components/header'
import GridMotion from '../components/GridMotion'
import ProximosEventos from '../components/ProximosEventos'
import NuestroProceso from '../components/NuestroProceso'
import Nosotros from '../components/Nosotros'
import Footer from '../components/Footer'

// Fondo (tus imágenes)
import fotoBaby from '../assets/foto-baby.png'
import fotoCuaderno from '../assets/foto-cuaderno.png'
import fotoGrupos from '../assets/foto-grupos.png'
import fotoRegalo from '../assets/foto-regalo.png'

// Logo
import logo from '../assets/universo-creativo-logo.PNG'



export default function Home() {
  // Rellena las 28 celdas del grid repitiendo tus 4 imágenes
  const imageSet = [fotoBaby, fotoCuaderno, fotoGrupos, fotoRegalo]
  const items = Array.from({ length: 28 }, (_, i) => imageSet[i % imageSet.length])

  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridMotion items={items} gradientColor="rgba(0,0,0,0.05)" />
      </div>
      

      {/* Menú */}
      <div className="relative z-50">
        <Header />
      </div>

      {/* HERO: logo centrado con aura y placa difuminada */}
      <section id="home" className="relative z-10 flex items-center justify-center h-screen">
        <div className="relative flex items-center justify-center">
          {/* Aura animada (amber) */}
          <div
            className="absolute -z-10 rounded-full blur-3xl opacity-60 pulse-slow"
            style={{
              width: 560,
              height: 560,
              background:
                'radial-gradient(35% 35% at 50% 50%, rgba(251,191,36,.50) 0%, rgba(251,191,36,.15) 35%, rgba(255,255,255,0) 70%)',
            }}
          />
          {/* Placa translúcida con blur */}
          <div className="absolute rounded-full w-[420px] h-[420px] bg-white/75 backdrop-blur-xl ring-2 ring-amber-400/30 shadow-2xl" />
          {/* Logo */}
          <img
            src={logo}
            alt="Universo Creativo"
            className="relative w-[360px] sm:w-[440px] md:w-[520px] opacity-95 float"
          />
        </div>
      </section>

      {/* Sección: Nuestro Proceso */}
      <NuestroProceso />
      {/* Sección: nosotros */}
      <Nosotros />
      {/* Sección: Proximos eventos */}
      <ProximosEventos/>

      <Footer/>
    </div>
  )
}