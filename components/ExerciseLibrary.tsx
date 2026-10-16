"use client";

import { useMemo, useState } from "react";
import { EXERCISES } from "@/lib/exercises";
import { Zone } from "@/lib/types";
import { Search } from "lucide-react";

const ZONES: { id: Zone | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "push", label: "Push" },
  { id: "pull", label: "Pull" },
  { id: "legs", label: "Legs" },
  { id: "core", label: "Core" },
  { id: "full", label: "Full body" },
];

export default function ExerciseLibrary() {
  const [zone, setZone] = useState<Zone | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return EXERCISES.filter((e) => {
      const zoneMatch = zone === "all" || e.zone === zone;
      const queryMatch = e.name.toLowerCase().includes(query.toLowerCase());
      return zoneMatch && queryMatch;
    });
  }, [zone, query]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-volt">Library</div>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-chalk md:text-4xl">
          {EXERCISES.length} MOVEMENTS. ZERO GUESSWORK.
        </h2>
        <p className="mt-2 text-sm text-smoke">
          Every entry has a form cue you can actually use mid-set.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {ZONES.map((z) => (
            <button
              key={z.id}
              onClick={() => setZone(z.id)}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition ${
                zone === z.id
                  ? "border-volt bg-volt text-ink"
                  : "border-white/15 text-smoke hover:border-white/30"
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-smoke"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exercises"
            className="w-full rounded-full border border-white/15 bg-steel py-2.5 pl-9 pr-4 text-sm text-chalk placeholder:text-smoke focus:outline-none sm:w-56"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <div
            key={e.id}
            className="rounded-xl border border-white/10 bg-steel p-5 transition hover:border-white/25"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-semibold text-chalk">{e.name}</div>
              <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-volt">
                {e.zone}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-smoke">{e.cue}</p>
            <div className="mt-4 flex items-center gap-4 font-mono text-[11px] text-smoke">
              <span>Sets {e.sets}</span>
              <span>Tempo {e.tempo}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-smoke">
            Nothing matches that search — try a different term or zone.
          </p>
        )}
      </div>
    </div>
  );
}
