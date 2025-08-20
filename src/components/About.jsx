import React from "react";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "2012-2014",
    title: "Singapore Army",
    description:
      "Served as a Signals Specialist, leading teams and managing mission-critical communications. Developed discipline, leadership, and resilience.",
    icon: "military_tech",
  },
  {
    year: "2015-2019",
    title: "NUS | Computer Science",
    description:
      "Studied computer science at the National University of Singapore. Built a strong foundation in software engineering, data, and creative coding.",
    icon: "school",
  },
  {
    year: "2019-2022",
    title: "Data Engineer | Tech Industry",
    description:
      "Worked as a data engineer, building scalable pipelines and analytics for global companies. Specialized in cloud, automation, and creative data solutions.",
    icon: "data_object",
  },
  {
    year: "2023-Present",
    title: "Creative Developer & Designer",
    description:
      "Blending code, design, and animation to craft award-worthy digital experiences. Always learning, always building.",
    icon: "brush",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="py-32 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white snap-start"
    >
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </motion.h2>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Timeline */}
        <div className="flex-1 relative">
          <div className="absolute left-4 top-0 h-full w-1 bg-gradient-to-b from-indigo-400 to-pink-400 rounded-full opacity-40" />
          <ul className="space-y-12 pl-12">
            {timeline.map((item, idx) => (
              <motion.li
                key={item.year}
                className="relative"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.7 }}
              >
                <div className="absolute -left-8 top-0 bg-white dark:bg-gray-900 rounded-full shadow-lg p-2 border-2 border-indigo-400">
                  <span className="material-icons text-indigo-500 text-2xl">
                    {item.icon}
                  </span>
                </div>
                <div className="bg-indigo-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <div className="text-sm text-indigo-400 font-bold mb-1">
                    {item.year}
                  </div>
                  <div className="text-xl font-semibold mb-2">{item.title}</div>
                  <div className="text-base text-gray-700 dark:text-gray-200">
                    {item.description}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
        {/* Bio Card */}
        <motion.div
          className="flex-1 bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl p-10 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <img
            src="/images/profile.png"
            alt="Gabriel Liau"
            className="w-32 h-32 rounded-full mb-6 border-4 border-indigo-400 shadow-lg object-cover bg-gray-200 dark:bg-gray-700"
            onError={(e) => (e.target.style.display = "none")}
          />
          <div className="text-2xl font-bold mb-2">Gabriel Liau</div>
          <div className="text-indigo-500 font-semibold mb-4">
            Creative Developer & Designer
          </div>
          <div className="text-base text-gray-700 dark:text-gray-200 text-center">
            I blend code, design, and animation to build digital experiences
            that stand out. My journey from the Army to tech and creative
            development has shaped my unique approach to problem-solving and
            storytelling.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
