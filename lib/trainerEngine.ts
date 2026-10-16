import { EXERCISES } from "./exercises";
import { Exercise, Goal, Level, PlanDay, UserProfile, Zone } from "./types";

const GOAL_SETTINGS: Record<Goal, { reps: string; rest: string; label: string }> = {
  muscle: { reps: "8-12", rest: "60-90s", label: "Hypertrophy" },
  strength: { reps: "3-6", rest: "2-3min", label: "Strength" },
  fatloss: { reps: "12-15", rest: "30-45s", label: "Metabolic" },
  endurance: { reps: "15-20", rest: "30s", label: "Endurance" },
  mobility: { reps: "8-10 slow", rest: "30-45s", label: "Control" },
};

const SPLITS: Record<number, string[]> = {
  1: ["Full Body"],
  2: ["Upper Body", "Lower Body"],
  3: ["Push", "Pull", "Legs"],
  4: ["Push", "Pull", "Legs", "Full Body"],
  5: ["Push", "Pull", "Legs", "Upper Body", "Core & Conditioning"],
  6: ["Push", "Pull", "Legs", "Push", "Pull", "Legs"],
};

function zonesForFocus(dayLabel: string): Zone[] {
  const map: Record<string, Zone[]> = {
    "Push": ["push", "core"],
    "Pull": ["pull", "core"],
    "Legs": ["legs", "core"],
    "Upper Body": ["push", "pull"],
    "Lower Body": ["legs", "core"],
    "Full Body": ["full", "push", "pull", "legs"],
    "Core & Conditioning": ["core", "full"],
  };
  return map[dayLabel] || ["full"];
}

function pickExercises(zones: Zone[], equipment: string, level: Level, count: number): Exercise[] {
  const pool = EXERCISES.filter(
    (e) => zones.includes(e.zone) && e.equipment.includes(equipment as any) && e.level.includes(level)
  );
  // de-dupe by zone rotation so we don't stack 4 of the same movement pattern
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const chosen: Exercise[] = [];
  const usedIds = new Set<string>();
  for (const zone of zones) {
    const zoneEx = shuffled.filter((e) => e.zone === zone && !usedIds.has(e.id));
    for (const e of zoneEx) {
      if (chosen.length >= count) break;
      chosen.push(e);
      usedIds.add(e.id);
    }
    if (chosen.length >= count) break;
  }
  // top up if short
  for (const e of shuffled) {
    if (chosen.length >= count) break;
    if (!usedIds.has(e.id)) {
      chosen.push(e);
      usedIds.add(e.id);
    }
  }
  return chosen.slice(0, count);
}

export function generatePlan(profile: UserProfile): PlanDay[] {
  const split = SPLITS[profile.daysPerWeek] || SPLITS[3];
  const exercisesPerDay = Math.max(4, Math.min(7, Math.round(profile.minutesPerSession / 9)));
  const settings = GOAL_SETTINGS[profile.goal];

  return split.map((focus, i) => {
    const zones = zonesForFocus(focus);
    const picked = pickExercises(zones, profile.equipment, profile.level, exercisesPerDay);
    return {
      day: `Day ${i + 1}`,
      focus: `${focus} — ${settings.label}`,
      exercises: picked.map((exercise) => ({
        exercise,
        sets: profile.level === "beginner" ? 3 : profile.level === "intermediate" ? 4 : 5,
        reps: settings.reps,
        rest: settings.rest,
      })),
    };
  });
}

// ---------- Local "AI" coaching engine (zero API key required) ----------

interface Rule {
  test: RegExp;
  reply: (msg: string) => string;
}

