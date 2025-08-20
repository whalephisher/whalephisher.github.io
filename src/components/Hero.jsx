import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Hero = () => {
  const bgRef = useRef(null);
  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundPosition: "100% 50%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={bgRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-indigo-900 via-gray-900 to-gray-800 text-white snap-start"
      style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 50%" }}
    >
      {/* Animated floating shapes */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500 bg-opacity-30 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "loop" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-400 bg-opacity-20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "loop" }}
        />
      </motion.div>

      {/* Animated intro */}
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Gabriel Liau
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl font-light mb-8 drop-shadow"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Creative Developer & Designer
      </motion.p>
      <motion.button
        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-lg font-semibold transition shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        onClick={() =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        View My Work
      </motion.button>
    </section>
  );
};

export default Hero;
