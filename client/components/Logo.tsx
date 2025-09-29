export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="HealthyLife logo"
      focusable="false"
    >
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#0071ff" />
          <stop offset="1" stopColor="#00b38a" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="10" fill="hsl(var(--card))" />
      <g transform="translate(8,8)">
        <path d="M24 6c-3.3 0-6 2.7-6 6 0 8 12 12 12 18 0-6 12-10 12-18 0-3.3-2.7-6-6-6-3 0-5.5 1.8-6 4.3C29.5 7.8 27 6 24 6z" fill="url(#g)" />
        <circle cx="40" cy="40" r="0" fill="#fff" />
      </g>
    </svg>
  );
}
