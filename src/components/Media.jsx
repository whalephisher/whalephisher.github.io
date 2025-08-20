import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const videos = [
  {
    title: "HeadbandTrekker: Channel Trailer",
    url: "https://www.youtube.com/embed?listType=user_uploads&list=HeadbandTrekker",
    thumb: "/images/profile.png",
  },
  {
    title: "HeadbandTrekker: Recent Uploads",
    url: "https://www.youtube.com/embed?listType=user_uploads&list=HeadbandTrekker",
    thumb: "/images/whale.png",
  },
  {
    title: "HeadbandTrekker: Playlists",
    url: "https://www.youtube.com/embed?listType=user_playlists&list=HeadbandTrekker",
    thumb: "/images/whalephisher.png",
  },
];

const Media = () => {
  const [active, setActive] = useState(0);
  // Loop carousel every 6s
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % videos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="media"
      className="py-32 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white snap-start"
    >
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Media
      </motion.h2>
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8">
          <AnimatePresence mode="wait">
            <motion.iframe
              key={active}
              src={videos[active].url}
              title={videos[active].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.7 }}
            />
          </AnimatePresence>
        </div>
        <div className="flex gap-4 justify-center">
          {videos.map((vid, idx) => (
            <button
              key={vid.title}
              onClick={() => setActive(idx)}
              className={`rounded-xl overflow-hidden border-2 ${
                active === idx ? "border-indigo-500" : "border-transparent"
              } transition-all shadow-lg`}
              aria-label={vid.title}
            >
              <img
                src={vid.thumb}
                alt={vid.title}
                className="w-24 h-16 object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Media;
