"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020617]">
      {/* Mesh Gradients */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand/20 blur-[120px]"
      />
      
      <motion.div 
        animate={{
          scale: [1, 1.5, 1],
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[100px]"
      />

      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-brand-light/10 blur-[80px]"
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
