import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import heroImg from "../assets/llantalogoinicio.jpg";
import logo from "../assets/logonuevosinfondo.png";

function HomeHero() {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Genera partículas una vez, no en cada render
  const particles = Array.from({ length: 30 }, (_, i) => ({
    key: i,
    size: Math.random() * 5 + 2,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    opacity: Math.random() * 0.3 + 0.1,
    moveX: (Math.random() - 0.5) * 100,
    moveY: (Math.random() - 0.5) * 100,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden h-screen">
      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {particles.map((p) => (
          <motion.div
            key={p.key}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              x: p.x,
              y: p.y,
              opacity: p.opacity,
            }}
            animate={{
              x: [null, p.moveX],
              y: [null, p.moveY],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Brillo dinámico */}
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] bg-[size:200%_200%]"
      />

      {/* Imagen con parallax */}
      <motion.div
        style={{ y: yPos }}
        className="absolute right-0 top-0 h-full w-1/2 hidden lg:block z-10"
      >
        <div className="relative h-full w-full overflow-hidden">
          <motion.img
            src={heroImg}
            alt="Imagen de llantas"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-800/90 to-blue-900 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_center,_transparent_0%,_rgba(17,90,200,0.7)_70%)] z-20" />
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 h-full flex items-center justify-start relative z-30">
        <div className="lg:w-1/2 text-left">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 tracking-tighter"
                style={{ textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
              >
                Bienvenido a:
              </motion.h1>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 6, delay: 0.6 }}
                className="mb-8"
              >
                <motion.img
                  src={logo}
                  alt="Logo LINHSLLANTAS"
                  className="h-20 md:h-28 lg:h-32 drop-shadow-2xl"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                />
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-blue-100 font-light mb-10 leading-relaxed max-w-xl"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Te ofrecemos una amplia gama de llantas y productos
                especializados para el mantenimiento de tu vehículo. Calidad,
                seguridad y servicio garantizados.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Link to="/productos" className="relative group">
                  <motion.div
                    className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="z-10 relative text-sm sm:text-base">
                      Explorar Productos
                    </span>
                    <FaArrowRight className="ml-2 z-10 relative text-base sm:text-lg" />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  </motion.div>
                </Link>

                <Link to="/contacto" className="relative group">
                  <motion.div
                    className="inline-flex items-center border-2 border-white/30 hover:border-white/60 text-white font-bold py-2.5 px-6 rounded-full shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="z-10 relative text-sm sm:text-base">
                      Contacto
                    </span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 text-center"
      >
        <div className="animate-bounce text-blue-200 flex flex-col items-center">
          <span className="text-sm mb-1">Desplázate</span>
          <FaChevronDown className="text-xl" />
        </div>
      </motion.div>
    </section>
  );
}

export default HomeHero;
