import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const HeaderNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang, ui } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: ui.nav.sobre, href: '#sobre' },
    { name: ui.nav.projetos, href: '#projetos' },
    { name: ui.nav.habilidades, href: '#habilidades' },
    { name: ui.nav.experiencia, href: '#experiencia' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 py-3 px-5 sm:py-4 sm:px-6 md:px-[6vw] transition-all duration-300 ${
          scrolled ? 'glass-panel border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <a href="#top" className="font-display font-medium text-base sm:text-lg tracking-wide text-white">
            BA<span className="text-muted">.</span>
          </a>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <ul className="hidden md:flex items-center gap-8 text-sm font-mono tracking-widest uppercase text-muted">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors duration-300 link-draw">
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contato" className="text-white hover:text-white/80 transition-colors link-draw">
                  {ui.nav.contato}
                </a>
              </li>
            </ul>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLang}
              className="font-mono text-[11px] sm:text-xs tracking-wider border border-white/20 hover:border-white/50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full transition-all duration-300 flex items-center gap-1.5 interactive bg-white/5 hover:bg-white/10 text-white"
              aria-label="Toggle language"
              title="Mudar idioma / Switch language"
            >
              <span className={lang === 'PT' ? 'text-white font-bold' : 'text-white/40'}>PT</span>
              <span className="text-white/20">|</span>
              <span className={lang === 'EN' ? 'text-white font-bold' : 'text-white/40'}>EN</span>
            </button>

            <button 
              className="md:hidden text-white z-[60] relative p-1" 
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0)' }}
            animate={{ clipPath: 'circle(150% at 100% 0)' }}
            exit={{ clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] bg-base flex flex-col justify-center items-center md:hidden"
          >
            <ul className="flex flex-col gap-6 sm:gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                >
                  <a 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-2xl sm:text-3xl text-white tracking-tight"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * navLinks.length + 0.3 }}
                className="mt-2"
              >
                <a 
                  href="#contato" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xs tracking-[0.2em] uppercase text-white/70 border border-white/20 px-6 py-3 rounded-full inline-block"
                >
                  {ui.nav.contato}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderNav;

