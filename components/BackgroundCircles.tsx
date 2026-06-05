import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function BackgroundCircles({}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"],
      }}
      transition={{
        duration: 2.5,
      }}
      className="relative flex justify-center items-center"
    >
      {/* Inner pulsing ring */}
      <div className="absolute rounded-full h-[200px] w-[200px] mt-64 md:mt-52 
        border border-darkGreen/20 animate-ping" />
      
      {/* Gradient glow ring */}
      <div className="absolute rounded-full h-[300px] w-[300px] mt-64 md:mt-52 
        border-2 border-lightGreen/10 animate-pulse"
        style={{ boxShadow: "0 0 60px rgba(104,178,160,0.08), inset 0 0 60px rgba(104,178,160,0.05)" }}
      />
      
      {/* Slowly spinning ring */}
      <div className="absolute rounded-full h-[500px] w-[500px] mt-64 md:mt-52 
        border border-dashed border-darkGreen/10 animate-spin-slow" />
      
      {/* Main accent ring with glow */}
      <div className="absolute h-[510px] w-[510px] md:h-[650px] md:w-[650px] 
        mt-64 md:mt-52 rounded-full animate-pulse"
        style={{ 
          background: "radial-gradient(circle, transparent 60%, rgba(44,105,117,0.03) 100%)",
          border: "1.5px solid rgba(44,105,117,0.15)",
          boxShadow: "0 0 80px rgba(44,105,117,0.08), inset 0 0 80px rgba(104,178,160,0.03)"
        }}
      />
      
      {/* Counter-spinning outer ring */}
      <div className="absolute rounded-full h-[700px] w-[700px] mt-64 md:mt-52 
        border border-dashed border-lightGreen/5 animate-spin-reverse" />

      {/* Outermost subtle ring */}
      <div className="absolute rounded-full h-[800px] w-[800px] mt-64 md:mt-52 
        border border-gray-200/30 animate-ping" 
        style={{ animationDuration: "4s" }}
      />
    </motion.div>
  );
}
