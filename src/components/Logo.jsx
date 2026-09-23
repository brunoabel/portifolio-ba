import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Logo.jsx
 * ----------------------------------------------------------------
 * Monograma "AB" desenhado ao vivo via stroke-dashoffset (GSAP).
 *
 * >>> AÇÃO NECESSÁRIA <<<
 * O "d" do <path> abaixo é um placeholder (um "AB" genérico) só para
 * o efeito funcionar de imediato. Troque pelo path real do seu logo:
 *
 * 1. Abra o arquivo vetorial original do logo (.ai, .eps ou .svg) no
 *    Illustrator / Figma / Inkscape.
 * 2. Garanta que ele seja UM ÚNICO path contínuo (Object > Path >
 *    Simplify / Join, se estiver quebrado em vários subpaths — isso
 *    é importante, o efeito de "caneta desenhando" só funciona bem
 *    com um traço contínuo, exatamente como o seu logo já é).
 * 3. Exporte como SVG (File > Export > SVG) e abra o arquivo em um
 *    editor de texto.
 * 4. Copie o conteúdo do atributo "d" do <path> e cole abaixo.
 * 5. Ajuste o "viewBox" para bater com o viewBox exportado.
 *
 * Se preferir não mexer em vetor agora, existe um fallback abaixo
 * (LogoImageReveal) que usa a sua imagem PNG com um efeito de reveal
 * por máscara — funciona, mas não tem o "desenho ao vivo" do traço.
 * ----------------------------------------------------------------
 */

const LOGO_PATH_D =
  "M60,220 L140,40 L220,220 M85,150 L195,150 M170,60 C280,60 320,110 320,150 C320,200 240,240 180,260 C120,280 60,270 60,230 C60,190 130,170 220,180 C310,190 350,220 340,250";

export default function Logo({
  className = "",
  strokeWidth = 3,
  playOnMount = true,
  onComplete,
}) {
  const pathRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!playOnMount || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const tl = gsap.timeline({
      onComplete: () => onComplete?.(),
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "power2.inOut",
    }).to(
      svgRef.current,
      {
        filter: "drop-shadow(0 0 18px rgba(255,255,255,0.55))",
        duration: 0.4,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      },
      "-=0.15"
    );

    return () => tl.kill();
  }, [playOnMount, onComplete]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d={LOGO_PATH_D}
        stroke="#F5F5F3"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Fallback: reveal da imagem PNG/raster do logo com clip-path animado.
 * Use este se ainda não tiver o SVG vetorial do traço.
 */
export function LogoImageReveal({ src, alt = "AB", className = "" }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    gsap.fromTo(
      wrapRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut" }
    );
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <img src={src} alt={alt} className="w-full h-full object-contain" />
    </div>
  );
}
