import { NextRequest, NextResponse } from "next/server";
import { localCoachReply } from "@/lib/trainerEngine";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are Coach, the AI trainer inside RepRush, a free fitness app. You are encouraging, direct, and give evidence-based fitness, strength-training, and nutrition guidance in a few short sentences (under 120 words). You are not a doctor — for injuries or medical symptoms, recommend seeing a professional. Never invent extreme or unsafe advice. Keep the tone like a knowledgeable training partner, not a corporate assistant.`;

export async function POST(req: NextRequest) {
  try {
    const { message, profile } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // Zero-config fallback: works for every user, no key required.
      const reply = localCoachReply(message, profile ?? null);
      return NextResponse.json({ reply, source: "local" });
    }

    const contextLine = profile
      ? `User profile — goal: ${profile.goal}, level: ${profile.level}, equipment: ${profile.equipment}, days/week: ${profile.daysPerWeek}.`
      : "";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system: `${SYSTEM_PROMPT} ${contextLine}`,
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      const reply = localCoachReply(message, profile ?? null);
      return NextResponse.json({ reply, source: "local-fallback" });
    }

    const data = await response.json();
    const text =
      data?.content?.find((c: any) => c.type === "text")?.text ??
      localCoachReply(message, profile ?? null);

    return NextResponse.json({ reply: text, source: "claude" });
  } catch (err) {
    return NextResponse.json(
      { reply: localCoachReply("", null), source: "error-fallback" },
      { status: 200 }
    );
  }
}
