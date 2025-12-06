import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
  text: string;
  isTyping: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ text, isTyping }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    if (!text) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
      // Auto scroll
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 20); // Typing speed

    return () => clearInterval(interval);
  }, [text]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 border-3 border-deep-black bg-deep-black p-6 shadow-hard-lg flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
        <span className="text-success-green font-mono text-sm">TERMINAL_OUTPUT.sh</span>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-error-red"></div>
          <div className="w-3 h-3 rounded-full bg-hazard-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-success-green"></div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-grow font-mono text-success-green text-lg leading-relaxed overflow-y-auto whitespace-pre-wrap"
      >
        {isTyping && !text && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            &gt; ANALYZING ZONING PARAMETERS...<br />
            &gt; PARSING PDF DATA...<br />
            &gt; CHECKING MUNICIPAL CODES...
          </motion.div>
        )}
        {text && (
          <>
            <span className="opacity-50 text-sm block mb-4 border-b border-success-green/30 w-full pb-2">
              {`> REPORT GENERATED AT ${new Date().toLocaleTimeString()}`}
            </span>
            {displayedText}
          </>
        )}
        <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} inline-block w-3 h-6 bg-success-green ml-1 align-middle`}></span>
      </div>
    </div>
  );
};

export default Terminal;