import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChartColumn,
  Check,
  Ear,
  Eye,
  Frown,
  GraduationCap,
  Hand,
  HeartHandshake,
  Languages,
  Lightbulb,
  MessageCircle,
  MessageSquareText,
  Mic,
  PenLine,
  PersonStanding,
  Play,
  Radio,
  RefreshCcw,
  Reply,
  Route,
  Send,
  Smile,
  Sparkles,
  UserRound,
  UserRoundCheck,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Fragment, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Shared animation variants                                           */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 26 },
  },
};

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface SlideCtx {
  onRestart: () => void;
}

export interface Slide {
  id: string;
  /** Small label shown in the stage chrome, e.g. "Define It" */
  kicker: string;
  title: string;
  /** Tailwind bg class used for the slide number chip */
  accent: string;
  /** Autoplay duration in seconds (0 = no autoplay) */
  duration: number;
  render: (ctx: SlideCtx) => ReactNode;
}

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */

function SlideFrame({
  number,
  kicker,
  title,
  accent,
  children,
}: {
  number: number;
  kicker: string;
  title: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="absolute inset-0 flex flex-col px-14 pb-20 pt-9"
    >
      <motion.div variants={item} className="flex items-center gap-4">
        <span
          className={cn(
            "grid size-11 place-items-center border-[3px] border-ink font-display text-lg",
            accent,
          )}
        >
          {String(number).padStart(2, "0")}
        </span>
        <span className="border-[3px] border-ink bg-ink px-4 py-1.5 font-display text-sm uppercase tracking-[0.18em] text-paper">
          {kicker}
        </span>
      </motion.div>
      <motion.h2
        variants={item}
        className="mt-6 font-display text-[52px] uppercase leading-[0.95] tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.div variants={container} className="mt-7 flex-1">
        {children}
      </motion.div>
    </motion.div>
  );
}

function IconBadge({
  icon: Icon,
  color = "bg-blaze",
  className,
}: {
  icon: typeof Mic;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid size-14 shrink-0 place-items-center border-[3px] border-ink shadow-[4px_4px_0_0_var(--color-ink)]",
        color,
        className,
      )}
    >
      <Icon className="size-7" strokeWidth={2.4} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 01 — Title slide                                                    */
/* ------------------------------------------------------------------ */