const RULES: Rule[] = [
  {
    test: /sore|doms|hurt(s)? (a lot|bad)|pain/i,
    reply: () =>
      "General muscle soreness (DOMS) usually peaks 24-48h after training and fades within 3-4 days — light movement and hydration help. Sharp, joint, or one-sided pain is different: back off that movement and consider seeing a physical therapist if it doesn't settle in a couple of days. I'm not a medical professional, so treat this as a first read, not a diagnosis.",
  },
  {
    test: /protein/i,
    reply: () =>
      "A common target for building or maintaining muscle is roughly 1.6-2.2g of protein per kg of bodyweight per day, spread across 3-4 meals so your body always has amino acids on hand. Whole food sources (eggs, dairy, poultry, fish, legumes, tofu) work just as well as shakes — protein powder is a convenience, not a requirement.",
  },
  {
    test: /lose (weight|fat)|fat ?loss|cut(ting)?/i,
    reply: () =>
      "Fat loss comes down to a consistent calorie deficit — usually 300-500 calories under maintenance — paired with enough protein to protect muscle and enough strength training to give your body a reason to keep it. Cardio helps the deficit along, but it's not mandatory. Slow and steady (about 0.5-1% of bodyweight per week) is much easier to sustain than a crash cut.",
  },
  {
    test: /build muscle|bulk|gain (weight|muscle)|hypertrophy/i,
    reply: () =>
      "Muscle growth needs three things together: progressive overload (doing a bit more over time), enough protein, and a small calorie surplus of roughly 200-300 calories. Aim for 8-12 reps per set at a weight that leaves 1-3 reps in reserve, and give each muscle group 48 hours before hitting it hard again.",
  },
  {
    test: /rest day|overtrain|recover(y)?/i,
    reply: () =>
      "Recovery is where the adaptation actually happens — training just provides the stimulus. Aim for 7-9 hours of sleep, at least one full rest day a week, and deload (lighter volume) every 4-6 weeks. Signs you need more rest: performance dropping, resting heart rate creeping up, and motivation tanking for no clear reason.",
  },
  {
    test: /squat/i,
    reply: () =>
      "For a cleaner squat: brace your core like someone's about to poke your stomach, keep your chest tall, and push your knees out in the direction of your toes as you descend. Go as deep as you can while keeping your heels flat and your lower back neutral — depth should never come at the cost of your spine rounding.",
  },
  {
    test: /deadlift/i,
    reply: () =>
      "Start with the bar close to your shins, hips higher than your knees but lower than your shoulders, and a flat back. Take the slack out of the bar before you pull, then drive through the floor with your legs rather than yanking with your back. Keep the bar brushing your legs the whole way up.",
  },
  {
    test: /bench/i,
    reply: () =>
      "Set your shoulder blades back and down like you're tucking them in your back pockets, keep a slight arch, and lower the bar to your mid-chest with your elbows at roughly a 45° angle from your torso — flaring straight out stresses the shoulders more than it needs to.",
  },
  {
    test: /pull.?up/i,
    reply: () =>
      "Start from a dead hang with your shoulder blades relaxed, then initiate the pull by driving your elbows down toward your hips rather than just curling your arms. If a strict pull-up isn't there yet, banded pull-ups or slow negatives (jump up, lower for 4-5 seconds) build the strength fast.",
  },
  {
    test: /(motivat|lazy|don'?t want to|skip (my )?workout|give up)/i,
    reply: () =>
      "That's completely normal — motivation is unreliable by nature, which is exactly why a plan matters more than a mood. Try this: commit to just the first 5 minutes. Most of the time starting is the only hard part, and once you're moving the rest tends to follow. If you're truly gassed, a lighter session still beats a skipped one.",
  },
  {
    test: /warm ?up/i,
    reply: () =>
      "A good warm-up is 5-8 minutes: light cardio to raise your heart rate, then 2-3 sets of your first exercise at a lighter load to groove the movement pattern and prep the specific joints you're about to load.",
  },
  {
    test: /how many (days|times)/i,
    reply: () =>
      "For most goals, 3-5 sessions a week hits the sweet spot between enough stimulus and enough recovery. Beginners often do great on 3 full-body days; more advanced lifters tend to benefit from splitting muscle groups across 4-6 days.",
  },
  {
    test: /injur/i,
    reply: () =>
      "If something feels like a joint issue, sharp pain, or doesn't improve with a couple of rest days, that's worth getting checked by a physical therapist or doctor before you keep loading it. I can help you find pain-free substitute movements in the meantime if you tell me which area is bothering you.",
  },
  {
    test: /water|hydrat/i,
    reply: () =>
      "A reasonable baseline is about 30-35ml of water per kg of bodyweight per day, more on training days or in hot weather. Your urine color is an easy gut-check — pale straw is the target.",
  },
];

const FALLBACKS = [
  "Tell me a bit more — are you asking about form on a specific lift, your nutrition, recovery, or your plan itself? I'll go deeper once I know which lane we're in.",
  "I want to give you a precise answer rather than a generic one. Could you say more about what you're working on right now — a lift, a goal, or how you're feeling post-workout?",
  "Good question. If you name the exercise, goal, or symptom you're asking about, I can give you something a lot more specific than a general answer.",
];

export function localCoachReply(message: string, profile?: UserProfile | null): string {
  for (const rule of RULES) {
    if (rule.test.test(message)) return rule.reply(message);
  }
  if (/plan|program|routine|workout for me/i.test(message)) {
    return profile
      ? `Based on your profile (${profile.goal}, ${profile.level}, ${profile.daysPerWeek} days/week), head to the "Your Plan" tab — it's already generated. If you want it changed, tell me what to adjust (more days, different equipment, a different goal) and regenerate it there.`
      : `Head over to the "Your Plan" tab and run the quick 5-question quiz — I'll generate a full split built around your goal, equipment, and schedule in seconds.`;
  }
  const fallback = FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  return fallback;
}
