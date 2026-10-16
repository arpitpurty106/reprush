"use client";

import PulseSignature from "./PulseSignature";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-rise">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-smoke">
              <Sparkles size={13} className="text-volt" />
              Free. No login. No plateau.
            </div>

            <h1 className="font-display text-balance text-[13vw] leading-[0.92] tracking-tight text-chalk sm:text-6xl md:text-7xl">
              TRAIN WITH
              <br />
              AN AI THAT
              <br />
              <span className="text-volt">COUNTS EVERY REP.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-relaxed text-smoke md:text-lg">
              RepRush builds your workout split, coaches your form in plain
              language, and logs your progress — tuned to your goal,
              equipment, and schedule. Free for everyone, forever.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={onStart}
                className="group inline-flex items-center gap-2 rounded-full bg-volt px-7 py-3.5 text-sm font-bold text-ink transition hover:brightness-95"
              >
                Build my free plan
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <span className="text-xs text-smoke">
                60 seconds · zero equipment required to start
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-steel p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:p-8">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-smoke">
                <span>Live tempo</span>
                <span className="font-mono text-volt">2-0-1</span>
              </div>
              <div className="mt-8 flex justify-center">
                <PulseSignature />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-white/5 py-3">
                  <div className="font-mono text-xl text-chalk">4</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-smoke">
                    Sets
                  </div>
                </div>
                <div className="rounded-lg bg-white/5 py-3">
                  <div className="font-mono text-xl text-chalk">8-12</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-smoke">
                    Reps
                  </div>
                </div>
                <div className="rounded-lg bg-white/5 py-3">
                  <div className="font-mono text-xl text-ember">90s</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-smoke">
                    Rest
                  </div>
                </div>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-smoke">
                Every plan RepRush generates carries an exact set × rep ×
                tempo prescription — not a vague "3 sets, moderate weight."
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-white/10 md:-bottom-6 md:-right-6" />
          </div>
        </div>
      </div>

      <div className="hairline" />
      <div className="overflow-hidden border-b border-white/10 bg-steel py-3">
        <div className="flex animate-marquee whitespace-nowrap text-xs uppercase tracking-[0.3em] text-smoke">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="mx-6 flex items-center gap-6">
              <span>Push · Pull · Legs</span>
              <span className="text-volt">·</span>
              <span>Form coaching in plain language</span>
              <span className="text-volt">·</span>
              <span>Progress you can graph</span>
              <span className="text-volt">·</span>
              <span>Zero cost, zero ads</span>
              <span className="text-volt">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
