import React from 'react';

const ProjectCard = ({ projeto }) => {
  return (
    <article className="stroke-glow bg-surface group flex flex-col md:flex-row h-full rounded-sm overflow-hidden">
      {/* Project Image placeholder */}
      <div className="w-full md:w-2/5 bg-base/50 relative overflow-hidden flex items-center justify-center min-h-[200px]">
        <div className="text-white/20 font-mono text-sm tracking-widest uppercase">Imagem</div>
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      {/* Content */}
      <div className="p-8 flex flex-col justify-center flex-1">
        <h3 className="font-display font-medium text-2xl text-white mb-2 group-hover:text-white transition-colors duration-300">
          {projeto.nome}
        </h3>
        <p className="font-sans text-muted text-sm leading-relaxed mb-6">
          {projeto.descricao}
        </p>
        
        {/* Technologies */}
        {projeto.tech && (
          <ul className="flex flex-wrap gap-2 mt-auto">
            {projeto.tech.map((t, idx) => (
              <li key={idx} className="font-mono text-[10px] uppercase tracking-widest text-white/50 bg-white/5 px-3 py-1 rounded-sm">
                {t}
              </li>
            ))}
          </ul>
        )}
        
        {projeto.link && (
          <div className="mt-8 flex gap-6">
            <a href={projeto.link} target="_blank" rel="noopener noreferrer" className="font-mono text-xs tracking-widest uppercase text-white hover:text-white/70 transition-colors link-draw">
              Ver Projeto
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
