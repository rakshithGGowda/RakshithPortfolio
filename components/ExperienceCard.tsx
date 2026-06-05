import { motion } from "framer-motion";
import React from "react";
import { urlFor } from "../sanity";
import { Experience } from "../typings";

type Props = { experience: Experience };

export default function ExperienceCard({ experience }: Props) {
  return (
    <article className="flex flex-col rounded-3xl items-center space-y-0 flex-shrink-0 w-[320px] md:w-[600px] xl:w-[700px] snap-center p-6 md:p-8 cursor-pointer
      bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl
      hover:shadow-2xl hover:shadow-darkGreen/10 hover:border-darkGreen/20
      transition-all duration-500 hover:-translate-y-1
      group">

      {/* Company logo */}
      {experience?.companyImage ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="md:invisible xl:visible md:h-0 md:w-0 mb-3"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-darkGreen/20 to-lightGreen/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              className="relative w-28 h-28 rounded-full xl:w-[140px] xl:h-[140px] object-cover object-center border-2 border-white shadow-lg"
              src={typeof experience.companyImage === "string" ? experience.companyImage : urlFor(experience.companyImage).url()}
              alt=""
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="md:invisible xl:visible md:h-0 w-28 h-28 md:w-0 rounded-full xl:w-[140px] xl:h-[140px] mb-3 bg-gradient-to-br from-darkGreen/10 to-lightGreen/10 flex items-center justify-center border-2 border-darkGreen/10"
        >
          <span className="text-2xl xl:text-4xl font-bold gradient-text">
            {experience?.company?.charAt(0)}
          </span>
        </motion.div>
      )}

      <div className="w-full px-0 md:px-10">
        <div className="md:flex md:justify-between items-center">
          <div>
            <h4 className="text-lg md:text-2xl font-semibold text-darkBlack">
              {experience?.jobTitle}
            </h4>
            <p className="font-bold text-md md:text-xl mt-1 gradient-text">
              {experience?.company}
            </p>
            <div className="flex space-x-2 my-3">
              {experience?.technologies.map((technology, i) => (
                technology?.image ? (
                  <motion.img
                    key={technology._id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="h-10 w-10 rounded-full object-cover border border-gray-100 shadow-sm hover:shadow-md hover:scale-110 transition-all duration-200 bg-white p-0.5"
                    src={typeof technology.image === "string" ? technology.image : urlFor(technology.image).url()}
                    alt={technology.title}
                  />
                ) : (
                  <motion.div
                    key={technology._id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-darkGreen/10 to-lightGreen/10 flex items-center justify-center border border-darkGreen/10 hover:scale-110 transition-transform"
                  >
                    <span className="text-xs font-semibold text-darkGreen">
                      {technology?.title?.substring(0, 3)}
                    </span>
                  </motion.div>
                )
              ))}
            </div>
          </div>
          {experience?.companyImage ? (
            <div className="invisible md:visible xl:invisible xl:h-0 xl:w-0 h-0 w-0 md:h-24 md:w-24">
              <img
                className="rounded-full object-cover object-center border-2 border-white shadow-lg w-full h-full"
                src={typeof experience.companyImage === "string" ? experience.companyImage : urlFor(experience.companyImage).url()}
                alt=""
              />
            </div>
          ) : (
            <div className="invisible md:visible xl:invisible xl:h-0 xl:w-0 h-0 w-0 md:h-24 md:w-24 rounded-full bg-gradient-to-br from-darkGreen/10 to-lightGreen/10 flex items-center justify-center border border-darkGreen/10">
              <span className="text-2xl font-bold gradient-text">
                {experience?.company?.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 py-2 md:py-4">
          <div className="h-2 w-2 rounded-full bg-lightGreen animate-pulse" />
          <p className="uppercase text-gray-400 text-sm md:text-base font-light tracking-wider" suppressHydrationWarning>
            {new Date(experience?.dateStarted).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}{" "}
            —{" "}
            {experience.isCurrentlyWorkingHere
              ? "Present"
              : new Date(experience?.dateEnded).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
          </p>
        </div>
      </div>
      <ul className="px-0 md:px-10 list-none text-gray-600 space-y-3 pr-5 text-justify ml-0 text-sm md:text-base pl-5 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-darkGreen/30">
        {experience?.points.map((point, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-lightGreen flex-shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
