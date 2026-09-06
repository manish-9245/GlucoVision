export function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      role="img"
      aria-label="GlucoVision logo, concentric retina"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <circle cx="256" cy="256" r="148" fill="none" stroke="#0a0a0f" strokeWidth="32" />
        <circle cx="256" cy="256" r="72" fill="none" stroke="#0f766e" strokeWidth="28" />
        <line x1="236" y1="256" x2="276" y2="256" stroke="#0a0a0f" strokeWidth="8" strokeLinecap="round" />
        <line x1="256" y1="236" x2="256" y2="276" stroke="#0a0a0f" strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <div className={`grid place-items-center rounded-full bg-white border border-zinc-200 shadow-sm ${className}`}>
      <Logo size={20} />
    </div>
  );
}
