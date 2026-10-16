"use client";

import { useEffect, useMemo, useState } from "react";
import { LoggedSet } from "@/lib/types";
import { Plus, Trash2, TrendingUp } from "lucide-react";

const STORAGE_KEY = "reprush.logs.v1";

function loadLogs(): LoggedSet[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLogs(logs: LoggedSet[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export default function ProgressTracker() {
  const [logs, setLogs] = useState<LoggedSet[]>([]);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLogs(loadLogs());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveLogs(logs);
  }, [logs, hydrated]);

  const addLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !weight || !reps) return;
    const entry: LoggedSet = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      exerciseName: name.trim(),
      weight: Number(weight),
      reps: Number(reps),
    };
    setLogs((l) => [entry, ...l]);
    setWeight("");
    setReps("");
  };

  const removeLog = (id: string) => {
    setLogs((l) => l.filter((x) => x.id !== id));
  };

  const totalVolume = useMemo(
    () => logs.reduce((sum, l) => sum + l.weight * l.reps, 0),
    [logs]
  );

  const byDate = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of logs) {
      map.set(l.date, (map.get(l.date) || 0) + l.weight * l.reps);
    }
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-12);
  }, [logs]);

  const maxVol = Math.max(1, ...byDate.map(([, v]) => v));

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-volt">Progress</div>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-chalk md:text-4xl">
          LOG IT. WATCH IT CLIMB.
        </h2>
        <p className="mt-2 text-sm text-smoke">
          Stored privately in your browser — nothing leaves your device.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1.3fr]">
        <form
          onSubmit={addLog}
          className="h-fit rounded-2xl border border-white/10 bg-steel p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-chalk">
            <Plus size={16} className="text-volt" /> Log a set
          </div>
          <div className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Exercise (e.g. Back Squat)"
              className="w-full rounded-lg border border-white/15 bg-ink px-3.5 py-2.5 text-sm text-chalk placeholder:text-smoke focus:outline-none"
            />
            <div className="flex gap-3">
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                min="0"
                placeholder="Weight (kg)"
                className="w-full rounded-lg border border-white/15 bg-ink px-3.5 py-2.5 text-sm text-chalk placeholder:text-smoke focus:outline-none"
              />
              <input
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                type="number"
                min="0"
                placeholder="Reps"
                className="w-full rounded-lg border border-white/15 bg-ink px-3.5 py-2.5 text-sm text-chalk placeholder:text-smoke focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-volt py-2.5 text-sm font-bold text-ink"
            >
              Add to log
            </button>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-smoke">
              <TrendingUp size={13} className="text-volt" /> Total volume lifted
            </div>
            <div className="mt-1 font-mono text-2xl text-chalk">
              {totalVolume.toLocaleString()} <span className="text-sm text-smoke">kg</span>
            </div>
          </div>
        </form>

        <div className="rounded-2xl border border-white/10 bg-steel p-6">
          <div className="mb-4 text-sm font-semibold text-chalk">Volume by day</div>
          {byDate.length === 0 ? (
            <p className="py-10 text-center text-sm text-smoke">
              Log your first set to see it graphed here.
            </p>
          ) : (
            <div className="flex h-40 items-end gap-2">
              {byDate.map(([date, vol]) => (
                <div key={date} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-sm bg-volt/80 transition-all"
                    style={{ height: `${Math.max(4, (vol / maxVol) * 130)}px` }}
                    title={`${date}: ${vol}kg`}
                  />
                  <span className="text-[9px] text-smoke">{date.slice(5)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 max-h-64 space-y-2 overflow-y-auto border-t border-white/10 pt-4">
            {logs.length === 0 && (
              <p className="text-xs text-smoke">No sets logged yet.</p>
            )}
            {logs.map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between rounded-lg bg-white/5 px-3.5 py-2.5 text-sm"
              >
                <div>
                  <span className="font-medium text-chalk">{l.exerciseName}</span>
                  <span className="ml-2 font-mono text-xs text-smoke">
                    {l.weight}kg × {l.reps}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-smoke">{l.date}</span>
                  <button
                    onClick={() => removeLog(l.id)}
                    aria-label="Delete entry"
                    className="text-smoke hover:text-ember"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
