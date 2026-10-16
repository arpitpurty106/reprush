"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PlanGenerator from "@/components/PlanGenerator";
import TrainerChat from "@/components/TrainerChat";
import ExerciseLibrary from "@/components/ExerciseLibrary";
import ProgressTracker from "@/components/ProgressTracker";
import Footer from "@/components/Footer";
import { PlanDay, UserProfile } from "@/lib/types";

export default function Home() {
  const [tab, setTab] = useState("home");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<PlanDay[] | null>(null);

  return (
    <>
      <Navbar active={tab} onChange={setTab} />

      {tab === "home" && (
        <>
          <Hero onStart={() => setTab("plan")} />
          <section className="mx-auto max-w-6xl px-5 py-16">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Your Plan",
                  desc: "A five-question quiz builds a full training split around your goal, equipment, and schedule.",
                  action: () => setTab("plan"),
                  cta: "Build it",
                },
                {
                  title: "AI Coach",
                  desc: "Ask about form, nutrition, or recovery and get a short, specific answer — mid-workout ready.",
                  action: () => setTab("coach"),
                  cta: "Ask Coach",
                },
                {
                  title: "Progress",
                  desc: "Log sets, watch total volume climb, keep everything private in your own browser.",
                  action: () => setTab("progress"),
                  cta: "Start logging",
                },
              ].map((c) => (
                <button
                  key={c.title}
                  onClick={c.action}
                  className="group rounded-2xl border border-white/10 bg-steel p-6 text-left transition hover:border-volt/50"
                >
                  <div className="font-display text-xl tracking-tight text-chalk">
                    {c.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-smoke">{c.desc}</p>
                  <div className="mt-4 text-xs font-bold uppercase tracking-widest text-volt">
                    {c.cta} →
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "plan" && (
        <PlanGenerator
          profile={profile}
          setProfile={setProfile}
          plan={plan}
          setPlan={setPlan}
        />
      )}

      {tab === "coach" && <TrainerChat profile={profile} />}

      {tab === "library" && <ExerciseLibrary />}

      {tab === "progress" && <ProgressTracker />}

      <Footer />
    </>
  );
}
