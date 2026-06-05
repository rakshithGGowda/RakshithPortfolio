import React from "react";
import { motion } from "framer-motion";
import { Skill as mySkill } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  skill: mySkill;
  directionLeft?: boolean;
};

export default function Skill({ skill, directionLeft }: Props) {
  return (
    <div className="group relative flex cursor-pointer" title={skill?.title}>
      <div className="relative">
        {/* Glow ring on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-darkGreen to-lightGreen rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500" />

        {skill?.image ? (
          <motion.img
            initial={{ x: directionLeft ? -60 : 60, opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-full border-2 border-darkGreen/20 object-cover p-1.5 bg-white
              w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28
              filter group-hover:grayscale transition-all duration-500 ease-out
              group-hover:border-darkGreen/60 group-hover:shadow-xl group-hover:shadow-darkGreen/10 group-hover:scale-105"
            src={typeof skill.image === "string" ? skill.image : urlFor(skill.image).url()}
            alt={skill?.title}
          />
        ) : (
          <motion.div
            initial={{ x: directionLeft ? -60 : 60, opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-full border-2 border-darkGreen/20 bg-gradient-to-br from-white to-darkGreen/5
              w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28
              filter group-hover:grayscale transition-all duration-500 ease-out flex items-center justify-center
              group-hover:border-darkGreen/60 group-hover:shadow-xl group-hover:shadow-darkGreen/10 group-hover:scale-105"
          >
            <span className="text-xs md:text-sm font-bold text-darkGreen">
              {skill?.title?.substring(0, 4)}
            </span>
          </motion.div>
        )}

        {/* Hover overlay with percentage */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-all duration-300 ease-in-out
          bg-white rounded-full z-10 flex flex-col items-center justify-center
          w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28">
          <p className="text-lg md:text-2xl font-bold text-darkGreen">
            {skill.progress}%
          </p>
          <p className="text-[8px] md:text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            {skill?.title}
          </p>
        </div>
      </div>
    </div>
  );
}
