"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage, UserProfile } from "@/lib/types";
import { Send, Sparkles } from "lucide-react";

const STARTERS = [
  "How much protein do I need?",
  "My squat form feels off",
  "How many rest days do I need?",
  "I don't feel like training today",
];

export default function TrainerChat({ profile }: { profile: UserProfile | null }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "coach",
      content:
        "I'm Coach, your AI trainer inside RepRush. Ask me about form, nutrition, recovery, or your plan — I'll keep it short and specific.",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { role: "user", content: text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, profile }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "coach", content: data.reply, ts: Date.now() },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "coach",
          content: "Connection hiccup — try that again in a moment.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-volt">AI Coach</div>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-chalk md:text-4xl">
          ASK ANYTHING, MID-SET.
        </h2>
        <p className="mt-2 text-sm text-smoke">
          Form cues, nutrition basics, recovery calls — answered in plain
          language, not a wall of text.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {STARTERS.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="rounded-full border border-white/15 px-3.5 py-2 text-xs text-smoke transition hover:border-volt/60 hover:text-chalk"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-steel">
        <div className="max-h-[480px] min-h-[320px] overflow-y-auto p-5 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-volt text-ink font-medium"
                    : "bg-white/5 text-chalk"
                }`}
              >
                {m.role === "coach" && (
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-volt">
                    <Sparkles size={10} /> Coach
                  </div>
                )}
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-white/5 px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-smoke [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-smoke [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-smoke" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-white/10 p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about form, food, recovery..."
            className="flex-1 bg-transparent px-3 py-2.5 text-sm text-chalk placeholder:text-smoke focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-volt text-ink disabled:opacity-30"
            aria-label="Send"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
      <p className="mt-4 text-xs text-smoke">
        Coach gives general fitness guidance, not medical advice. See a
        professional for injuries or persistent pain.
      </p>
    </div>
  );
}
