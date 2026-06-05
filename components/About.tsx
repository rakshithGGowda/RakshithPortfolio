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
      <h3 className="absolute top-20 md:top-24 uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl">
        About
      </h3>

      {pageInfo?.profilePic ? (
        <motion.img
          initial={{ x: -200, opacity: 0 }}
          animate={imgControls}
          transition={{ duration: 1.2 }}
          className=" -mb-24 md:mb-0 flex-shrink-0 w-52 h-52 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
          src={typeof pageInfo.profilePic === "string" ? pageInfo.profilePic : urlFor(pageInfo.profilePic).url()}
        />
      ) : (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={imgControls}
          transition={{ duration: 1.2 }}
          className="-mb-24 md:mb-0 flex-shrink-0 w-52 h-52 rounded-full md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px] bg-darkGreen/20 flex items-center justify-center"
        >
          <span className="text-6xl md:text-8xl font-bold text-darkGreen">
            {pageInfo?.name?.charAt(0)}{pageInfo?.name?.split(" ")[1]?.charAt(0)}
          </span>
        </motion.div>
      )}
      <div className="space-y-5 md:space-y-10 px-0 md:px-10">
        <h4 className="text-xl md:text-4xl font-semibold">
          Here is a{" "}
          <span className=" underline decoration-darkGreen/50">little</span>{" "}
          background
        </h4>
        <p className="text-sm md:text-lg lg:text-lg text-justify">
          {pageInfo?.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
}
