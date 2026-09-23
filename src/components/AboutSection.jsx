import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const AboutSection = () => {
  const { lang, data, ui } = useLanguage();
  const isEn = lang === 'EN';

  const highlights = isEn
    ? [
        { label: "Location", value: "Porto, Portugal" },
        { label: "Age", value: "21 Years Old" },
        { label: "Degree", value: "TPSI Specialist" },
        { label: "Focus", value: "Full-Stack Web Dev" }
      ]
    : [
        { label: "Localização", value: "Porto, Portugal" },
        { label: "Idade", value: "21 Anos" },
        { label: "Formação", value: "Especialista TPSI" },
        { label: "Foco", value: "Dev Web Full-Stack" }
      ];

  return (
    <section id="sobre" className="py-14 sm:py-20 md:py-24 px-6 md:px-[6vw] max-w-7xl mx-auto border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 sm:gap-12"
      >
        {/* Tag Header */}
        <div className="flex items-center gap-4">
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted border-l border-white/20 pl-4">
            {ui.sobre?.tag || "01. Sobre Mim"}
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Main Statement */}
          <div className="lg:col-span-7">
            <h3 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.1] mb-6 sm:mb-8">
              {ui.sobre?.title || (
                isEn 
                  ? "Turning complex ideas into fast, intuitive, high-value digital experiences."
                  : "Transformar ideias complexas em interfaces rápidas, intuitivas e de elevado valor."
              )}
            </h3>

            <p className="font-sans text-muted text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              {isEn
                ? "21-year-old developer based in Porto, Portugal, focused on building modern web applications, management systems, and high-performance digital platforms."
                : "Desenvolvedor de 21 anos sediado no Porto, focado na criação de aplicações web modernas, sistemas de gestão e plataformas digitais de alta performance."}
            </p>

            <p className="font-sans text-muted/80 text-xs sm:text-sm md:text-base leading-relaxed">
              {isEn
                ? "With a higher technical specialization in TPSI (Information Systems Technologies & Programming) and hands-on experience building end-to-end solutions — from database modeling to responsive user interfaces — I focus on turning business needs into functional, elegant, high-impact digital products."
                : "Com formação técnica especializada em TPSI (Tecnologias e Programação de Sistemas de Informação) e experiência prática no desenvolvimento de soluções completas — desde a modelagem de bases de dados até interfaces responsivas de utilizador — dedico-me a transformar necessidades de negócio em produtos digitais funcionais, elegantes e de impacto."}
            </p>
          </div>

          {/* Quick Metrics / Highlights Card */}
          <div className="lg:col-span-5 bg-surface/60 border border-white/10 p-5 sm:p-8 rounded-sm stroke-glow mt-2 lg:mt-0">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
              {isEn ? "Quick Overview" : "Resumo Rápido"}
            </h4>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {highlights.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] sm:text-[11px] text-muted uppercase tracking-wider">{item.label}</span>
                  <span className="font-display text-base sm:text-lg text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
