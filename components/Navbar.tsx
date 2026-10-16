"use client";

import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";

const TABS = [
  { id: "home", label: "Home" },
  { id: "plan", label: "Your Plan" },
  { id: "coach", label: "AI Coach" },
  { id: "library", label: "Library" },
  { id: "progress", label: "Progress" },
];

export default function Navbar({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2"
          aria-label="RepRush home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-volt text-ink">
            <Dumbbell size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg tracking-tight text-chalk">
            REP<span className="text-volt">RUSH</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => go(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === t.id
                  ? "bg-white/10 text-chalk"
                  : "text-smoke hover:text-chalk"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => go("plan")}
          className="hidden rounded-full bg-volt px-5 py-2 text-sm font-bold text-ink transition hover:brightness-95 md:block"
        >
          Build my plan
        </button>

        <button
          className="text-chalk md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 px-5 pb-4 md:hidden">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => go(t.id)}
              className={`block w-full rounded-md px-3 py-3 text-left text-sm font-medium ${
                active === t.id ? "bg-white/10 text-chalk" : "text-smoke"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
