interface OrnamentProps {
  color?: string;
  width?: number;
  className?: string;
}

export function Ornament({ color = "#b89968", width = 240, className }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 240 20"
      width={width}
      height={20}
      className={className}
      style={{ display: "block", margin: "0 auto" }}
      aria-hidden
    >
      <line x1="0" y1="10" x2="95" y2="10" stroke={color} strokeWidth="0.8" />
      <line x1="145" y1="10" x2="240" y2="10" stroke={color} strokeWidth="0.8" />
      <g transform="translate(120 10)" fill="none" stroke={color} strokeWidth="0.8">
        <circle r="6" />
        <circle r="2" fill={color} />
        <path d="M -18 0 Q -12 -6 -6 0 Q -12 6 -18 0 Z" />
        <path d="M 18 0 Q 12 -6 6 0 Q 12 6 18 0 Z" />
      </g>
    </svg>
  );
}
