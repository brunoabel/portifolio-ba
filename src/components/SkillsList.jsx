import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const SkillsList = () => {
  const { lang, data, ui } = useLanguage();
  const habilidades = data.habilidades;
  const isEn = lang === 'EN';

  const categoryMeta = {
    frontend: {
      num: "01",
      title: ui.habilidades.cat_frontend || "Front-End",
      desc: isEn 
        ? "Reactive, responsive interfaces built for optimal user experience and high performance."
        : "Interfaces reativas, responsivas e focadas na melhor experiência do utilizador e alta performance."
    },
    backend_db: {
      num: "02",
      title: ui.habilidades.cat_backend_db || "Back-End & BD",
      desc: isEn
        ? "Robust backend services and APIs with real-time data persistence and database modeling."
        : "Serviços e APIs robustos com persistência de dados em tempo real e modelação de bases de dados."
    },
    cms_ferramentas: {
      num: "03",
      title: ui.habilidades.cat_cms_ferramentas || "Ferramentas & CMS",
      desc: isEn
        ? "Platform ecosystem, deployment tools, version control, and educational LMS integration."
        : "Ecossistema de plataformas, ferramentas de deploy, controlo de versão e plataformas LMS."
    },
    soft_skills: {
      num: "04",
      title: ui.habilidades.cat_soft_skills || "Soft Skills",
      desc: isEn
        ? "Team leadership, client communication, technical proposals, and project management."
        : "Liderança de equipas, comunicação com clientes, propostas técnicas e gestão de projetos."
    }
  };

  return (
    <section id="habilidades" className="py-14 sm:py-20 md:py-24 px-6 md:px-[6vw] max-w-7xl mx-auto">
      {/* Header Tag */}
      <div className="mb-8 sm:mb-16">
        <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted border-l border-white/20 pl-4 mb-3 sm:mb-4">
          {ui.habilidades.tag}
        </h2>
        <h3 className="font-display text-2xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight max-w-3xl">
          {isEn ? "Tech stack & core technical skills." : "Stack tecnológica e competências essenciais."}
        </h3>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        {Object.entries(habilidades).map(([category, skills], catIndex) => {
          const meta = categoryMeta[category] || {
            num: `0${catIndex + 1}`,
            title: category,
            desc: ""
          };

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: catIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface/60 border border-white/10 p-5 sm:p-8 rounded-sm stroke-glow flex flex-col justify-between group hover:border-white/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Top gradient accent line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/60 transition-colors duration-500"></div>

              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="font-mono text-xs text-muted tracking-widest">{meta.num}</span>
                  <h4 className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white font-medium bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {meta.title}
                  </h4>
                </div>

                {/* Card Description */}
                {meta.desc && (
                  <p className="font-sans text-xs text-muted/70 mb-4 sm:mb-6 leading-relaxed">
                    {meta.desc}
                  </p>
                )}

                {/* Skills Pills */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="font-mono text-[11px] sm:text-xs text-white/90 bg-white/5 border border-white/10 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-sm hover:bg-white/15 hover:border-white/30 hover:text-white transition-all duration-300 interactive cursor-default hover:scale-[1.02] flex items-center gap-1.5 sm:gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors duration-300"></span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsList;

