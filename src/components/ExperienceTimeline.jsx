import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ExperienceTimeline = () => {
  const { data, ui } = useLanguage();
  const experiencia = data.experiencia;

  return (
    <section id="experiencia" className="py-14 sm:py-20 md:py-24 px-6 md:px-[6vw] max-w-4xl mx-auto relative">
      <div className="mb-8 sm:mb-16 text-center">
        <h2 className="font-mono text-xs tracking-[0.2em] text-muted uppercase mb-3 sm:mb-4">{ui.experiencia.tag}</h2>
        <div className="h-px w-24 bg-white/20 mx-auto"></div>
      </div>
      
      <div className="space-y-8 sm:space-y-12 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
        {experiencia.map((exp, index) => {
          const isCurrent = exp.periodo?.includes('Presente') || exp.periodo?.includes('Present');

          return (
            <article key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Timeline dot */}
              <div className={`flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 rounded-full border z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 ${
                isCurrent ? 'border-white/60 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.15)]' : 'border-white/20 bg-base group-hover:border-white/50 group-hover:bg-white/5'
              }`}>
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300 ${
                  isCurrent ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/40 group-hover:bg-white'
                }`}></div>
              </div>
              
              <div className="w-[calc(100%-2.2rem)] md:w-[calc(50%-2.5rem)] stroke-glow bg-surface p-4 sm:p-6 rounded-sm transition-transform duration-300 hover:-translate-y-1">
                <header className="mb-3 sm:mb-4">
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <span className={`font-mono text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border flex items-center gap-1.5 ${
                      isCurrent 
                        ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300 font-medium' 
                        : 'border-white/10 bg-white/5 text-muted'
                    }`}>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
                      {exp.periodo}
                    </span>
                  </div>
                  <h3 className="font-display font-medium text-base sm:text-lg text-white mb-1 leading-snug">{exp.cargo}</h3>
                  <p className="font-mono text-[10px] sm:text-xs text-muted uppercase tracking-wider">{exp.empresa}</p>
                </header>
                <ul className="flex flex-col gap-2 sm:gap-2.5">
                  {exp.atividades.map((atividade, i) => (
                    <li key={i} className="font-sans text-xs sm:text-sm text-muted/80 flex items-start gap-2 sm:gap-2.5 leading-relaxed">
                      <span className="text-white/30 text-xs mt-0.5 shrink-0">▹</span>
                      <span>{atividade}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceTimeline;

