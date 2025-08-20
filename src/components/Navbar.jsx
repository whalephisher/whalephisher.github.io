import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "media", label: "Media" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleNav = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="fixed top-0 left-0 w-full z-50 bg-white/10 dark:bg-gray-900/60 backdrop-blur-xl shadow-xl border-b border-white/10 dark:border-gray-800/60 m-0 p-0"
      style={{
        WebkitBackdropFilter: "blur(16px)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-2">
        <motion.span
          className="text-2xl font-extrabold tracking-tight text-white cursor-pointer drop-shadow-lg"
          whileHover={{ scale: 1.08, rotate: -2 }}
          onClick={() => handleNav("hero")}
        >
          Gabriel Liau
        </motion.span>
        <div className="hidden md:flex gap-8">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="text-lg font-semibold text-white/90 hover:text-indigo-400 px-3 py-1 rounded transition relative overflow-hidden"
              whileHover={{ scale: 1.1, color: "#818cf8" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="relative z-10">{link.label}</span>
              <motion.span
                className="absolute left-0 bottom-0 w-full h-1 bg-indigo-400 rounded"
                layoutId="nav-underline"
                initial={{ opacity: 0, scaleX: 0 }}
                whileHover={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <span className="material-icons text-3xl">menu</span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden flex flex-col gap-4 px-8 pb-4 bg-gray-900/90"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-lg font-semibold text-white/90 hover:text-indigo-400 px-3 py-2 rounded transition"
                whileHover={{ scale: 1.08, color: "#818cf8" }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
