import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { urlFor } from "../sanity";
import { PageInfo } from "../typings";
import BackgroundCircles from "./BackgroundCircles";

type Props = { pageInfo: PageInfo };

export default function Hero({ pageInfo }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [text, count] = useTypewriter({
    words: [
      `Hi, I'm ${pageInfo?.name}`,
      "ML Engineer @ Mercedes-Benz R&D",
      "I build intelligent systems 🤖",
      "Computer Vision -  NLP - MLOps",
      "And I'm addicted to ☕️",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  const navButtons = ["About", "Experience", "Skills", "Projects"];

  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />

      {/* Profile image with animated glow ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-darkGreen via-lightGreen to-accent rounded-full blur-md opacity-40 animate-glow-pulse" />
        {pageInfo?.heroImage ? (
          <img
            className="relative rounded-full h-36 w-36 mx-auto object-cover border-2 border-white/50 shadow-2xl"
            src={typeof pageInfo.heroImage === "string" ? pageInfo.heroImage : urlFor(pageInfo.heroImage).url()}
            alt="Rakshith G"
          />
        ) : (
          <div className="relative rounded-full h-36 w-36 mx-auto bg-gradient-to-br from-darkGreen/30 to-lightGreen/30 flex items-center justify-center border-2 border-white/50 shadow-2xl">
            <span className="text-4xl font-bold gradient-text">
              {pageInfo?.name?.charAt(0)}
            </span>
          </div>
        )}
      </motion.div>

      <div className="z-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xs uppercase text-gray-400 pb-2 tracking-[12px] md:tracking-[15px] font-light"
        >
          {pageInfo?.role}
        </motion.h2>
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-semibold px-10">
          {isMounted ? (
            <>
              <span className="mr-3 gradient-text">{text}</span>
              <Cursor cursorColor="#68B2A0" />
            </>
          ) : (
            <span className="mr-3">&nbsp;</span>
          )}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pt-5 flex flex-wrap justify-center gap-2"
        >
          {navButtons.map((label, i) => (
            <Link key={label} href={`#${label.toLowerCase()}`}>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                className="heroButton"
              >
                {label}
              </motion.button>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
