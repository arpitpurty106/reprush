export type Goal = "muscle" | "strength" | "fatloss" | "endurance" | "mobility";
export type Level = "beginner" | "intermediate" | "advanced";
export type Equipment = "bodyweight" | "dumbbells" | "full-gym" | "bands";
export type Zone = "push" | "pull" | "legs" | "core" | "full";

export interface Exercise {
  id: string;
  name: string;
  zone: Zone;
  equipment: Equipment[];
  level: Level[];
  cue: string;
  sets: string;
  tempo: string;
}

export interface PlanDay {
  day: string;
  focus: string;
  exercises: {
    exercise: Exercise;
    sets: number;
    reps: string;
    rest: string;
  }[];
}

export interface UserProfile {
  goal: Goal;
  level: Level;
  equipment: Equipment;
  daysPerWeek: number;
  minutesPerSession: number;
  focus: Zone[];
}

export interface ChatMessage {
  role: "user" | "coach";
  content: string;
  ts: number;
}

export interface LoggedSet {
  id: string;
  date: string;
  exerciseName: string;
  weight: number;
  reps: number;
}
