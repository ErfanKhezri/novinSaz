import type { ReactElement } from "react";
import type { ArtId } from "../../data/types";
import { cn } from "../../lib/cn";

/*
 * Flat drawings of the rented goods, one graphic language: filled shapes in
 * the page's inks plus the goods' real materials (chrome, wood, glass, leather).
 * They stand in for product photography until the business supplies it.
 */
const c = {
  ink: "#111111",
  accent: "#1a4be0",
  chrome: "#b9bdc4",
  chromeDark: "#8d929b",
  wood: "#c08a55",
  woodDark: "#9a6a3c",
  white: "#ffffff",
  glass: "#cfe0ea",
  floor: "#e6e6e3",
  screen: "#1d2633",
  fabric: "#d9d6cf",
};

const Floor = ({ rx = 120 }: { rx?: number }) => (
  <ellipse cx="200" cy="356" rx={rx} ry="14" fill={c.floor} />
);

const drawings: Record<ArtId, ReactElement> = {
  "bar-stool": (
    <>
      <Floor rx={90} />
      <ellipse cx="200" cy="348" rx="74" ry="12" fill={c.chromeDark} />
      <rect x="193" y="186" width="14" height="162" fill={c.chrome} />
      <ellipse cx="200" cy="270" rx="56" ry="11" fill="none" stroke={c.chrome} strokeWidth="8" />
      <rect x="186" y="176" width="28" height="22" fill={c.chromeDark} />
      <path d="M128 150 Q200 132 272 150 L264 180 Q200 192 136 180 Z" fill={c.ink} />
      <path d="M146 150 L152 70 Q200 52 248 70 L254 150 Q200 138 146 150 Z" fill={c.ink} />
      <path d="M160 82 Q200 70 240 82 L242 104 Q200 94 158 104 Z" fill={c.accent} />
    </>
  ),
  "eames-chair": (
    <>
      <Floor rx={100} />
      <path d="M150 230 L118 350" stroke={c.wood} strokeWidth="10" strokeLinecap="round" />
      <path d="M250 230 L282 350" stroke={c.wood} strokeWidth="10" strokeLinecap="round" />
      <path d="M175 236 L168 344" stroke={c.woodDark} strokeWidth="9" strokeLinecap="round" />
      <path d="M225 236 L232 344" stroke={c.woodDark} strokeWidth="9" strokeLinecap="round" />
      <path d="M140 300 L260 270 M140 270 L260 300" stroke={c.ink} strokeWidth="4" />
      <path
        d="M118 120 Q124 70 200 68 Q276 70 282 120 L290 200 Q292 236 200 240 Q108 236 110 200 Z"
        fill={c.white}
      />
      <path d="M126 196 Q200 214 274 196 Q280 226 200 230 Q120 226 126 196 Z" fill={c.fabric} />
    </>
  ),
  "folding-chair": (
    <>
      <Floor rx={90} />
      <path d="M150 70 L142 352" stroke={c.ink} strokeWidth="10" strokeLinecap="round" />
      <path d="M250 70 L258 352" stroke={c.ink} strokeWidth="10" strokeLinecap="round" />
      <path d="M150 210 L250 352 M250 210 L150 352" stroke={c.chromeDark} strokeWidth="8" strokeLinecap="round" />
      <rect x="146" y="74" width="108" height="58" fill={c.ink} />
      <rect x="156" y="84" width="88" height="38" fill={c.accent} />
      <path d="M128 200 L272 200 L262 226 L138 226 Z" fill={c.accent} />
      <rect x="128" y="226" width="144" height="10" fill={c.ink} />
    </>
  ),
  counter: (
    <>
      <Floor rx={170} />
      <rect x="40" y="128" width="320" height="22" fill={c.ink} />
      <rect x="52" y="150" width="296" height="200" fill={c.white} />
      <rect x="82" y="182" width="236" height="134" fill={c.accent} />
      <rect x="120" y="222" width="60" height="54" fill={c.white} />
      <rect x="196" y="222" width="84" height="16" fill={c.white} />
      <rect x="196" y="250" width="56" height="12" fill={c.white} />
      <rect x="52" y="340" width="296" height="12" fill={c.chromeDark} />
    </>
  ),
  showcase: (
    <>
      <Floor rx={110} />
      <rect x="120" y="40" width="160" height="312" fill={c.ink} />
      <rect x="132" y="54" width="136" height="210" fill={c.glass} />
      <rect x="132" y="54" width="136" height="8" fill={c.white} />
      {[110, 160, 210].map((y) => (
        <rect key={y} x="132" y={y} width="136" height="5" fill={c.white} />
      ))}
      <rect x="160" y="84" width="30" height="26" fill={c.accent} />
      <circle cx="226" cy="146" r="14" fill={c.wood} />
      <rect x="150" y="186" width="64" height="24" fill={c.chromeDark} />
      <rect x="132" y="276" width="136" height="64" fill={c.white} />
      <rect x="194" y="296" width="12" height="20" fill={c.chromeDark} />
    </>
  ),
  "half-set-sofa": (
    <>
      <Floor rx={180} />
      {/* two-seater */}
      <rect x="92" y="150" width="216" height="74" fill={c.ink} />
      <rect x="72" y="190" width="256" height="110" fill={c.ink} />
      <rect x="104" y="206" width="94" height="42" fill="#2a2a2a" />
      <rect x="202" y="206" width="94" height="42" fill="#2a2a2a" />
      <rect x="72" y="176" width="34" height="124" fill="#222" />
      <rect x="294" y="176" width="34" height="124" fill="#222" />
      <rect x="86" y="300" width="10" height="44" fill={c.wood} />
      <rect x="304" y="300" width="10" height="44" fill={c.wood} />
      {/* two singles, in front at the corners */}
      <rect x="10" y="216" width="78" height="52" fill="#1238b0" />
      <rect x="10" y="252" width="78" height="62" fill={c.accent} />
      <rect x="10" y="238" width="14" height="76" fill="#1238b0" />
      <rect x="74" y="238" width="14" height="76" fill="#1238b0" />
      <rect x="18" y="314" width="8" height="34" fill={c.wood} />
      <rect x="72" y="314" width="8" height="34" fill={c.wood} />
      <rect x="312" y="216" width="78" height="52" fill="#1238b0" />
      <rect x="312" y="252" width="78" height="62" fill={c.accent} />
      <rect x="312" y="238" width="14" height="76" fill="#1238b0" />
      <rect x="376" y="238" width="14" height="76" fill="#1238b0" />
      <rect x="320" y="314" width="8" height="34" fill={c.wood} />
      <rect x="374" y="314" width="8" height="34" fill={c.wood} />
    </>
  ),
  "side-table": (
    <>
      <Floor rx={100} />
      <path d="M150 196 L132 352 M250 196 L268 352 M176 196 L170 344 M224 196 L230 344" stroke={c.ink} strokeWidth="8" strokeLinecap="round" />
      <rect x="110" y="176" width="180" height="24" fill={c.wood} />
      <rect x="110" y="196" width="180" height="8" fill={c.woodDark} />
      <rect x="140" y="146" width="38" height="30" fill={c.white} />
      <rect x="178" y="154" width="10" height="14" fill={c.white} />
      <rect x="210" y="164" width="62" height="12" fill={c.accent} />
    </>
  ),
  "round-glass-table": (
    <>
      <Floor rx={130} />
      <ellipse cx="200" cy="344" rx="70" ry="12" fill={c.chromeDark} />
      <rect x="192" y="170" width="16" height="176" fill={c.chrome} />
      <ellipse cx="200" cy="160" rx="160" ry="34" fill={c.glass} />
      <ellipse cx="200" cy="154" rx="160" ry="34" fill={c.glass} opacity="0.7" />
      <path d="M90 150 Q130 136 170 140" stroke={c.white} strokeWidth="6" strokeLinecap="round" fill="none" />
      <rect x="226" y="132" width="26" height="22" fill={c.accent} />
    </>
  ),
  "bar-table": (
    <>
      <Floor rx={100} />
      <ellipse cx="200" cy="346" rx="66" ry="12" fill={c.chromeDark} />
      <rect x="192" y="96" width="16" height="250" fill={c.chrome} />
      <ellipse cx="200" cy="100" rx="110" ry="20" fill={c.chrome} />
      <ellipse cx="200" cy="90" rx="110" ry="20" fill={c.white} />
      <rect x="168" y="56" width="22" height="30" fill={c.accent} />
    </>
  ),
  tv: (
    <>
      <Floor rx={110} />
      <rect x="146" y="336" width="108" height="14" fill={c.ink} />
      <rect x="192" y="226" width="16" height="112" fill={c.ink} />
      <rect x="40" y="60" width="320" height="190" fill={c.ink} />
      <rect x="52" y="72" width="296" height="166" fill={c.screen} />
      <rect x="52" y="72" width="296" height="166" fill={c.accent} opacity="0.85" />
      <rect x="84" y="112" width="120" height="22" fill={c.white} />
      <rect x="84" y="144" width="78" height="14" fill={c.white} opacity="0.8" />
      <circle cx="270" cy="166" r="40" fill={c.white} opacity="0.9" />
      <path d="M260 148 L290 166 L260 184 Z" fill={c.accent} />
    </>
  ),
  "brochure-stand": (
    <>
      <Floor rx={90} />
      <path d="M200 120 L150 352 M200 120 L250 352" stroke={c.chromeDark} strokeWidth="8" strokeLinecap="round" />
      <rect x="140" y="40" width="120" height="290" fill={c.chrome} />
      {[52, 122, 192, 262].map((y, index) => (
        <g key={y}>
          <rect x="154" y={y} width="92" height="58" fill={index % 2 ? c.white : c.accent} />
          <rect x="150" y={y + 30} width="100" height="30" fill={c.glass} opacity="0.9" />
        </g>
      ))}
    </>
  ),
  partition: (
    <>
      <Floor rx={170} />
      <path d="M40 72 L140 92 L140 344 L40 332 Z" fill={c.ink} />
      <path d="M50 86 L130 102 L130 330 L50 320 Z" fill={c.fabric} />
      <path d="M140 92 L260 92 L260 344 L140 344 Z" fill={c.ink} />
      <rect x="150" y="104" width="100" height="228" fill={c.white} />
      <path d="M260 92 L360 72 L360 332 L260 344 Z" fill={c.ink} />
      <path d="M270 102 L350 86 L350 320 L270 330 Z" fill={c.fabric} />
      <rect x="44" y="332" width="8" height="18" fill={c.chromeDark} />
      <rect x="348" y="332" width="8" height="18" fill={c.chromeDark} />
    </>
  ),
};

interface ProductArtProps {
  art: ArtId;
  title: string;
  className?: string;
}

export function ProductArt({ art, title, className }: ProductArtProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={title}
      className={cn("h-auto w-full", className)}
    >
      {drawings[art]}
    </svg>
  );
}
