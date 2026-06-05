import { motion, useAnimation } from "framer-motion";
import React, { RefObject, useEffect, useRef } from "react";
import { urlFor } from "../sanity";
import { PageInfo } from "../typings";

type Props = {
  pageInfo: PageInfo;
  scrollRef?: RefObject<HTMLDivElement>;
};

export default function About({ pageInfo, scrollRef }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const imgControls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const root = scrollRef?.current;
    if (!section || !root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          controls.start({ opacity: 1 });
          imgControls.start({ x: 0, opacity: 1 });
        }
      },
      { root, threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [controls, imgControls, scrollRef]);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-20 md:top-24 section-heading">
        About
      </h3>

      {pageInfo?.profilePic ? (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={imgControls}
          transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
          className="-mb-24 md:mb-0 flex-shrink-0 relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-darkGreen/20 via-lightGreen/20 to-accent/20 rounded-full md:rounded-lg blur-xl opacity-60" />
          <img
            className="relative w-52 h-52 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px] border-2 border-white/50 shadow-2xl"
            src={typeof pageInfo.profilePic === "string" ? pageInfo.profilePic : urlFor(pageInfo.profilePic).url()}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={imgControls}
          transition={{ duration: 1.2 }}
          className="-mb-24 md:mb-0 flex-shrink-0 w-52 h-52 rounded-full md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px] bg-gradient-to-br from-darkGreen/10 to-lightGreen/10 flex items-center justify-center border-2 border-white/50 shadow-2xl"
        >
          <span className="text-6xl md:text-8xl font-bold gradient-text">
            {pageInfo?.name?.charAt(0)}{pageInfo?.name?.split(" ")[1]?.charAt(0)}
          </span>
        </motion.div>
      )}
      <div className="space-y-5 md:space-y-8 px-0 md:px-10 max-w-xl">
        <h4 className="text-xl md:text-4xl font-semibold">
          Here is a{" "}
          <span className="gradient-text">little</span>{" "}
          background
        </h4>
        <p className="text-sm md:text-base lg:text-lg text-justify text-gray-600 leading-relaxed">
          {pageInfo?.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
}
