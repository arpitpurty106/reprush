"use client";

// The signature element: a rep-tempo pulse — bars animate like a heartbeat
// tied to lifting tempo, reinforcing "every rep, counted."
export default function PulseSignature({ className = "" }: { className?: string }) {
  const bars = [0.35, 0.6, 0.9, 1, 0.7, 1, 0.5, 0.85, 0.4, 0.75, 1, 0.55];
  return (
    <div className={`flex items-end gap-1.5 ${className}`} aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="tick animate-pulseline"
          style={{
            height: `${h * 64}px`,
            animationDelay: `${i * 0.09}s`,
            opacity: 0.35 + h * 0.65,
          }}
        />
      ))}
    </div>
  );
}
