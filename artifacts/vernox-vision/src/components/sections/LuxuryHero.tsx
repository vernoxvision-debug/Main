
const Flare: React.FC<{
  x: number;
  y: number;
  radius: number;
  reduceMotion: boolean;
  delay: number;
}> = ({ x, y, radius, reduceMotion, delay }) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r={radius}
      fill="url(#vvFlare)"
      opacity="0.42"
    >
      {!reduceMotion && (
        <animate
          attributeName="opacity"
          values="0.32;0.55;0.32"
          dur="7s"
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      )}
    </circle>

    {/* Small, crisp central golden light */}
    <circle cx={x} cy={y} r="3" fill="#FFF0C2" />
    <circle cx={x} cy={y} r="1.2" fill="#FFFFFF" />
  </g>
);
