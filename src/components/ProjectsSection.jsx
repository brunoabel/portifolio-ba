import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Icon components (inline SVG — no extra dependency)
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconGithub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const ProjectCard = ({ projeto, index, uiStrings }) => {
  const [expanded, setExpanded] = useState(false);
  const hasImage = projeto.imagem !== null;
  const hasSite = projeto.linkSite !== null;
  const hasGithub = projeto.linkGithub !== null;
  const hasAnyLink = hasSite || hasGithub;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border border-white/8 rounded-sm overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500"
    >
      {/* Top accent line animates on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-white/60 w-full"
          initial={{ x: '-100%' }}
          whileHover={{ x: '0%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="flex flex-col md:flex-row">
        {/* ── Image slot ── */}
        <div className="md:w-[42%] relative overflow-hidden bg-white/[0.03] flex-shrink-0 min-h-[160px] sm:min-h-[220px] md:min-h-[280px]">
          {hasImage ? (
            <img
              src={projeto.imagem}
              alt={projeto.nome}
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            /* Placeholder with project number */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-4">
              <span className="font-mono text-[3.5rem] sm:text-[5rem] font-bold text-white/[0.04] leading-none select-none">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-white/20 uppercase">
                Imagem em breve
              </span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 md:block hidden" />

          {/* Year + type badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1 sm:gap-1.5">
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-white/50 uppercase bg-black/40 backdrop-blur-sm px-2 py-0.5 sm:py-1 rounded-sm">
              {projeto.ano}
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] text-white/40 uppercase bg-black/30 backdrop-blur-sm px-2 py-0.5 sm:py-1 rounded-sm">
              {projeto.tipo}
            </span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 p-5 sm:p-7 md:p-10 flex flex-col justify-between">
          {/* Header */}
          <div>
            <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/30 uppercase mb-2 sm:mb-3">
              {String(index + 1).padStart(2, '0')} — {projeto.tipo}
            </p>

            <h3 className="font-display font-medium text-xl sm:text-2xl md:text-3xl text-white leading-tight mb-1.5 sm:mb-2 group-hover:text-white transition-colors duration-300">
              {projeto.nome}
            </h3>

            <p className="font-mono text-xs sm:text-sm text-white/40 mb-3 sm:mb-5">
              {projeto.tagline}
            </p>

            {/* Description — first 2 lines always visible, rest expand */}
            <div className="relative">
              <p
                className={`text-white/60 text-xs sm:text-sm leading-relaxed transition-all duration-500 ${
                  expanded ? '' : 'line-clamp-3'
                }`}
              >
                {projeto.descricao}
              </p>
              {!expanded && (
                <button
                  onClick={() => setExpanded(true)}
                  className="mt-2 font-mono text-[10px] tracking-[0.15em] text-white/35 hover:text-white/70 uppercase transition-colors duration-200"
                >
                  Ler mais ↓
                </button>
              )}
              {expanded && (
                <button
                  onClick={() => setExpanded(false)}
                  className="mt-2 font-mono text-[10px] tracking-[0.15em] text-white/35 hover:text-white/70 uppercase transition-colors duration-200"
                >
                  Recolher ↑
                </button>
              )}
            </div>
          </div>

          {/* Footer: tech + links */}
          <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-white/8 flex flex-col gap-4 sm:gap-5">
            {/* Tech stack */}
            {projeto.tech && projeto.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {projeto.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] text-white/45 border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex items-center gap-5 sm:gap-6">
              {hasSite ? (
                <a
                  href={projeto.linkSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-white uppercase hover:text-white/60 transition-colors duration-200 group/link"
                >
                  <span>{uiStrings.verSite}</span>
                  <span className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200">
                    <IconArrow />
                  </span>
                </a>
              ) : (
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] text-white/20 uppercase">
                  {uiStrings.emBreve}
                </span>
              )}

              {hasGithub && (
                <a
                  href={projeto.linkGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-white/50 uppercase hover:text-white/80 transition-colors duration-200"
                >
                  <IconGithub />
                  <span>{uiStrings.verGithub}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectsSection = () => {
  const { data, ui } = useLanguage();
  const projetos = data.projetos;
  const uiStrings = ui.projetos;

  return (
    <section id="projetos" className="py-14 sm:py-20 md:py-24 px-6 md:px-[6vw]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-16"
        >
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted mb-3 sm:mb-4 border-l border-white/20 pl-4">
            {uiStrings.tag}
          </h2>
          <p className="font-display text-2xl sm:text-4xl md:text-5xl text-white max-w-2xl leading-tight">
            {uiStrings.title}
          </p>
        </motion.div>

        {/* Project cards grid */}
        <div className="flex flex-col gap-6">
          {projetos.map((projeto, index) => (
            <ProjectCard
              key={projeto.id || index}
              projeto={projeto}
              index={index}
              uiStrings={uiStrings}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
