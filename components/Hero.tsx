import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
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

  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />

      {pageInfo?.heroImage ? (
        <img
          className="relative rounded-full h-32 w-32 mx-auto object-cover"
          src={typeof pageInfo.heroImage === "string" ? pageInfo.heroImage : urlFor(pageInfo.heroImage).url()}
          alt="Rakshith G"
        />
      ) : (
        <div className="relative rounded-full h-32 w-32 mx-auto bg-darkGreen/30 flex items-center justify-center">
          <span className="text-4xl font-bold text-darkGreen">
            {pageInfo?.name?.charAt(0)}
          </span>
        </div>
      )}

      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[10px] md:tracking-[15px]">
          {pageInfo?.role}
        </h2>
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-semibold px-10">
          {isMounted ? (
            <>
              <span className="mr-3">{text}</span>
              <Cursor cursorColor="#68B2A0" />
            </>
          ) : (
            <span className="mr-3">&nbsp;</span>
          )}
        </h1>

        <div className="pt-5">
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
