import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { login, saveToken, getCurrentUser } from "../services/authService";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiLoader,
} from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = await login(username, password);
      saveToken(token);
      setSuccess(true);

      setTimeout(async () => {
        try {
          const user = await getCurrentUser();
          if (user) {
            navigate("/dashboard");
          } else {
            throw new Error("Token inválido");
          }
        } catch (err) {
          setError("Token inválido. Vuelve a iniciar sesión.");
          setIsLoading(false);
          setSuccess(false);
        }
      }, 1000);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(err.message || "Credenciales incorrectas. Inténtalo de nuevo.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden relative p-4">
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white bg-opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * (isMobile ? 5 : 10) + 3,
              height: Math.random() * (isMobile ? 5 : 10) + 3,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {success ? (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="z-10 text-center p-6 sm:p-8 bg-white bg-opacity-30 backdrop-blur-md rounded-3xl shadow-2xl mx-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "backOut" }}
              className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mb-4 sm:mb-6"
            >
              <svg
                className="w-10 h-10 sm:w-16 sm:h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              ¡Bienvenido!
            </h2>
            <p className="text-white text-opacity-90 mb-4 sm:mb-6 text-sm sm:text-base">
              Redirigiendo a tu dashboard...
            </p>
            <div className="w-full bg-white bg-opacity-40 h-1.5 sm:h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "linear" }}
                className="h-full bg-white"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="z-10 w-full max-w-md"
          >
            <div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden mx-2">
              <motion.div
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                className="h-1.5 sm:h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-[length:300%_100%]"
              />

              <div className="p-6 sm:p-8">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-6 sm:mb-8"
                >
                  <div className="mx-auto w-14 h-14 sm:w-20 sm:h-20 bg-white bg-opacity-20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                    <FiUser className="text-white text-2xl sm:text-3xl" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Iniciar Sesión
                  </h2>
                  <p className="text-white text-opacity-90 mt-1 sm:mt-2 text-sm sm:text-base">
                    Accede a tu cuenta para continuar
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit}>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4 sm:mb-6"
                  >
                    <label className="block text-sm font-medium text-white text-opacity-90 mb-1 sm:mb-2">
                      Usuario
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-white text-opacity-70" />
                      </div>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-200 text-sm sm:text-base"
                        placeholder="Ingresa tu usuario"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6 sm:mb-8"
                  >
                    <label className="block text-sm font-medium text-white text-opacity-90 mb-1 sm:mb-2">
                      Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-white text-opacity-70" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all duration-200 text-sm sm:text-base"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FiEyeOff className="text-white text-opacity-70 hover:text-opacity-100 transition text-sm sm:text-base" />
                        ) : (
                          <FiEye className="text-white text-opacity-70 hover:text-opacity-100 transition text-sm sm:text-base" />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 sm:mb-6 overflow-hidden"
                      >
                        <div className="bg-red-500 bg-opacity-20 text-red-100 px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-red-500 border-opacity-30 text-xs sm:text-sm">
                          {error}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium text-white flex items-center justify-center space-x-2 transition-all duration-300 ${
                        isLoading
                          ? "bg-indigo-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                      } text-sm sm:text-base`}
                    >
                      {isLoading ? (
                        <>
                          <FiLoader className="animate-spin" />
                          <span>Procesando...</span>
                        </>
                      ) : (
                        <span>Ingresar</span>
                      )}
                    </button>
                  </motion.div>
                </form>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 sm:mt-6 text-center"
                >
                  <a
                    href="#forgot-password"
                    className="text-white text-opacity-80 hover:text-opacity-100 text-xs sm:text-sm transition"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 sm:mt-6 text-center"
            >
              <p className="text-white text-opacity-80 text-xs sm:text-sm">
                ¿No tienes una cuenta?{" "}
                <a
                  href="#register"
                  className="text-white font-medium hover:underline"
                >
                  Regístrate
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
