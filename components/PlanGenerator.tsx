"use client";

import { useState } from "react";
import { generatePlan } from "@/lib/trainerEngine";
import { Equipment, Goal, Level, PlanDay, UserProfile, Zone } from "@/lib/types";
import { RefreshCw, Check, Clock, Dumbbell } from "lucide-react";

const GOALS: { id: Goal; label: string; desc: string }[] = [
  { id: "muscle", label: "Build muscle", desc: "Hypertrophy-focused volume" },
  { id: "strength", label: "Get stronger", desc: "Heavy, low-rep compounds" },
  { id: "fatloss", label: "Lose fat", desc: "Metabolic, higher density" },
  { id: "endurance", label: "Build endurance", desc: "Higher reps, short rest" },
  { id: "mobility", label: "Move better", desc: "Control-focused, joint-friendly" },
];

const LEVELS: { id: Level; label: string }[] = [
  { id: "beginner", label: "New to training" },
  { id: "intermediate", label: "6+ months experience" },
  { id: "advanced", label: "2+ years experience" },
];

const EQUIPMENT: { id: Equipment; label: string }[] = [
  { id: "bodyweight", label: "Bodyweight only" },
  { id: "dumbbells", label: "Dumbbells" },
  { id: "bands", label: "Resistance bands" },
  { id: "full-gym", label: "Full gym" },
];

const DAYS = [2, 3, 4, 5, 6];
const MINUTES = [20, 35, 50, 65];

