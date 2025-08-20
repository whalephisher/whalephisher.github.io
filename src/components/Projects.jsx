import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Animated Portfolio",
    description:
      "Award-winning React portfolio with Framer Motion, GSAP, and creative visuals.",
    github: "https://github.com/whalephisher/whalephisher.github.io",
    demo: "https://whalephisher.github.io/",
    youtube: "https://youtu.be/your-demo-video",
    image: "/images/profile.png",
  },
  {
    title: "Data Pipeline Automation",
    description:
      "Cloud-native data engineering pipelines for analytics and automation.",
    github: "https://github.com/whalephisher/data-pipeline",
    demo: "https://datapipeline.example.com/",
    youtube: "https://youtu.be/your-data-pipeline-demo",
    image: "/images/whale.png",
  },
  {
    title: "Creative Coding Experiments",
    description:
      "Generative art, interactive visuals, and creative code explorations.",
    github: "https://github.com/whalephisher/creative-coding",
    demo: "https://creativecoding.example.com/",
    youtube: "https://youtu.be/your-creative-coding-demo",
    image: "/images/whalephisher.png",
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 60 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 },
  },
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-32 px-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white snap-start"
    >
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Projects
      </motion.h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            className="group bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col hover:scale-[1.03] hover:shadow-indigo-300/30 transition-transform duration-300 relative"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">
                {project.title}
              </div>
              <div className="text-base text-gray-700 dark:text-gray-200 mb-4 flex-1">
                {project.description}
              </div>
              <div className="flex gap-4 mt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-500 transition"
                  title="GitHub"
                >
                  <span className="material-icons text-2xl">code</span>
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-500 transition"
                  title="Live Demo"
                >
                  <span className="material-icons text-2xl">open_in_new</span>
                </a>
                <a
                  href={project.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-500 transition"
                  title="YouTube"
                >
                  <span className="material-icons text-2xl">
                    ondemand_video
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
