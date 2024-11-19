import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const sections = ['hero', 'about', 'games', 'music'];

export default function ScrollDots() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPosition / windowHeight);
      setActiveSection(Math.min(index, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 space-y-4">
      {sections.map((section, index) => (
        <motion.button
          key={section}
          className="group relative w-4 h-4 block"
          onClick={() => scrollToSection(index)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors"
            animate={{
              scale: activeSection === index ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 1, repeat: activeSection === index ? Infinity : undefined }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-fuchsia-400"
            initial={{ scale: 0 }}
            animate={{
              scale: activeSection === index ? 1 : 0,
            }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
          />
        </motion.button>
      ))}
    </div>
  );
}