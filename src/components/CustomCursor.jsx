import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  
  // Motion values for coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for a magnetic feel
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16); // Center the 32px cursor
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over a clickable element or specific interactive elements
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('interactive')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // If mobile, we usually hide custom cursors via CSS (hidden md:block)
  return (
    <motion.div
      className="hidden md:block pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        animate={{
          width: isPointer ? 64 : 32,
          height: isPointer ? 64 : 32,
          x: isPointer ? -16 : 0, // offset expansion
          y: isPointer ? -16 : 0,
          backgroundColor: isPointer ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="rounded-full bg-white backdrop-blur-sm"
      />
    </motion.div>
  );
};

export default CustomCursor;
