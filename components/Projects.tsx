import { motion } from "framer-motion";
import React from "react";
import { urlFor } from "../sanity";
import { Project } from "../typings";

type Props = { projects: Project[] };

export default function Projects({ projects }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-20 md:top-24 section-heading">
        Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-darkGreen/40">
        {projects?.map((project, i) => (
          <div
            key={project._id}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-10 md:p-44 h-screen"
          >
            {project?.image ? (
              <motion.img
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="h-28 xl:h-80 md:h-72 object-contain drop-shadow-2xl"
                src={urlFor(project?.image).url()}
                alt=""
              />
            ) : (
              <motion.div
                initial={{ y: -80, opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring" }}
                viewport={{ once: true }}
                className="h-28 xl:h-48 md:h-40 w-full max-w-sm
                  bg-white/60 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl
                  flex items-center justify-center"
              >
                <span className="text-3xl md:text-5xl">
                  {["🧠", "🚗", "🛰️", "👶", "🛒"][i] || "🚀"}
                </span>
              </motion.div>
            )}

            <div className="space-y-5 md:space-y-8 px-0 md:px-10 max-w-5xl">
              <h4 className="text-lg md:text-2xl lg:text-3xl font-semibold text-center">
                <span className="gradient-text">
                  Project {i + 1}:
                </span>{" "}
                {project?.title}
              </h4>
              <div className="flex items-center space-x-3 justify-center">
                {project?.technologies.map((technology, j) => (
                  technology?.image ? (
                    <motion.img
                      key={technology._id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.1 }}
                      className="h-10 w-10 rounded-full object-cover bg-white p-1 border border-gray-100 shadow-md
                        hover:scale-110 hover:shadow-lg transition-all duration-200"
                      src={typeof technology.image === "string" ? technology.image : urlFor(technology.image).url()}
                      alt={technology.title}
                    />
                  ) : (
                    <motion.div
                      key={technology._id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.1 }}
                      className="h-10 w-10 rounded-full bg-white/80 border border-gray-100 shadow-md flex items-center justify-center
                        hover:scale-110 transition-transform"
                    >
                      <span className="text-xs font-semibold text-darkGreen">
                        {technology?.title?.substring(0, 3)}
                      </span>
                    </motion.div>
                  )
                ))}
              </div>

              <p className="text-sm md:text-base lg:text-lg text-justify text-gray-600 leading-relaxed">
                {project?.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Background decorative element */}
      <div className="w-full absolute top-[20%] md:top-[30%] left-0 h-[500px] -skew-y-12
        bg-gradient-to-r from-darkGreen/5 via-lightGreen/10 to-darkGreen/5" />
    </motion.div>
  );
}
