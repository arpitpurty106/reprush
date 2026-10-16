"use client";

import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-volt text-ink">
            <Dumbbell size={14} strokeWidth={2.5} />
          </span>
          <span className="font-display text-sm tracking-tight text-chalk">
            REP<span className="text-volt">RUSH</span>
          </span>
        </div>
        <p className="text-xs text-smoke">
          Free, forever. RepRush gives general fitness guidance, not medical
          advice. Talk to a professional for injuries or persistent pain.
        </p>
      </div>
    </footer>
  );
}
