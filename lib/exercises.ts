import { Exercise } from "./types";

export const EXERCISES: Exercise[] = [
  // PUSH
  { id: "pushup", name: "Push-Up", zone: "push", equipment: ["bodyweight", "dumbbells", "full-gym", "bands"], level: ["beginner", "intermediate", "advanced"], cue: "Brace your core, elbows at 45°, chest to floor.", sets: "3-4", tempo: "2-0-1" },
  { id: "incline-pushup", name: "Incline Push-Up", zone: "push", equipment: ["bodyweight"], level: ["beginner"], cue: "Hands on a bench or step, keep hips in line with shoulders.", sets: "3", tempo: "2-0-1" },
  { id: "db-bench", name: "Dumbbell Bench Press", zone: "push", equipment: ["dumbbells", "full-gym"], level: ["beginner", "intermediate", "advanced"], cue: "Drive through your feet, press up and slightly in.", sets: "4", tempo: "2-1-1" },
  { id: "barbell-bench", name: "Barbell Bench Press", zone: "push", equipment: ["full-gym"], level: ["intermediate", "advanced"], cue: "Shoulder blades pinched, bar path over your chest, not neck.", sets: "5", tempo: "2-1-1" },
  { id: "overhead-press", name: "Overhead Press", zone: "push", equipment: ["dumbbells", "full-gym"], level: ["intermediate", "advanced"], cue: "Ribs down, squeeze glutes so you don't lean back.", sets: "4", tempo: "2-0-1" },
  { id: "pike-pushup", name: "Pike Push-Up", zone: "push", equipment: ["bodyweight"], level: ["intermediate"], cue: "Hips high, crown of the head toward the floor.", sets: "3", tempo: "2-0-1" },
  { id: "dips", name: "Bench Dips", zone: "push", equipment: ["bodyweight"], level: ["beginner", "intermediate"], cue: "Elbows track back, not out, lower until 90°.", sets: "3", tempo: "2-0-1" },
  { id: "band-press", name: "Band Chest Press", zone: "push", equipment: ["bands"], level: ["beginner", "intermediate"], cue: "Anchor behind you, press forward and squeeze at full extension.", sets: "3", tempo: "2-0-2" },

  // PULL
  { id: "pullup", name: "Pull-Up", zone: "pull", equipment: ["bodyweight", "full-gym"], level: ["intermediate", "advanced"], cue: "Start from a dead hang, drive elbows to your hips.", sets: "4", tempo: "1-0-2" },
  { id: "band-row", name: "Band Row", zone: "pull", equipment: ["bands", "bodyweight"], level: ["beginner"], cue: "Squeeze shoulder blades together at the end of every rep.", sets: "3", tempo: "1-1-2" },
  { id: "db-row", name: "Single-Arm Dumbbell Row", zone: "pull", equipment: ["dumbbells", "full-gym"], level: ["beginner", "intermediate", "advanced"], cue: "Flat back, pull elbow past your ribcage.", sets: "4", tempo: "1-1-2" },
  { id: "inverted-row", name: "Inverted Row", zone: "pull", equipment: ["bodyweight"], level: ["beginner", "intermediate"], cue: "Body in a straight line, chest to the bar.", sets: "3", tempo: "1-0-2" },
  { id: "lat-pulldown", name: "Lat Pulldown", zone: "pull", equipment: ["full-gym"], level: ["beginner", "intermediate", "advanced"], cue: "Lead with your elbows, avoid swinging the torso.", sets: "4", tempo: "1-1-2" },
  { id: "face-pull", name: "Band Face Pull", zone: "pull", equipment: ["bands", "full-gym"], level: ["beginner", "intermediate", "advanced"], cue: "Pull to your forehead, thumbs point back.", sets: "3", tempo: "1-1-2" },
  { id: "superman", name: "Superman Hold", zone: "pull", equipment: ["bodyweight"], level: ["beginner"], cue: "Lift chest and thighs together, hold, don't yank.", sets: "3", tempo: "hold 20s" },

  // LEGS
  { id: "squat", name: "Bodyweight Squat", zone: "legs", equipment: ["bodyweight"], level: ["beginner"], cue: "Knees track over toes, sit back like into a chair.", sets: "3", tempo: "2-0-1" },
  { id: "goblet-squat", name: "Goblet Squat", zone: "legs", equipment: ["dumbbells", "full-gym"], level: ["beginner", "intermediate"], cue: "Hold weight at chest, elbows inside knees at the bottom.", sets: "4", tempo: "2-0-1" },
  { id: "back-squat", name: "Barbell Back Squat", zone: "legs", equipment: ["full-gym"], level: ["intermediate", "advanced"], cue: "Brace before you descend, drive the floor away.", sets: "5", tempo: "2-1-1" },
  { id: "lunge", name: "Walking Lunge", zone: "legs", equipment: ["bodyweight", "dumbbells"], level: ["beginner", "intermediate"], cue: "Front knee stacked over ankle, tall torso.", sets: "3", tempo: "2-0-1" },
  { id: "rdl", name: "Dumbbell Romanian Deadlift", zone: "legs", equipment: ["dumbbells", "full-gym"], level: ["beginner", "intermediate", "advanced"], cue: "Hinge at the hips, feel a stretch in your hamstrings.", sets: "4", tempo: "2-1-1" },
  { id: "glute-bridge", name: "Glute Bridge", zone: "legs", equipment: ["bodyweight"], level: ["beginner"], cue: "Squeeze glutes hard at the top, avoid over-arching.", sets: "3", tempo: "2-1-1" },
  { id: "step-up", name: "Step-Up", zone: "legs", equipment: ["bodyweight", "dumbbells"], level: ["beginner", "intermediate"], cue: "Drive through the heel of the lead foot.", sets: "3", tempo: "2-0-1" },
  { id: "calf-raise", name: "Standing Calf Raise", zone: "legs", equipment: ["bodyweight", "dumbbells", "full-gym"], level: ["beginner", "intermediate", "advanced"], cue: "Full stretch at the bottom, pause at the top.", sets: "3", tempo: "1-1-1" },
  { id: "wall-sit", name: "Wall Sit", zone: "legs", equipment: ["bodyweight"], level: ["beginner"], cue: "Thighs parallel to the floor, back flat on the wall.", sets: "3", tempo: "hold 30s" },

  // CORE
  { id: "plank", name: "Plank", zone: "core", equipment: ["bodyweight"], level: ["beginner"], cue: "Ribs down, glutes tight, straight line head to heel.", sets: "3", tempo: "hold 30-45s" },
  { id: "deadbug", name: "Dead Bug", zone: "core", equipment: ["bodyweight"], level: ["beginner"], cue: "Press your low back into the floor the entire time.", sets: "3", tempo: "2-1-2" },
  { id: "hanging-knee-raise", name: "Hanging Knee Raise", zone: "core", equipment: ["bodyweight", "full-gym"], level: ["intermediate", "advanced"], cue: "Curl the pelvis under, avoid swinging.", sets: "3", tempo: "2-0-2" },
  { id: "pallof-press", name: "Pallof Press", zone: "core", equipment: ["bands", "full-gym"], level: ["beginner", "intermediate"], cue: "Resist rotation — that's the whole point of the move.", sets: "3", tempo: "2-1-2" },
  { id: "russian-twist", name: "Russian Twist", zone: "core", equipment: ["bodyweight", "dumbbells"], level: ["beginner", "intermediate"], cue: "Rotate from the ribcage, not just the arms.", sets: "3", tempo: "1-0-1" },
  { id: "mountain-climber", name: "Mountain Climber", zone: "core", equipment: ["bodyweight"], level: ["beginner", "intermediate"], cue: "Keep hips low, drive knees to chest quickly.", sets: "3", tempo: "fast" },

  // FULL BODY / CONDITIONING
  { id: "burpee", name: "Burpee", zone: "full", equipment: ["bodyweight"], level: ["intermediate", "advanced"], cue: "Chest to the floor, full jump at the top.", sets: "4", tempo: "fast" },
  { id: "kb-swing", name: "Kettlebell Swing", zone: "full", equipment: ["dumbbells", "full-gym"], level: ["intermediate", "advanced"], cue: "Snap the hips, the arms are just along for the ride.", sets: "4", tempo: "fast" },
  { id: "jump-squat", name: "Jump Squat", zone: "full", equipment: ["bodyweight"], level: ["intermediate", "advanced"], cue: "Land soft, knees tracking over toes.", sets: "3", tempo: "explosive" },
  { id: "thruster", name: "Dumbbell Thruster", zone: "full", equipment: ["dumbbells", "full-gym"], level: ["intermediate", "advanced"], cue: "Squat into the press — one fluid motion.", sets: "4", tempo: "fast" },
  { id: "jumping-jack", name: "Jumping Jack", zone: "full", equipment: ["bodyweight"], level: ["beginner"], cue: "Soft knees, full arm extension overhead.", sets: "3", tempo: "fast" },
];

export function filterExercises(equipment: string, level: string) {
  return EXERCISES.filter(
    (e) => e.equipment.includes(equipment as any) && e.level.includes(level as any)
  );
}
