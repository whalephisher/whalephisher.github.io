import React from "react";
import { motion } from "framer-motion";

const links = [
  {
    label: "GitHub",
    url: "https://github.com/whalephisher",
    icon: "github",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/gabrielliau",
    icon: "linkedin",
  },
  {
    label: "Email",
    url: "mailto:gabriel.liau@gmail.com",
    icon: "email",
  },
  {
    label: "YouTube",
    url: "https://youtube.com/@whalephisher",
    icon: "youtube",
  },
];

const iconMap = {
  github: <span className="material-icons">code</span>,
  linkedin: <span className="material-icons">business_center</span>,
  email: <span className="material-icons">email</span>,
  youtube: <span className="material-icons">ondemand_video</span>,
};

const Contact = () => {
  return (
    <footer
      id="contact"
      className="w-full flex justify-center items-center py-6 bg-transparent text-gray-700"
      style={{
        borderTop: "1px solid rgba(120,120,120,0.08)",
        marginTop: "auto",
      }}
    >
      <motion.div
        className="flex gap-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {links.map((link, idx) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-200 rounded-full p-4 shadow-lg hover:bg-indigo-500 hover:text-white transition text-indigo-700 text-2xl flex items-center justify-center border border-indigo-300"
            whileHover={{ scale: 1.15, rotate: -5 + idx * 3 }}
            whileTap={{ scale: 0.95 }}
            title={link.label}
          >
            {iconMap[link.icon]}
          </motion.a>
        ))}
      </motion.div>
    </footer>
  );
};

export default Contact;
