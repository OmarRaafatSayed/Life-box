// Decorative floating icons scattered across the landing page.
// Three shapes matching the brand identity from the hero design:
//   • StarBurst  — red spiky star
//   • WavyLine   — blue squiggle
//   • EyePair    — cartoon eyes
// Each is positioned absolutely inside a `relative` wrapper section.

export function StarBurst({
  size = 40,
  style,
  className,
}: {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      style={style}
      className={className}
    >
      <path
        d="M50 5 L57 35 L85 20 L67 45 L97 50 L67 55 L85 80 L57 65 L50 95 L43 65 L15 80 L33 55 L3 50 L33 45 L15 20 L43 35 Z"
        fill="#E84B2F"
        stroke="#C0351A"
        strokeWidth="2"
      />
    </svg>
  );
}

export function WavyLine({
  size = 72,
  style,
  className,
}: {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.45)}
      viewBox="0 0 160 72"
      fill="none"
      aria-hidden="true"
      style={style}
      className={className}
    >
      {/* Shadow / outline layer */}
      <path
        d="M8 52 C22 20, 38 20, 52 44 C66 68, 82 68, 96 44 C110 20, 126 20, 152 44"
        stroke="#1a1a2e"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
      />
      {/* Blue fill layer */}
      <path
        d="M8 52 C22 20, 38 20, 52 44 C66 68, 82 68, 96 44 C110 20, 126 20, 152 44"
        stroke="#3B5FD4"
        strokeWidth="17"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function EyePair({
  size = 56,
  style,
  className,
}: {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.6)}
      viewBox="0 0 120 72"
      fill="none"
      aria-hidden="true"
      style={style}
      className={className}
    >
      {/* Left eye */}
      <circle cx="30" cy="36" r="28" fill="white" stroke="#111" strokeWidth="4" />
      <circle cx="34" cy="36" r="16" fill="#111" />
      <circle cx="38" cy="30" r="6" fill="white" />
      {/* Right eye */}
      <circle cx="90" cy="36" r="28" fill="white" stroke="#111" strokeWidth="4" />
      <circle cx="94" cy="36" r="16" fill="#111" />
      <circle cx="98" cy="30" r="6" fill="white" />
    </svg>
  );
}