function TitleSlide() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="absolute inset-0 flex flex-col items-center justify-center px-14 pb-16 text-center"
    >
      {/* floating shape accents */}
      <motion.span
        variants={pop}
        className="absolute left-24 top-14 size-9 rotate-12 border-[3px] border-ink bg-ember shadow-[4px_4px_0_0_var(--color-ink)]"
      />
      <motion.span
        variants={pop}
        className="absolute right-28 top-20 size-6 -rotate-6 border-[3px] border-ink bg-ocean shadow-[4px_4px_0_0_var(--color-ink)]"
      />
      <motion.span
        variants={pop}
        className="absolute bottom-24 left-36 size-11 border-[3px] border-ink bg-blaze shadow-[5px_5px_0_0_var(--color-ink)]"
      />
      <motion.span
        variants={pop}
        className="absolute bottom-28 right-32 size-5 rotate-45 border-[3px] border-ink bg-leaf shadow-[4px_4px_0_0_var(--color-ink)]"
      />
      <motion.span variants={pop} className="absolute right-16 top-40 text-ember">
        <Sparkles className="size-9" strokeWidth={2.6} />
      </motion.span>

      <motion.div
        variants={item}
        className="mb-9 flex items-center gap-3 border-[3px] border-ink bg-paper px-5 py-2.5 font-display text-base uppercase tracking-[0.2em] shadow-[5px_5px_0_0_var(--color-ink)]"
      >
        <span className="size-3 bg-ember" />
        Unit 1 • Employability Skills
      </motion.div>

      <motion.h1
        variants={item}
        className="font-display text-[104px] uppercase leading-[0.9] tracking-tight"
      >
        Communication
        <br />
        <span className="inline-block bg-ink px-6 text-paper">Skills</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-8 max-w-2xl text-2xl font-medium leading-snug"
      >
        How we share ideas, understand each other, and talk to people —{" "}
        <span className="bg-blaze px-1">and to AI</span>.
      </motion.p>

      <motion.div variants={item} className="mt-10">
        <span className="inline-flex items-center gap-3 border-[3px] border-ink bg-white px-6 py-3 font-display text-2xl uppercase tracking-wide shadow-[5px_5px_0_0_var(--color-ink)]">
          <PenLine className="size-6" strokeWidth={2.5} />
          By <span className="bg-blaze px-2">Prabhat Sahu</span>
        </span>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {["Jatin", "Rashi", "Adnan", "Bhavesh", "Garima"].map((name) => (
            <span
              key={name}
              className="border-2 border-ink bg-white px-3 py-1 font-display text-sm uppercase tracking-wide shadow-[3px_3px_0_0_var(--color-ink)]"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — What is Communication?                                         */
/* ------------------------------------------------------------------ */

const KEYWORDS = [
  { icon: Send, label: "Sender", note: "who shares" },
  { icon: MessageSquareText, label: "Message", note: "what is shared" },
  { icon: UserRound, label: "Receiver", note: "who gets it" },
  { icon: Reply, label: "Feedback", note: "the reply" },
];

function WhatSlide() {
  return (
    <SlideFrame number={2} kicker="Define It" title="What is Communication?" accent="bg-blaze">
      <motion.div
        variants={item}
        className="border-[3px] border-ink bg-blaze p-7 shadow-[8px_8px_0_0_var(--color-ink)]"
      >
        <p className="text-2xl font-semibold leading-snug">
          “Communication is the process of sharing information, ideas and
          feelings between two or more people.”
        </p>
      </motion.div>

      <motion.p variants={item} className="mt-6 text-xl font-medium">
        In simple words:{" "}
        <span className="font-bold">
          you send a message → someone receives it → they reply.
        </span>
      </motion.p>

      <motion.div variants={container} className="mt-6 grid grid-cols-4 gap-5">
        {KEYWORDS.map((k) => (
          <motion.div
            key={k.label}
            variants={pop}
            className="flex flex-col items-center gap-2 border-[3px] border-ink bg-white p-5 text-center shadow-[5px_5px_0_0_var(--color-ink)]"
          >
            <k.icon className="size-8" strokeWidth={2.4} />
            <span className="font-display text-lg uppercase">{k.label}</span>
            <span className="text-xs font-semibold text-muted-foreground">
              {k.note}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — The Communication Cycle                                        */
/* ------------------------------------------------------------------ */

const CYCLE = [
  { icon: UserRound, label: "Sender", note: "the person who shares the idea" },
  { icon: MessageSquareText, label: "Message", note: "the idea or information" },
  { icon: Radio, label: "Channel", note: "how it travels — talk, text, phone" },
  { icon: UserRoundCheck, label: "Receiver", note: "the person who gets it" },
  { icon: Reply, label: "Feedback", note: "the reply that completes it" },
];

function CycleSlide() {
  return (
    <SlideFrame number={3} kicker="How It Works" title="The Communication Cycle" accent="bg-ocean">
      <div className="flex items-stretch">
        {CYCLE.map((s, i) => (
          <Fragment key={s.label}>
            <motion.div
              variants={pop}
              className="flex w-[190px] flex-col items-center border-[3px] border-ink bg-white p-4 text-center shadow-[5px_5px_0_0_var(--color-ink)]"
            >
              <s.icon className="size-8" strokeWidth={2.4} />
              <span className="mt-2 font-display text-lg uppercase">{s.label}</span>
              <span className="mt-1 text-[13px] font-medium leading-tight text-muted-foreground">
                {s.note}
              </span>
            </motion.div>
            {i < CYCLE.length - 1 && (
              <motion.div
                variants={item}
                className="flex items-center px-1.5 text-ink"
              >
                <ArrowRight className="size-7" strokeWidth={3} />
              </motion.div>
            )}
          </Fragment>
        ))}
      </div>

      <motion.div
        variants={item}
        className="mt-7 flex items-center gap-4 border-[3px] border-dashed border-ink px-5 py-4"
      >
        <RefreshCcw className="size-7 shrink-0" strokeWidth={2.5} />
        <p className="text-lg font-semibold">
          The <span className="bg-blaze px-1">feedback</span> travels back to the
          sender — and the cycle starts again. Communication only works when the
          loop is complete.
        </p>
      </motion.div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — Why Communication Matters                                      */
/* ------------------------------------------------------------------ */

const WHY = [
  {
    icon: Users,
    num: "01",
    title: "Teamwork",
    note: "Group projects and AI teams run smoothly when everyone speaks clearly.",
  },
  {
    icon: GraduationCap,
    num: "02",
    title: "Exams & Interviews",
    note: "Clear answers mean better marks, and confidence in front of others.",
  },
  {
    icon: HeartHandshake,
    num: "03",
    title: "Friendship & Respect",
    note: "People listen to you when you speak clearly and listen to them.",
  },
  {
    icon: Bot,
    num: "04",
    title: "Talking to AI",
    note: "A good prompt is communication too — the clearer you are, the better the answer.",
  },
];

function WhySlide() {
  return (
    <SlideFrame number={4} kicker="Why It Matters" title="Why Communication Matters" accent="bg-leaf">
      <motion.div variants={container} className="grid h-full grid-cols-2 gap-6">
        {WHY.map((w) => (
          <motion.div
            key={w.num}
            variants={item}
            className="flex items-start gap-5 border-[3px] border-ink bg-white p-6 shadow-[5px_5px_0_0_var(--color-ink)]"
          >
            <IconBadge icon={w.icon} color="bg-blaze" />
            <div>
              <div className="flex items-center gap-3">
                <span className="font-display text-sm text-muted-foreground">
                  {w.num}
                </span>
                <span className="font-display text-2xl uppercase">{w.title}</span>
              </div>
              <p className="mt-2 text-base font-medium leading-snug">{w.note}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — Types of Communication                                         */
/* ------------------------------------------------------------------ */

const TYPES = [
  {
    icon: Mic,
    title: "Verbal",
    note: "Spoken words — talking, phone calls, meetings.",
    color: "bg-blaze",
  },
  {
    icon: Eye,
    title: "Non-Verbal",
    note: "No words — gestures, face, body language.",
    color: "bg-ocean",
  },
  {
    icon: PenLine,
    title: "Written",
    note: "Emails, notes, letters, chat messages.",
    color: "bg-leaf",
  },
  {
    icon: ChartColumn,
    title: "Visual",
    note: "Charts, diagrams, signs, symbols.",
    color: "bg-ember",
  },
];

function TypesSlide() {
  return (
    <SlideFrame number={5} kicker="Know the Four" title="Types of Communication" accent="bg-ember">
      <motion.div variants={container} className="grid h-full grid-cols-2 gap-6">
        {TYPES.map((t) => (
          <motion.div
            key={t.title}
            variants={item}
            className={cn(
              "flex items-center gap-5 border-[3px] border-ink p-6 shadow-[5px_5px_0_0_var(--color-ink)]",
              t.color,
            )}
          >
            <IconBadge icon={t.icon} color="bg-white" />
            <div>
              <span className="font-display text-2xl uppercase">{t.title}</span>
              <p className="mt-1.5 text-base font-semibold leading-snug">{t.note}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 06 — Verbal vs Non-Verbal                                           */
/* ------------------------------------------------------------------ */

function VerbalVsNonVerbalSlide() {
  return (
    <SlideFrame number={6} kicker="Compare" title="Verbal vs Non-Verbal" accent="bg-leaf">
      <motion.div variants={container} className="flex h-full flex-col gap-6">
        <div className="grid flex-1 grid-cols-2 gap-6">
          <motion.div
            variants={item}
            className="border-[3px] border-ink bg-leaf p-7 shadow-[6px_6px_0_0_var(--color-ink)]"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center border-[3px] border-ink bg-white">
                <Mic className="size-5" strokeWidth={2.6} />
              </span>
              <h3 className="font-display text-3xl uppercase">Verbal</h3>
            </div>
            <p className="mt-4 text-lg font-semibold">Uses words.</p>
            <ul className="mt-4 space-y-3">
              {["Speaking aloud", "Writing messages", "Phone calls & meetings"].map(
                (t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 border-[3px] border-ink bg-white px-4 py-2.5 font-semibold shadow-[3px_3px_0_0_var(--color-ink)]"
                  >
                    <Check className="size-4" strokeWidth={3} /> {t}
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          <motion.div
            variants={item}
            className="border-[3px] border-ink bg-ember p-7 shadow-[6px_6px_0_0_var(--color-ink)]"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center border-[3px] border-ink bg-white">
                <Eye className="size-5" strokeWidth={2.6} />
              </span>
              <h3 className="font-display text-3xl uppercase">Non-Verbal</h3>
            </div>
            <p className="mt-4 text-lg font-semibold">No words needed.</p>
            <ul className="mt-4 space-y-3">
              {["Body language", "Facial expressions", "Tone of voice"].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 border-[3px] border-ink bg-white px-4 py-2.5 font-semibold shadow-[3px_3px_0_0_var(--color-ink)]"
                >
                  <Check className="size-4" strokeWidth={3} /> {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="border-[3px] border-ink bg-ink px-6 py-4 text-center"
        >
          <p className="font-display text-xl uppercase tracking-wide text-paper">
            Strong communicators use <span className="text-blaze">both</span> —
            words <span className="text-blaze">+</span> actions together.
          </p>
        </motion.div>
      </motion.div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 07 — Non-Verbal Communication                                       */
/* ------------------------------------------------------------------ */

const NONVERBAL = [
  { icon: Smile, title: "Facial Expressions", note: "The face shows feelings" },
  { icon: Eye, title: "Eye Contact", note: "Look at the person you talk to" },
  { icon: Hand, title: "Gestures", note: "Hands add meaning while speaking" },
  { icon: PersonStanding, title: "Posture", note: "Sit and stand straight — stay confident" },
  { icon: Volume2, title: "Tone of Voice", note: "How you say it matters too" },
];

function NonVerbalSlide() {
  return (
    <SlideFrame number={7} kicker="No Words Needed" title="Non-Verbal Communication" accent="bg-ocean">
      <motion.div
        variants={item}
        className="mb-6 flex items-center justify-center gap-3 border-[3px] border-ink bg-blaze px-5 py-3.5 shadow-[5px_5px_0_0_var(--color-ink)]"
      >
        <span className="font-display text-2xl uppercase tracking-wide">
          “Actions speak louder than words”
        </span>
      </motion.div>

      <motion.div variants={container} className="grid grid-cols-5 gap-5">
        {NONVERBAL.map((n) => (
          <motion.div
            key={n.title}
            variants={pop}
            className="flex flex-col items-center gap-3 border-[3px] border-ink bg-white p-4 text-center shadow-[5px_5px_0_0_var(--color-ink)]"
          >
            <span className="grid size-12 place-items-center border-[3px] border-ink bg-ocean shadow-[3px_3px_0_0_var(--color-ink)]">
              <n.icon className="size-6" strokeWidth={2.4} />
            </span>
            <span className="font-display text-base uppercase leading-tight">
              {n.title}
            </span>
            <span className="text-[13px] font-semibold leading-tight text-muted-foreground">
              {n.note}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 08 — Barriers to Communication                                      */
/* ------------------------------------------------------------------ */

const BARRIERS = [
  {
    icon: VolumeX,
    title: "Noise",
    problem: "Loud rooms, bad network, distractions.",
    fix: "Move to a quiet place or repeat clearly.",
  },
  {
    icon: Languages,
    title: "Language",
    problem: "Hard words or different languages.",
    fix: "Use simple words everyone understands.",
  },
  {
    icon: Frown,
    title: "Emotions",
    problem: "Anger, fear or nervousness block meaning.",
    fix: "Take a breath. Calm down first.",
  },
  {
    icon: Route,
    title: "Wrong Channel",
    problem: "Choosing the wrong way to send a message.",
    fix: "Pick the right way — talk, text or write.",
  },
];

function BarriersSlide() {
  return (
    <SlideFrame number={8} kicker="Watch Out" title="Barriers to Communication" accent="bg-ember">
      <motion.div variants={container} className="grid h-full grid-cols-2 gap-6">
        {BARRIERS.map((b) => (
          <motion.div
            key={b.title}
            variants={item}
            className="border-[3px] border-ink bg-white shadow-[5px_5px_0_0_var(--color-ink)]"
          >
            <div className="flex items-center gap-3 border-b-[3px] border-ink bg-ember px-5 py-3">
              <b.icon className="size-6" strokeWidth={2.5} />
              <span className="font-display text-xl uppercase">{b.title}</span>
            </div>
            <div className="flex h-[calc(100%-3.5rem)] flex-col justify-between gap-3 p-5">
              <p className="text-base font-semibold">{b.problem}</p>
              <p className="flex items-center gap-2 border-[3px] border-ink bg-leaf px-3 py-2 text-sm font-bold">
                <Check className="size-4 shrink-0" strokeWidth={3} />
                Fix: {b.fix}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 09 — The 7 C's                                                      */
/* ------------------------------------------------------------------ */

const SEVEN_CS = [
  { letter: "C", word: "Clear", note: "easy to understand" },
  { letter: "C", word: "Concise", note: "short and to the point" },
  { letter: "C", word: "Concrete", note: "real facts, not vague ideas" },
  { letter: "C", word: "Correct", note: "right facts and grammar" },
  { letter: "C", word: "Coherent", note: "ideas in a logical order" },
  { letter: "C", word: "Complete", note: "all the needed information" },
  { letter: "C", word: "Courteous", note: "polite and respectful" },
];

function SevenCsSlide() {
  return (
    <SlideFrame number={9} kicker="Golden Rule" title="The 7 C's of Communication" accent="bg-blaze">
      <motion.div variants={container} className="grid grid-cols-4 gap-5">
        {SEVEN_CS.map((c, i) => (
          <motion.div
            key={c.word}
            variants={pop}
            className={cn(
              "flex flex-col items-center gap-2 border-[3px] border-ink bg-white p-4 text-center shadow-[5px_5px_0_0_var(--color-ink)]",
              i === 6 && "col-span-1",
            )}
          >
            <span
              className={cn(
                "grid size-10 place-items-center border-[3px] border-ink font-display text-xl",
                i % 2 === 0 ? "bg-blaze" : "bg-ocean",
              )}
            >
              {c.letter}
            </span>
            <span className="font-display text-xl uppercase">{c.word}</span>
            <span className="text-[13px] font-semibold leading-tight text-muted-foreground">
              {c.note}
            </span>
          </motion.div>
        ))}
        <motion.div
          variants={item}
          className="col-span-4 mt-1 flex items-center justify-center gap-3 border-[3px] border-dashed border-ink px-5 py-3"
        >
          <MessageCircle className="size-6 shrink-0" strokeWidth={2.5} />
          <p className="text-lg font-semibold">
            Check every message against the 7 C's <span className="bg-blaze px-1">before you send it</span>.
          </p>
        </motion.div>
      </motion.div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 10 — Active Listening                                               */
/* ------------------------------------------------------------------ */

const LISTEN_TIPS = [
  {
    title: "Focus fully",
    note: "Put the phone away. Look at the speaker.",
  },
  {
    title: "Don't interrupt",
    note: "Let them finish their idea first.",
  },
  {
    title: "Show you understand",
    note: "Nod, smile and ask questions.",
  },
  {
    title: "Summarise",
    note: "Repeat the key point in your own words.",
  },
];

function ListeningSlide() {
  return (
    <SlideFrame number={10} kicker="Listen Well" title="Active Listening" accent="bg-leaf">
      <motion.div variants={container} className="flex h-full items-stretch gap-8">
        <motion.div
          variants={item}
          className="flex w-[340px] shrink-0 flex-col items-center justify-center border-[3px] border-ink bg-ocean p-6 text-center shadow-[6px_6px_0_0_var(--color-ink)]"
        >
          <span className="grid size-24 place-items-center border-[3px] border-ink bg-blaze shadow-[5px_5px_0_0_var(--color-ink)]">
            <Ear className="size-14" strokeWidth={2.2} />
          </span>
          <p className="mt-6 font-display text-3xl uppercase leading-none">
            Listen <span className="text-white line-through decoration-ember decoration-[4px]">≠</span>{" "}
            <br />
            Hear
          </p>
          <p className="mt-4 text-base font-semibold">
            Hearing is automatic.
            <br />
            Listening is a skill.
          </p>
        </motion.div>

        <motion.div variants={container} className="flex flex-1 flex-col justify-between gap-4">
          {LISTEN_TIPS.map((t, i) => (
            <motion.div
              key={t.title}
              variants={item}
              className="flex items-center gap-4 border-[3px] border-ink bg-white p-4 shadow-[4px_4px_0_0_var(--color-ink)]"
            >
              <span className="grid size-9 shrink-0 place-items-center border-[3px] border-ink bg-blaze font-display text-sm">
                {i + 1}
              </span>
              <div>
                <span className="font-display text-lg uppercase">{t.title}</span>
                <p className="text-sm font-semibold text-muted-foreground">
                  {t.note}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 11 — Quick Quiz (interactive)                                       */
/* ------------------------------------------------------------------ */


function ProsConsSlide() {
  return (
    <SlideFrame number={11} kicker="Pros & Cons" title="Types of Communication" accent="bg-ember">
      <motion.div variants={container} className="grid h-full grid-cols-2 gap-6">
        <motion.div variants={item} className="border-[3px] border-ink bg-white p-6 shadow-[5px_5px_0_0_var(--color-ink)] flex flex-col">
           <h3 className="font-display text-2xl uppercase">Verbal</h3>
           <p className="font-bold text-leaf mt-2">Pros: Quick, instant feedback.</p>
           <p className="font-bold text-blaze mt-1">Cons: No record, easily forgotten.</p>
           <h3 className="font-display text-2xl uppercase mt-4">Written</h3>
           <p className="font-bold text-leaf mt-2">Pros: Permanent record, precise.</p>
           <p className="font-bold text-blaze mt-1">Cons: Takes time, delayed feedback.</p>
        </motion.div>
        <motion.div variants={item} className="border-[3px] border-ink bg-white p-6 shadow-[5px_5px_0_0_var(--color-ink)] flex flex-col">
           <h3 className="font-display text-2xl uppercase">Non-Verbal</h3>
           <p className="font-bold text-leaf mt-2">Pros: Shows true feelings.</p>
           <p className="font-bold text-blaze mt-1">Cons: Can be misunderstood.</p>
           <h3 className="font-display text-2xl uppercase mt-4">Visual</h3>
           <p className="font-bold text-leaf mt-2">Pros: Easy to understand quickly.</p>
           <p className="font-bold text-blaze mt-1">Cons: Hard to explain complex ideas.</p>
        </motion.div>
      </motion.div>
    </SlideFrame>
  );
}

function FeedbackSlide() {
  return (
    <SlideFrame number={12} kicker="The Loop" title="Feedback in Communication" accent="bg-ocean">
      <motion.div variants={container} className="flex h-full flex-col gap-5">
        <motion.div variants={item} className="border-[3px] border-ink bg-white p-5 shadow-[5px_5px_0_0_var(--color-ink)]">
          <p className="text-xl font-bold">Feedback is the receiver's response to the sender's message. It completes the communication cycle.</p>
        </motion.div>
        <div className="grid grid-cols-2 gap-5 flex-1">
          <motion.div variants={item} className="border-[3px] border-ink bg-blaze p-5 shadow-[5px_5px_0_0_var(--color-ink)]">
            <h3 className="font-display text-xl uppercase text-white">Importance</h3>
            <ul className="mt-2 list-inside list-disc font-semibold text-white space-y-2">
              <li>Confirms message was received</li>
              <li>Helps improve future communication</li>
              <li>Builds better relationships</li>
            </ul>
          </motion.div>
          <motion.div variants={item} className="border-[3px] border-ink bg-leaf p-5 shadow-[5px_5px_0_0_var(--color-ink)]">
            <h3 className="font-display text-xl uppercase">Types of Feedback</h3>
            <ul className="mt-2 list-inside list-disc font-semibold space-y-2">
              <li><span className="font-bold">Positive:</span> "Great job!"</li>
              <li><span className="font-bold">Negative:</span> "This needs work."</li>
              <li><span className="font-bold">Constructive:</span> "Good, but try this."</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </SlideFrame>
  );
}

function PartsOfSpeechSlide() {
  return (
    <SlideFrame number={13} kicker="Writing Basics I" title="Parts of Speech" accent="bg-leaf">
      <motion.div variants={container} className="grid h-full grid-cols-2 gap-6">
        <motion.div variants={item} className="border-[3px] border-ink bg-white p-5 shadow-[5px_5px_0_0_var(--color-ink)]">
          <h3 className="font-display text-2xl uppercase border-b-[3px] border-ink pb-2 mb-3">Core Parts</h3>
          <ul className="space-y-4 font-semibold text-[15px]">
            <li><span className="bg-blaze px-1 text-white border-[2px] border-ink">Noun:</span> Name of person, place, thing.</li>
            <li><span className="bg-ocean px-1 text-white border-[2px] border-ink">Pronoun:</span> Replaces a noun (he, she, it).</li>
            <li><span className="bg-ember px-1 text-white border-[2px] border-ink">Verb:</span> Action word (run, write).</li>
            <li><span className="bg-leaf px-1 border-[2px] border-ink">Adjective:</span> Describes a noun.</li>
            <li><span className="bg-ink px-1 text-white border-[2px] border-ink">Adverb:</span> Describes a verb.</li>
          </ul>
        </motion.div>
        <motion.div variants={item} className="border-[3px] border-ink bg-ocean p-5 shadow-[5px_5px_0_0_var(--color-ink)] text-white">
          <h3 className="font-display text-2xl uppercase border-b-[3px] border-white pb-2 mb-3">Punctuation</h3>
          <ul className="space-y-4 font-semibold text-[15px]">
            <li><span className="font-bold font-display text-xl mr-2 bg-white text-ocean px-2 py-0.5 border-[2px] border-ink">.</span> Full stop (Ends sentence)</li>
            <li><span className="font-bold font-display text-xl mr-2 bg-white text-ocean px-2 py-0.5 border-[2px] border-ink">,</span> Comma (Brief pause)</li>
            <li><span className="font-bold font-display text-xl mr-2 bg-white text-ocean px-2 py-0.5 border-[2px] border-ink">?</span> Question Mark (Asking)</li>
            <li><span className="font-bold font-display text-xl mr-2 bg-white text-ocean px-2 py-0.5 border-[2px] border-ink">!</span> Exclamation (Strong emotion)</li>
            <li className="mt-6 border-[2px] border-white p-3"><span className="underline uppercase tracking-wider text-sm">Capitalise:</span><br/> First word, names, and 'I'.</li>
          </ul>
        </motion.div>
      </motion.div>
    </SlideFrame>
  );
}

function SentencesSlide() {
  return (
    <SlideFrame number={14} kicker="Writing Basics II" title="Sentences" accent="bg-blaze">
      <motion.div variants={container} className="flex h-full flex-col gap-4">
        <motion.div variants={item} className="border-[3px] border-ink bg-white p-4 shadow-[4px_4px_0_0_var(--color-ink)]">
          <p className="text-lg font-bold">A sentence is a group of words that makes complete sense.</p>
          <p className="text-md font-semibold text-muted-foreground mt-2"><span className="text-ink">Parts:</span> Subject (who/what) + Predicate (action/info).</p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 flex-1">
          <motion.div variants={item} className="border-[3px] border-ink bg-ember p-4 shadow-[4px_4px_0_0_var(--color-ink)]">
            <h3 className="font-display text-xl uppercase mb-3">Kinds of Sentences</h3>
            <ul className="space-y-3 font-semibold text-sm">
              <li>1. <span className="font-bold bg-white px-1 border-[2px] border-ink">Assertive:</span> States a fact.</li>
              <li>2. <span className="font-bold bg-white px-1 border-[2px] border-ink">Interrogative:</span> Asks a question.</li>
              <li>3. <span className="font-bold bg-white px-1 border-[2px] border-ink">Imperative:</span> Gives a command.</li>
              <li>4. <span className="font-bold bg-white px-1 border-[2px] border-ink">Exclamatory:</span> Shows emotion.</li>
            </ul>
          </motion.div>
          <motion.div variants={item} className="border-[3px] border-ink bg-leaf p-4 shadow-[4px_4px_0_0_var(--color-ink)]">
            <h3 className="font-display text-xl uppercase mb-3">Phrases</h3>
            <p className="font-semibold text-sm">A group of words without a subject and verb. It makes sense, but not complete sense.</p>
            <div className="mt-4 font-bold bg-white border-[2px] border-ink p-3 text-sm">
              <span className="text-muted-foreground uppercase text-xs block mb-1">Examples:</span>
              "in the morning"<br/>"on the table"
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SlideFrame>
  );
}

function ActivePassiveSlide() {
  return (
    <SlideFrame number={15} kicker="Writing Basics III" title="Active & Passive Voice" accent="bg-ocean">
      <motion.div variants={container} className="grid h-full grid-cols-2 gap-6">
        <motion.div variants={item} className="border-[3px] border-ink bg-white p-6 shadow-[5px_5px_0_0_var(--color-ink)] flex flex-col">
          <h3 className="font-display text-3xl uppercase text-blaze">Active Voice</h3>
          <p className="mt-3 text-lg font-semibold">The subject performs the action.</p>
          <div className="mt-6 border-l-[4px] border-blaze pl-4">
            <p className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Formula:</p>
            <p className="font-bold mt-1 text-lg">Subject + Verb + Object</p>
          </div>
          <div className="mt-auto border-[3px] border-ink bg-paper p-4 text-center">
            <p className="font-bold italic text-lg">"Ram writes a letter."</p>
          </div>
        </motion.div>
        <motion.div variants={item} className="border-[3px] border-ink bg-white p-6 shadow-[5px_5px_0_0_var(--color-ink)] flex flex-col">
          <h3 className="font-display text-3xl uppercase text-ocean">Passive Voice</h3>
          <p className="mt-3 text-lg font-semibold">The subject receives the action.</p>
          <div className="mt-6 border-l-[4px] border-ocean pl-4">
            <p className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Formula:</p>
            <p className="font-bold mt-1 text-lg">Object + Verb + Subject</p>
          </div>
          <div className="mt-auto border-[3px] border-ink bg-paper p-4 text-center">
            <p className="font-bold italic text-lg">"A letter is written by Ram."</p>
          </div>
        </motion.div>
      </motion.div>
    </SlideFrame>
  );
}

function ParagraphsSlide() {
  return (
    <SlideFrame number={16} kicker="Writing Basics IV" title="Paragraph Construction" accent="bg-ember">
      <motion.div variants={container} className="flex h-full flex-col gap-5">
        <motion.div variants={item} className="border-[3px] border-ink bg-blaze p-5 text-white shadow-[5px_5px_0_0_var(--color-ink)]">
          <p className="text-xl font-bold">A paragraph is a group of sentences organised around a single topic or idea.</p>
        </motion.div>
        <div className="flex-1 grid grid-cols-3 gap-4">
          <motion.div variants={item} className="border-[3px] border-ink bg-white p-4 shadow-[4px_4px_0_0_var(--color-ink)] text-center flex flex-col justify-center items-center">
             <span className="grid size-12 place-items-center border-[3px] border-ink bg-ocean font-display text-2xl text-white mb-4">1</span>
             <h4 className="font-display uppercase text-[16px]">Topic Sentence</h4>
             <p className="text-[13px] font-semibold text-muted-foreground mt-2">Introduces the main idea.</p>
          </motion.div>
          <motion.div variants={item} className="border-[3px] border-ink bg-white p-4 shadow-[4px_4px_0_0_var(--color-ink)] text-center flex flex-col justify-center items-center">
             <span className="grid size-12 place-items-center border-[3px] border-ink bg-leaf font-display text-2xl mb-4">2</span>
             <h4 className="font-display uppercase text-[16px]">Supporting Details</h4>
             <p className="text-[13px] font-semibold text-muted-foreground mt-2">Explains and gives examples.</p>
          </motion.div>
          <motion.div variants={item} className="border-[3px] border-ink bg-white p-4 shadow-[4px_4px_0_0_var(--color-ink)] text-center flex flex-col justify-center items-center">
             <span className="grid size-12 place-items-center border-[3px] border-ink bg-ember font-display text-2xl mb-4">3</span>
             <h4 className="font-display uppercase text-[16px]">Closing Sentence</h4>
             <p className="text-[13px] font-semibold text-muted-foreground mt-2">Summarises the paragraph.</p>
          </motion.div>
        </div>
      </motion.div>
    </SlideFrame>
  );
}

const QUIZ = [
  {
    q: "Waving your hand to say hello is...",
    options: ["Verbal", "Non-verbal", "Written"],
    answer: 1,
  },
  {
    q: "Sending an email is which type of communication?",
    options: ["Visual", "Verbal", "Written"],
    answer: 2,
  },
  {
    q: "Which one is a barrier to communication?",
    options: ["Noise", "Feedback", "Eye contact"],
    answer: 0,
  },
];

function QuizSlide() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SlideFrame number={11} kicker="Test Yourself" title="Quick Quiz" accent="bg-ember">
      <motion.div variants={container} className="flex h-full flex-col justify-between gap-4">
        {QUIZ.map((q, i) => {
          const isOpen = open === i;
          return (
            <motion.button
              key={q.q}
              type="button"
              variants={item}
              onClick={() => setOpen(isOpen ? null : i)}
              className="border-[3px] border-ink bg-white p-4 text-left shadow-[5px_5px_0_0_var(--color-ink)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_var(--color-ink)]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-sm text-muted-foreground">
                  Q{i + 1}
                </span>
                <span className="font-display text-[11px] uppercase tracking-widest text-muted-foreground">
                  {isOpen ? "Tap to hide ▲" : "Tap to reveal ▼"}
                </span>
              </div>
              <p className="mt-1 text-xl font-bold">{q.q}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {q.options.map((o, j) => {
                  const isAnswer = j === q.answer;
                  return (
                    <span
                      key={o}
                      className={cn(
                        "border-[2.5px] border-ink px-3 py-1.5 text-sm font-bold",
                        isOpen
                          ? isAnswer
                            ? "bg-leaf"
                            : "bg-paper text-muted-foreground opacity-50"
                          : "bg-paper",
                      )}
                    >
                      {isOpen && isAnswer && (
                        <Check className="mr-1 inline size-4" strokeWidth={3.5} />
                      )}
                      {o}
                    </span>
                  );
                })}
              </div>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 flex items-center gap-2 border-[3px] border-ink bg-leaf px-4 py-2.5 font-display text-sm uppercase">
                    <Lightbulb className="size-4" strokeWidth={2.6} />
                    Answer: {q.options[q.answer]}
                  </p>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 12 — Key Takeaways / End                                            */
/* ------------------------------------------------------------------ */

const RECAP = [
  { title: "Share", note: "Communication = sharing ideas & feelings" },
  { title: "Cycle", note: "Sender → Message → Channel → Receiver → Feedback" },
  { title: "4 Types", note: "Verbal, non-verbal, written, visual" },
  { title: "Barriers", note: "Noise, language, emotions, wrong channel" },
  { title: "7 C's", note: "Clear, concise, correct, complete, courteous…" },
  { title: "Listen", note: "Listen actively — don't just hear" },
];

function RecapSlide({ onRestart }: SlideCtx) {
  return (
    <SlideFrame number={17} kicker="Remember This" title="Key Takeaways" accent="bg-leaf">
      <motion.div variants={container} className="flex h-full flex-col gap-5">
        <div className="grid grid-cols-3 gap-4">
          {RECAP.map((r) => (
            <motion.div
              key={r.title}
              variants={item}
              className="border-[3px] border-ink bg-white p-4 shadow-[4px_4px_0_0_var(--color-ink)]"
            >
              <span className="font-display text-lg uppercase">{r.title}</span>
              <p className="mt-1 text-[13px] font-semibold leading-tight text-muted-foreground">
                {r.note}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={item}
          className="flex flex-1 flex-col items-center justify-center border-[3px] border-ink bg-blaze p-6 text-center shadow-[6px_6px_0_0_var(--color-ink)]"
        >
          <p className="font-display text-5xl uppercase">Thank You!</p>
          <p className="mt-2 text-lg font-semibold">
            Practice a little communication every day — with people, and with AI.
          </p>
          <button
            type="button"
            onClick={onRestart}
            className="nb-press mt-5 flex items-center gap-2 border-[3px] border-ink bg-ink px-6 py-3 font-display text-base uppercase text-paper shadow-[5px_5px_0_0_var(--color-ink)] hover:bg-ember"
          >
            <Play className="size-5" /> Replay presentation
          </button>
        </motion.div>
      </motion.div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* The deck                                                            */
/* ------------------------------------------------------------------ */

export const SLIDES: Slide[] = [
  {
    id: "title",
    kicker: "Class 10 • Artificial Intelligence",
    title: "Welcome",
    accent: "bg-blaze",
    duration: 9,
    render: () => <TitleSlide />,
  },
  {
    id: "what",
    kicker: "Define It",
    title: "What is Communication?",
    accent: "bg-blaze",
    duration: 11,
    render: () => <WhatSlide />,
  },
  {
    id: "cycle",
    kicker: "How It Works",
    title: "The Communication Cycle",
    accent: "bg-ocean",
    duration: 12,
    render: () => <CycleSlide />,
  },
  {
    id: "why",
    kicker: "Why It Matters",
    title: "Why Communication Matters",
    accent: "bg-leaf",
    duration: 11,
    render: () => <WhySlide />,
  },
  {
    id: "types",
    kicker: "Know the Four",
    title: "Types of Communication",
    accent: "bg-ember",
    duration: 11,
    render: () => <TypesSlide />,
  },
  {
    id: "verbal-vs-nonverbal",
    kicker: "Compare",
    title: "Verbal vs Non-Verbal",
    accent: "bg-leaf",
    duration: 11,
    render: () => <VerbalVsNonVerbalSlide />,
  },
  {
    id: "nonverbal",
    kicker: "No Words Needed",
    title: "Non-Verbal Communication",
    accent: "bg-ocean",
    duration: 11,
    render: () => <NonVerbalSlide />,
  },
  {
    id: "barriers",
    kicker: "Watch Out",
    title: "Barriers to Communication",
    accent: "bg-ember",
    duration: 12,
    render: () => <BarriersSlide />,
  },
  {
    id: "seven-cs",
    kicker: "Golden Rule",
    title: "The 7 C's of Communication",
    accent: "bg-blaze",
    duration: 12,
    render: () => <SevenCsSlide />,
  },
  {
    id: "listening",
    kicker: "Listen Well",
    title: "Active Listening",
    accent: "bg-leaf",
    duration: 11,
    render: () => <ListeningSlide />,
  },
  {
    id: "feedback",
    kicker: "The Loop",
    title: "Feedback in Communication",
    accent: "bg-ocean",
    duration: 12,
    render: () => <FeedbackSlide />,
  },
  {
    id: "parts-of-speech",
    kicker: "Writing Basics I",
    title: "Parts of Speech",
    accent: "bg-leaf",
    duration: 12,
    render: () => <PartsOfSpeechSlide />,
  },
  {
    id: "sentences",
    kicker: "Writing Basics II",
    title: "Sentences",
    accent: "bg-blaze",
    duration: 12,
    render: () => <SentencesSlide />,
  },
  {
    id: "active-passive",
    kicker: "Writing Basics III",
    title: "Active & Passive Voice",
    accent: "bg-ocean",
    duration: 12,
    render: () => <ActivePassiveSlide />,
  },
  {
    id: "paragraphs",
    kicker: "Writing Basics IV",
    title: "Paragraph Construction",
    accent: "bg-ember",
    duration: 12,
    render: () => <ParagraphsSlide />,
  },
{
    id: "quiz",
    kicker: "Test Yourself",
    title: "Quick Quiz",
    accent: "bg-ember",
    duration: 30,
    render: () => <QuizSlide />,
  },
  {
    id: "recap",
    kicker: "Remember This",
    title: "Key Takeaways",
    accent: "bg-leaf",
    duration: 999999,
    render: ({ onRestart }) => <RecapSlide onRestart={onRestart} />,
  },
];
