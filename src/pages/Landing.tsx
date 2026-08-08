import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Lightbulb,
  Mic,
  Pause,
  PenLine,
  Play,
  RefreshCcw,
  Send,
} from "lucide-react";
import { Link } from "react-router";
import { SLIDES } from "@/components/presentation/slides";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MARQUEE_ITEMS = [
  "Communication",
  "The Cycle",
  "Verbal & Non-Verbal",
  "Barriers",
  "The 7 C's",
  "Active Listening",
  "Quick Quiz",
  "Class 10 AI",
];

const TOPICS = [
  {
    icon: Send,
    color: "bg-blaze",
    title: "What is Communication?",
    note: "Sharing ideas, information and feelings — with people and with AI.",
  },
  {
    icon: RefreshCcw,
    color: "bg-ocean",
    title: "The Communication Cycle",
    note: "Sender → Message → Channel → Receiver → Feedback.",
  },
  {
    icon: Mic,
    color: "bg-leaf",
    title: "Types & Barriers",
    note: "Verbal, non-verbal, written, visual — and what blocks them.",
  },
  {
    icon: Lightbulb,
    color: "bg-ember",
    title: "The 7 C's & Listening",
    note: "Clear, concise, correct, complete — and listen actively.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      {/* ------------------------------ Nav ------------------------------ */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b-[3px] border-ink bg-paper px-5 py-3 md:px-10">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center border-[3px] border-ink bg-ink font-display text-lg text-paper">
            CS
          </span>
          <span className="font-display text-base uppercase tracking-tight md:text-lg">
            Communication<span className="bg-blaze px-1">Skills</span>
          </span>
          <span className="hidden items-center gap-2 border-[3px] border-ink bg-white px-2.5 py-1 shadow-[3px_3px_0_0_var(--color-ink)] md:flex">
            <img
              src="/school-logo.png"
              alt="CM Shri Civil Lines logo"
              className="size-5 object-contain"
            />
            <span className="font-display text-[10px] uppercase tracking-widest">
              CM Shri Civil Lines
            </span>
          </span>
        </Link>
        <Link
          to="/presentation"
          className="nb-press flex items-center gap-2 border-[3px] border-ink bg-ink px-4 py-2 font-display text-xs uppercase text-paper shadow-[4px_4px_0_0_var(--color-ink)] hover:bg-ember"
        >
          <Play className="size-3.5" strokeWidth={3} />
          Start Presentation
        </Link>
      </header>

      {/* ------------------------------ Hero ----------------------------- */}
      <section className="relative overflow-hidden border-b-[3px] border-ink">
        <div className="nb-grid absolute inset-0 opacity-[0.07]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-14 md:grid-cols-2 md:py-20 lg:px-10">
          {/* Copy */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="flex items-center gap-2.5 border-[3px] border-ink bg-white px-4 py-2 font-display text-xs uppercase tracking-[0.18em] shadow-[4px_4px_0_0_var(--color-ink)]">
                <span className="size-2.5 bg-ember" />
                Unit 1 • Employability Skills
              </span>
              <span className="flex items-center gap-2 border-[3px] border-ink bg-white px-3 py-2 font-display text-xs uppercase tracking-[0.18em] shadow-[4px_4px_0_0_var(--color-ink)]">
                <img
                  src="/school-logo.png"
                  alt="CM Shri Civil Lines"
                  className="size-5 object-contain"
                />
                CM Shri Civil Lines
              </span>
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
              }}
              className="mt-7 font-display text-6xl uppercase leading-[0.92] tracking-tight md:text-8xl"
            >
              Communication
              <br />
              <span className="bg-ink px-3 text-paper">Skills</span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
              }}
              className="mt-7 max-w-xl text-lg font-medium leading-relaxed"
            >
              A Class 10 AI lesson, slide by slide — from the basic definition
              and the communication cycle to the four types, the barriers, the{" "}
              <strong>7 C's</strong> and active listening.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
              }}
              className="mt-6 flex w-fit items-center gap-2.5 border-[3px] border-ink bg-white px-4 py-2 font-display text-sm uppercase tracking-wide shadow-[4px_4px_0_0_var(--color-ink)]"
            >
              <PenLine className="size-4" strokeWidth={2.5} />
              By <span className="bg-blaze px-1">Prabhat Sahu</span>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
              }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/presentation"
                className="nb-press flex items-center gap-3 border-[3px] border-ink bg-blaze px-7 py-4 font-display text-lg uppercase shadow-[6px_6px_0_0_var(--color-ink)] hover:bg-ember hover:text-white"
              >
                <Play className="size-5" strokeWidth={3} />
                Start Presentation
              </Link>
              <a
                href="#slides"
                className="nb-press flex items-center gap-2 border-[3px] border-ink bg-white px-7 py-4 font-display text-lg uppercase shadow-[6px_6px_0_0_var(--color-ink)] hover:bg-ocean hover:text-white"
              >
                See the slides
                <ArrowUpRight className="size-5" strokeWidth={3} />
              </a>
            </motion.div>

          </motion.div>

          {/* Mock slide visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -left-8 -top-8 size-24 rotate-12 border-[3px] border-ink bg-ember shadow-[6px_6px_0_0_var(--color-ink)]" />
            <div className="absolute -bottom-10 -right-4 size-16 rotate-45 border-[3px] border-ink bg-ocean shadow-[5px_5px_0_0_var(--color-ink)]" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative border-[3px] border-ink bg-white p-6 shadow-[10px_10px_0_0_var(--color-ink)]"
            >
              <div className="flex items-center justify-between">
                <span className="border-[3px] border-ink bg-ink px-3 py-1 font-display text-[11px] uppercase tracking-widest text-paper">
                  Slide 03 • The Cycle
                </span>
                <span className="font-display text-[11px] tabular-nums">03 / 12</span>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                {["SENDER", "MESSAGE", "RECEIVER"].map((t, i) => (
                  <div key={t} className="flex items-center gap-2">
                    <span className="border-[3px] border-ink bg-blaze px-3 py-2 font-display text-[10px] uppercase shadow-[3px_3px_0_0_var(--color-ink)]">
                      {t}
                    </span>
                    {i < 2 && (
                      <span className="font-display text-xs font-bold">→</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2.5">
                {["bg-ember", "bg-blaze", "bg-leaf"].map((c, i) => (
                  <div
                    key={c}
                    className="h-5 w-full border-[3px] border-ink bg-white p-0.5"
                  >
                    <div
                      className={cn("h-full", c)}
                      style={{ width: `${40 + i * 25}%` }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t-[3px] border-ink pt-4">
                <div className="flex gap-2">
                  <span className="grid size-8 place-items-center border-[3px] border-ink bg-paper shadow-[3px_3px_0_0_var(--color-ink)]">
                    <ArrowUpRight className="size-3.5 rotate-180" strokeWidth={3} />
                  </span>
                  <span className="grid size-8 place-items-center border-[3px] border-ink bg-ink text-paper shadow-[3px_3px_0_0_var(--color-ink)]">
                    <Pause className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="grid size-8 place-items-center border-[3px] border-ink bg-paper shadow-[3px_3px_0_0_var(--color-ink)]">
                    <ArrowUpRight className="size-3.5" strokeWidth={3} />
                  </span>
                </div>
                <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                  Sender → Receiver → Feedback
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------- Marquee ---------------------------- */}
      <div className="overflow-hidden border-b-[3px] border-ink bg-blaze py-3">
        <div className="nb-marquee flex w-max items-center gap-8 whitespace-nowrap font-display text-sm uppercase tracking-[0.2em]">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center gap-8">
              {MARQUEE_ITEMS.map((t) => (
                <span key={`${half}-${t}`} className="flex items-center gap-8">
                  {t}
                  <span className="size-2.5 rotate-45 border-2 border-ink bg-ink" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ----------------------------- Slides ---------------------------- */}
      <section id="slides" className="border-b-[3px] border-ink py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 border-[3px] border-ink bg-ink px-4 py-1.5 font-display text-xs uppercase tracking-[0.18em] text-paper">
                The Deck
              </span>
              <h2 className="mt-5 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl">
                12 slides. <span className="bg-blaze px-2">One big idea.</span>
              </h2>
            </div>
            <Link
              to="/presentation"
              className="nb-press flex items-center gap-2 border-[3px] border-ink bg-white px-5 py-3 font-display text-sm uppercase shadow-[4px_4px_0_0_var(--color-ink)] hover:bg-ocean hover:text-white"
            >
              Open the deck <ArrowUpRight className="size-4" strokeWidth={3} />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SLIDES.map((s, i) => (
              <Link
                key={s.id}
                to={`/presentation?slide=${i}`}
                className="group nb-press border-[3px] border-ink bg-white p-5 shadow-[5px_5px_0_0_var(--color-ink)] hover:bg-blaze"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "grid size-9 place-items-center border-[3px] border-ink font-display text-sm shadow-[3px_3px_0_0_var(--color-ink)]",
                      s.accent,
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <p className="mt-4 font-display text-lg uppercase leading-tight">
                  {s.title}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {s.kicker}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- Features --------------------------- */}
      <section className="border-b-[3px] border-ink bg-ink py-16 text-paper md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <span className="inline-flex items-center gap-2 border-[3px] border-ink bg-blaze px-4 py-1.5 font-display text-xs uppercase tracking-[0.18em] text-ink">
            In This Deck
          </span>
          <h2 className="mt-5 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            What you'll learn, <span className="bg-blaze px-2 text-ink">slide by slide</span>.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TOPICS.map((t) => (
              <div
                key={t.title}
                className="border-[3px] border-paper bg-paper p-6 text-ink shadow-[6px_6px_0_0_var(--color-blaze)] transition-transform hover:-translate-y-1"
              >
                <span
                  className={cn(
                    "grid size-12 place-items-center border-[3px] border-ink shadow-[4px_4px_0_0_var(--color-ink)]",
                    t.color,
                  )}
                >
                  <t.icon className="size-6" strokeWidth={2.5} />
                </span>
                <h3 className="mt-5 font-display text-xl uppercase">{t.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed">{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- CTA ----------------------------- */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-10">
          <div className="relative border-[3px] border-ink bg-blaze p-10 text-center shadow-[12px_12px_0_0_var(--color-ink)] md:p-16">
            <div className="absolute -right-6 -top-6 size-16 rotate-12 border-[3px] border-ink bg-ocean shadow-[5px_5px_0_0_var(--color-ink)]" />
            <div className="absolute -bottom-6 -left-6 size-20 -rotate-12 border-[3px] border-ink bg-ember shadow-[6px_6px_0_0_var(--color-ink)]" />

            <span className="inline-flex items-center gap-2 border-[3px] border-ink bg-white px-4 py-1.5 font-display text-xs uppercase tracking-[0.18em] shadow-[4px_4px_0_0_var(--color-ink)]">
              <span className="size-2.5 bg-leaf" /> Ready, Class 10?
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-7xl">
              Press play. Learn to communicate.
            </h2>
            <Link
              to="/presentation"
              className="nb-press mt-9 inline-flex items-center gap-3 border-[3px] border-ink bg-ink px-8 py-4 font-display text-lg uppercase text-paper shadow-[6px_6px_0_0_var(--color-ink)] hover:bg-ember"
            >
              <Play className="size-5" strokeWidth={3} />
              Start the Presentation
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------- Footer ---------------------------- */}
      <footer className="flex flex-col items-center justify-between gap-4 border-t-[3px] border-ink px-5 py-6 md:flex-row md:px-10">
        <div className="flex items-center gap-3">
          <img
            src="/school-logo.png"
            alt="CM Shri Civil Lines logo"
            className="size-8 border-[3px] border-ink bg-white p-0.5 object-contain"
          />
          <div className="leading-tight">
            <p className="font-display text-xs uppercase tracking-wide">
              CM Shri Civil Lines
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Communication Skills • Class 10 AI
            </p>
          </div>
        </div>
        <p className="text-xs font-medium text-muted-foreground">
          Made by <span className="font-bold text-ink">Prabhat Sahu</span>
        </p>
      </footer>
    </div>
  );
}
