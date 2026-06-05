import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { SocialIcon } from "react-social-icons";
import { Social } from "../typings";

type Props = {
  socials: Social[];
};

export default function Header({ socials }: Props) {
  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center
      bg-white/40 backdrop-blur-lg border-b border-white/20">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center gap-1"
      >
        {/* React social icons */}
        {socials.map((social) => (
          <SocialIcon
            key={social._id}
            url={social.url}
            fgColor="#2C6975"
            bgColor="transparent"
            style={{ height: 40, width: 40 }}
            className="hover:scale-110 transition-transform duration-200"
          />
        ))}
      </motion.div>

      <Link href="#contact">
        <motion.div
          initial={{
            x: 500,
            opacity: 0.5,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="flex flex-row items-center cursor-pointer group"
        >
          <SocialIcon
            className="cursor-pointer"
            network="email"
            fgColor="#2C6975"
            bgColor="transparent"
            style={{ height: 40, width: 40 }}
          />
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400 group-hover:text-darkGreen transition-colors duration-300 tracking-wider">
            Get in touch
          </p>
        </motion.div>
      </Link>
    </header>
  );
}
