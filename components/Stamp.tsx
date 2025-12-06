import React from 'react';
import { motion } from 'framer-motion';

interface StampProps {
  verdict: 'APPROVED' | 'DENIED' | null;
  className?: string;
}

const Stamp: React.FC<StampProps> = ({ verdict, className = "" }) => {
  if (!verdict) return null;

  const isApproved = verdict === 'APPROVED';
  const colorClass = isApproved ? 'text-success-green border-success-green' : 'text-error-red border-error-red';
  const rotation = isApproved ? -15 : 15;

  return (
    <motion.div
      initial={{ scale: 2, opacity: 0, rotate: 0 }}
      animate={{ scale: 1, opacity: 1, rotate: rotation }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 15,
        mass: 1.5 
      }}
      className={`
        z-40 pointer-events-none mix-blend-multiply
        border-4 md:border-8 ${colorClass}
        p-2 md:p-4 rounded-lg
        bg-white/10 backdrop-blur-sm
        ${className}
      `}
    >
      <div className={`
        text-4xl md:text-6xl font-black uppercase tracking-widest 
        ${colorClass} opacity-90
        border-2 md:border-4 ${colorClass}
        px-4 py-2 md:px-8
        whitespace-nowrap
      `}>
        {verdict}
      </div>
    </motion.div>
  );
};

export default Stamp;