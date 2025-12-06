import React from 'react';
import { motion } from 'framer-motion';
import { HardHat } from 'lucide-react';

interface BulldozeButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const BulldozeButton: React.FC<BulldozeButtonProps> = ({ onClick, disabled }) => {
  return (
    <div className="w-full pt-8 pb-12 flex justify-center">
      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileHover={!disabled ? { 
          scale: 1.02, 
          y: -4,
          boxShadow: "12px 12px 0px 0px #101010" 
        } : {}}
        whileTap={!disabled ? { 
          scale: 0.95, 
          y: 6,
          boxShadow: "0px 0px 0px 0px #101010" 
        } : {}}
        className={`
            w-full md:w-auto px-12 py-6 
            bg-hazard-yellow border-3 border-deep-black 
            shadow-hard-xl 
            text-3xl md:text-5xl font-black uppercase tracking-tight 
            flex items-center justify-center gap-4
            transition-colors
            ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:bg-yellow-400 cursor-pointer'}
        `}
      >
        <HardHat size={48} strokeWidth={2.5} className="hidden md:block" />
        {disabled ? 'Processing...' : 'BULLDOZE'}
        <HardHat size={48} strokeWidth={2.5} className="hidden md:block" />
      </motion.button>
    </div>
  );
};

export default BulldozeButton;