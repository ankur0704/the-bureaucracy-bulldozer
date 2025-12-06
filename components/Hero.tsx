import React from 'react';
import { motion } from 'framer-motion';
import Stamp from './Stamp';

interface HeroProps {
  verdict?: 'APPROVED' | 'DENIED' | null;
}

const Hero: React.FC<HeroProps> = ({ verdict }) => {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 border-3 border-deep-black bg-hazard-yellow p-8 shadow-hard-lg relative overflow-hidden">
      <div className="relative z-10">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-2"
        >
          The Bureaucracy<br />
          <span className="text-off-white bg-deep-black px-2">Bulldozer</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl font-bold font-mono border-l-4 border-deep-black pl-4 mt-4"
        >
          // DEMOLISH RED TAPE. AUTOMATE COMPLIANCE.
        </motion.p>
      </div>

      {/* Stamp Positioned on the Hero Header */}
      <Stamp 
        verdict={verdict || null} 
        className="absolute right-4 bottom-4 md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:right-12 rotate-[-12deg]"
      />
    </div>
  );
};

export default Hero;