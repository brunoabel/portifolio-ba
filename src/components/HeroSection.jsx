import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";

// Typewriter hook — types characters one by one
function useTypewriter(text, { startDelay = 0, speed = 80, enabled = false } = {}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let i = 0;
    setDisplayed("");
    setDone(false);

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, startDelay, speed, enabled]);

  return { displayed, done };
}

export default function HeroSection() {
  const lineRef = useRef(null);
  const { data, ui } = useLanguage();
  const NAME = data.perfil.nome; // "Bruno Abel"
  const ROLE = data.perfil.titulo;
  const TAGLINE = data.perfil.resumo.split(".")[0] + ".";

  // ── Animation state machine ──────────────────────────────
  // Phase 0 → Logo draws itself (Logo.jsx GSAP animation)
  // Phase 1 → Name types out below the logo
  // Phase 2 → Logo shrinks to header corner, name fades
  // logoInHeader → rest of hero content enters
  const [phase, setPhase] = useState(0);
  const [logoInHeader, setLogoInHeader] = useState(false);

  // Called by Logo.jsx when its GSAP stroke animation finishes (~1.8s)
  const handleLogoComplete = useCallback(() => {
    setPhase(1);
  }, []);

  // Typewriter enabled in phase 1+
  const { displayed: typedName, done: typingDone } = useTypewriter(NAME, {
    startDelay: 0,
    speed: 90,
    enabled: phase >= 1,
  });

  // After typing completes + 700 ms pause → migrate to header
  useEffect(() => {
    if (!typingDone) return;
    const t = setTimeout(() => setPhase(2), 700);
    return () => clearTimeout(t);
  }, [typingDone]);

  // After migration animation (~950 ms) → reveal hero content
  useEffect(() => {
    if (phase < 2) return;
    const t = setTimeout(() => setLogoInHeader(true), 950);
    return () => clearTimeout(t);
  }, [phase]);

  const isIntroActive = phase < 2;

  return (
    <section
      id="top"
      className="relative min-h-screen w-full bg-base overflow-hidden flex flex-col justify-center px-6 md:px-[6vw]"
    >
      {/* Ambient glow fades out when intro ends */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          className="w-[280px] h-[280px] sm:w-[520px] sm:h-[520px] rounded-full bg-white/[0.05] blur-[100px] sm:blur-[140px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isIntroActive ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      {/* ── INTRO GROUP: SVG Logo (draws itself) + Typewriter name ──
          Centered on screen during intro, then shrinks + migrates
          to the top-left corner (the header logo slot).
      ──────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute z-30 flex flex-col items-center gap-5"
        initial={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          scale: 1,
        }}
        animate={
          phase >= 2
            ? { top: 14, left: 16, x: 0, y: 0, scale: 0.18 }
            : { top: "50%", left: "50%", x: "-50%", y: "-50%", scale: 1 }
        }
        style={{ transformOrigin: phase >= 2 ? "top left" : "center center" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Original SVG Logo with stroke draw animation */}
        <Logo
          className="w-[180px] sm:w-[220px] h-auto"
          strokeWidth={3}
          playOnMount
          onComplete={handleLogoComplete}
        />

        {/* Typewriter name — slides in after logo draws */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-center select-none"
              style={{ whiteSpace: "nowrap" }}
            >
              <span
                className="font-display font-extralight text-xl sm:text-3xl md:text-4xl text-white uppercase"
                style={{ letterSpacing: "0.25em" }}
              >
                {typedName}
                {/* Blinking cursor */}
                {!typingDone && (
                  <motion.span
                    className="inline-block w-[2px] h-5 sm:h-7 bg-white ml-1 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.48,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                )}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── HERO CONTENT — revealed after logo settles in header ── */}
      <div className="relative z-10 max-w-5xl pt-16 sm:pt-0">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: logoInHeader ? 1 : 0, y: logoInHeader ? 0 : 12 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-muted uppercase mb-3 sm:mb-6"
        >
          {ROLE}
        </motion.p>

        <h1 className="font-display font-medium text-[clamp(2.1rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.03em] text-white">
          {NAME.split(" ").map((word, i) => (
            <motion.span key={word} className="inline-block overflow-hidden mr-3 sm:mr-4">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: logoInHeader ? 0 : "110%" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: logoInHeader ? 1 : 0, y: logoInHeader ? 0 : 12 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="mt-4 sm:mt-8 max-w-md text-muted text-sm sm:text-base leading-relaxed"
        >
          {TAGLINE}
        </motion.p>

        {/* Action Buttons: CV, LinkedIn, GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: logoInHeader ? 1 : 0, y: logoInHeader ? 0 : 12 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-6 sm:mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3.5"
        >
          {/* Download CV */}
          <a
            href={data.contato.cvUrl || "/cv-bruno-abel.pdf"}
            download="CV_Bruno_Abel.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)] interactive"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{ui.hero.downloadCv || "Descarregar CV"}</span>
          </a>

          {/* Social Links (LinkedIn, GitHub) */}
          {data.contato.social.map((s, index) => (
            <a
              key={index}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] interactive"
            >
              <span>{s.nome}</span>
              <span className="text-white/40 text-xs">↗</span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom divider */}
      <motion.div
        ref={lineRef}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: logoInHeader ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-white/10"
      />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: logoInHeader ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="hidden sm:flex absolute bottom-6 sm:bottom-10 right-6 md:right-[6vw] font-mono text-[10px] tracking-[0.2em] text-muted uppercase items-center gap-3"
      >
        {ui.hero.scroll}
        <span className="block w-px h-8 bg-white/20 relative overflow-hidden">
          <motion.span
            className="absolute top-0 left-0 w-full h-full bg-white"
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </span>
      </motion.div>
    </section>
  );
}