export default function PlanGenerator({
  profile,
  setProfile,
  plan,
  setPlan,
}: {
  profile: UserProfile | null;
  setProfile: (p: UserProfile) => void;
  plan: PlanDay[] | null;
  setPlan: (p: PlanDay[]) => void;
}) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Partial<UserProfile>>(profile || {});

  const steps = [
    {
      title: "What's the goal?",
      body: (
        <div className="grid gap-3 sm:grid-cols-2">
          {GOALS.map((g) => (
            <button
              key={g.id}
              onClick={() => setDraft({ ...draft, goal: g.id })}
              className={`rounded-xl border p-4 text-left transition ${
                draft.goal === g.id
                  ? "border-volt bg-volt/10"
                  : "border-white/10 bg-steel hover:border-white/25"
              }`}
            >
              <div className="font-semibold text-chalk">{g.label}</div>
              <div className="mt-1 text-xs text-smoke">{g.desc}</div>
            </button>
          ))}
        </div>
      ),
      valid: !!draft.goal,
    },
    {
      title: "Training experience?",
      body: (
        <div className="grid gap-3 sm:grid-cols-3">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => setDraft({ ...draft, level: l.id })}
              className={`rounded-xl border p-4 text-left transition ${
                draft.level === l.id
                  ? "border-volt bg-volt/10"
                  : "border-white/10 bg-steel hover:border-white/25"
              }`}
            >
              <div className="font-semibold text-chalk">{l.label}</div>
            </button>
          ))}
        </div>
      ),
      valid: !!draft.level,
    },
    {
      title: "What have you got?",
      body: (
        <div className="grid gap-3 sm:grid-cols-2">
          {EQUIPMENT.map((e) => (
            <button
              key={e.id}
              onClick={() => setDraft({ ...draft, equipment: e.id })}
              className={`rounded-xl border p-4 text-left transition ${
                draft.equipment === e.id
                  ? "border-volt bg-volt/10"
                  : "border-white/10 bg-steel hover:border-white/25"
              }`}
            >
              <div className="font-semibold text-chalk">{e.label}</div>
            </button>
          ))}
        </div>
      ),
      valid: !!draft.equipment,
    },
    {
      title: "Days per week & session length?",
      body: (
        <div className="space-y-6">
          <div>
            <div className="mb-3 text-xs uppercase tracking-widest text-smoke">Days / week</div>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDraft({ ...draft, daysPerWeek: d })}
                  className={`h-12 w-12 rounded-full border font-mono text-sm transition ${
                    draft.daysPerWeek === d
                      ? "border-volt bg-volt text-ink font-bold"
                      : "border-white/15 bg-steel text-chalk hover:border-white/30"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3 text-xs uppercase tracking-widest text-smoke">Minutes / session</div>
            <div className="flex flex-wrap gap-2">
              {MINUTES.map((m) => (
                <button
                  key={m}
                  onClick={() => setDraft({ ...draft, minutesPerSession: m })}
                  className={`rounded-full border px-4 py-2.5 font-mono text-sm transition ${
                    draft.minutesPerSession === m
                      ? "border-volt bg-volt text-ink font-bold"
                      : "border-white/15 bg-steel text-chalk hover:border-white/30"
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      valid: !!draft.daysPerWeek && !!draft.minutesPerSession,
    },
  ];

  const buildPlan = () => {
    const full: UserProfile = {
      goal: draft.goal!,
      level: draft.level!,
      equipment: draft.equipment!,
      daysPerWeek: draft.daysPerWeek!,
      minutesPerSession: draft.minutesPerSession!,
      focus: [] as Zone[],
    };
    setProfile(full);
    setPlan(generatePlan(full));
  };

  const regenerate = () => {
    if (profile) setPlan(generatePlan(profile));
  };

  if (plan && profile) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-volt">Your Plan</div>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-chalk md:text-4xl">
              {profile.daysPerWeek}-DAY {profile.goal.toUpperCase()} SPLIT
            </h2>
            <p className="mt-2 text-sm text-smoke">
              {profile.level} · {profile.equipment} · ~{profile.minutesPerSession} min/session
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={regenerate}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-chalk hover:border-white/30"
            >
              <RefreshCw size={14} /> Regenerate
            </button>
            <button
              onClick={() => {
                setPlan(null as any);
                setStep(0);
              }}
              className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-chalk hover:border-white/30"
            >
              Edit answers
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {plan.map((day, i) => (
            <div
              key={i}
              className="animate-rise rounded-2xl border border-white/10 bg-steel p-6"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-smoke">{day.day}</div>
                  <div className="mt-1 font-display text-xl tracking-tight text-chalk">
                    {day.focus}
                  </div>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white/5">
                  <Dumbbell size={16} className="text-volt" />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {day.exercises.map((ex, j) => (
                  <div
                    key={j}
                    className="flex items-start justify-between gap-3 border-t border-white/10 pt-3 first:border-t-0 first:pt-0"
                  >
                    <div>
                      <div className="text-sm font-semibold text-chalk">
                        {ex.exercise.name}
                      </div>
                      <div className="mt-0.5 text-xs text-smoke">{ex.exercise.cue}</div>
                    </div>
                    <div className="shrink-0 text-right font-mono text-xs text-volt">
                      {ex.sets}×{ex.reps}
                      <div className="mt-0.5 flex items-center justify-end gap-1 text-smoke">
                        <Clock size={10} /> {ex.rest}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const current = steps[step];

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="mb-8">
        <div className="mb-3 flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= step ? "bg-volt" : "bg-white/10"
              }`}
            />
          ))}
        </div>
        <div className="text-xs uppercase tracking-widest text-smoke">
          Step {step + 1} of {steps.length}
        </div>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-chalk md:text-4xl">
          {current.title}
        </h2>
      </div>

      <div className="animate-rise" key={step}>
        {current.body}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="text-sm font-medium text-smoke disabled:opacity-0"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!current.valid}
            className="inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 text-sm font-bold text-ink disabled:opacity-30"
          >
            Next
          </button>
        ) : (
          <button
            onClick={buildPlan}
            disabled={!current.valid}
            className="inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 text-sm font-bold text-ink disabled:opacity-30"
          >
            <Check size={16} /> Generate my plan
          </button>
        )}
      </div>
    </div>
  );
}
