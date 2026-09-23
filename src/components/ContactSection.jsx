import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ContactSection = () => {
  const { data, ui } = useLanguage();
  const contato = data.contato;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contato.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contato" className="py-14 sm:py-24 md:py-32 px-6 md:px-[6vw] max-w-7xl mx-auto border-t border-white/5 mt-8 sm:mt-24">
      <div className="flex flex-col gap-8 sm:gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 sm:gap-8"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-muted">
              {ui.contato.available}
            </p>
          </div>
          
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-none max-w-4xl tracking-tight">
            {ui.contato.title}
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 sm:gap-12"
        >
          <div className="group relative w-full md:w-auto">
            <button 
              onClick={handleCopy}
              className="text-left font-display text-lg sm:text-2xl md:text-4xl text-muted hover:text-white transition-colors duration-500 pb-2 relative interactive break-all"
              title={ui.contato.copyEmail}
            >
              {contato.email}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 origin-right scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]"></span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1]"></span>
            </button>
            <AnimateCopyMessage copied={copied} message={ui.contato.copied} />
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 font-mono text-xs sm:text-sm uppercase tracking-widest text-muted">
            <a 
              href={contato.cvUrl || "/cv-bruno-abel.pdf"}
              download="CV_Bruno_Abel.pdf"
              className="hover:text-white transition-colors duration-300 link-draw interactive flex items-center gap-1.5"
            >
              <span>{ui.hero?.downloadCv || "CV"}</span>
              <span className="text-xs">↓</span>
            </a>
            {contato.social.map((s, index) => (
              <a 
                key={index}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors duration-300 link-draw interactive"
              >
                {s.nome}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AnimateCopyMessage = ({ copied, message }) => {
  if (!copied) return null;
  return (
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="absolute -top-8 left-0 font-mono text-xs text-white bg-white/10 px-3 py-1 rounded-sm"
    >
      {message}
    </motion.span>
  );
};

export default ContactSection;

