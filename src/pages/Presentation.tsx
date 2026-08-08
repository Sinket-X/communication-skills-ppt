import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { SLIDES } from "@/components/presentation/slides";
import { lock } from "@/lib/gate";
import { cn } from "@/lib/utils";

const STAGE_W = 1280;
const STAGE_H = 720;

const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? "6%" : "-6%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "-6%" : "6%", opacity: 0 }),
};

const slideTransition = { duration: 0.45, ease: [0.32, 0.72, 0, 1] as const };

/** Scales the fixed 1280×720 stage to fit its container. */
function useStageScale() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      setScale(Math.min(el.clientWidth / STAGE_W, el.clientHeight / STAGE_H));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { ref, scale };
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(v, max));
}

export default function Presentation() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const startIndex = clamp(
    parseInt(params.get("slide") ?? "0", 10) || 0,
    0,
    SLIDES.length - 1,
  );

  const [index, setIndex] = useState(startIndex);
  const indexRef = useRef(startIndex);
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stage = useStageScale();

  const last = SLIDES.length - 1;
  const current = SLIDES[index];
  const isLast = index === last;
  const autoplay = playing && !isLast;

  const goTo = useCallback((nextIndex: number) => {
    const clamped = clamp(nextIndex, 0, SLIDES.length - 1);
    if (clamped === indexRef.current) return;
    setDirection(clamped > indexRef.current ? 1 : -1);
    indexRef.current = clamped;
    setIndex(clamped);
  }, []);

  const next = useCallback(() => {
    if (indexRef.current >= SLIDES.length - 1) {
      setDirection(1);
      indexRef.current = 0;
      setIndex(0);
      setPlaying(true);
    } else {
      goTo(indexRef.current + 1);
    }
  }, [goTo]);

  const back = useCallback(() => {
    goTo(indexRef.current - 1);
  }, [goTo]);

  const restart = useCallback(() => {
    setDirection(1);
    indexRef.current = 0;
    setIndex(0);
    setReplayKey((k) => k + 1);
    setPlaying(true);
  }, []);

  /* Keyboard controls */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const onButton = !!target?.closest("button");
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        back();
      } else if (e.key === " " && !onButton) {
        e.preventDefault();
        next();
      } else if (e.key === "p" || e.key === "P") {
        setPlaying((p) => !p);
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(SLIDES.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, back, goTo]);

  /* Fullscreen */
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen().catch(() => undefined);
    }
  };

  const handleLock = () => {
    lock();
    navigate("/signin");
  };

  const slideDuration = isLast ? 999999 : current.duration;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper text-ink">
      {/* Top bar */}
      <header className="flex shrink-0 items-center justify-between border-b-[3px] border-ink bg-white px-4 py-2 md:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid size-8 place-items-center border-[3px] border-ink bg-ink font-display text-sm text-paper transition-colors group-hover:bg-ember">
            CS
          </span>
          <span className="font-display text-sm uppercase tracking-wide">
            Communication Skills
          </span>
          <span className="hidden border-[3px] border-ink bg-blaze px-2 py-0.5 font-display text-[11px] uppercase sm:inline-flex">
            Class 10 AI
          </span>
          <span className="hidden items-center gap-1.5 border-[3px] border-ink bg-white px-2 py-0.5 lg:flex">
            <img
              src="/school-logo.png"
              alt="CM Shri Civil Lines"
              className="size-4 object-contain"
            />
            <span className="font-display text-[10px] uppercase">
              CM Shri Civil Lines
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="font-display text-sm tabular-nums">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(SLIDES.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={handleLock}
            className="nb-press grid size-7 place-items-center border-[3px] border-ink bg-paper shadow-[3px_3px_0_0_var(--color-ink)] hover:bg-blaze"
            aria-label="Lock presentation"
            title="Lock presentation"
          >
            <Lock className="size-3.5" strokeWidth={3} />
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="nb-press flex items-center gap-1.5 border-[3px] border-ink bg-paper px-3 py-1.5 font-display text-xs uppercase shadow-[3px_3px_0_0_var(--color-ink)] hover:bg-ember hover:text-white"
            aria-label="Exit presentation"
          >
            <X className="size-3.5" strokeWidth={3} /> Exit
          </button>
        </div>
      </header>

      {/* Stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 py-3">
        <div ref={stage.ref} className="relative h-full w-full">
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: STAGE_W,
              height: STAGE_H,
              transform: `translate(-50%, -50%) scale(${stage.scale})`,
            }}
          >
            {/* Auto-play progress */}
            <div className="absolute inset-x-0 top-0 z-30 h-2.5 border-b-[3px] border-ink bg-white">
              <div
                key={`${index}-${replayKey}`}
                className={cn("nb-progress h-full bg-ember", !autoplay && "nb-progress-paused")}
                style={{ animationDuration: `${slideDuration}s` }}
                onAnimationEnd={() => {
                  if (autoplay) next();
                }}
              />
            </div>

            {/* Slides */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.section
                key={`${index}-${replayKey}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="absolute inset-0 overflow-hidden border-[3px] border-ink bg-paper shadow-[8px_8px_0_0_var(--color-ink)]"
              >
                {current.render({ onRestart: restart })}
              </motion.section>
            </AnimatePresence>

            {/* Slide dots */}
            <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${s.title}`}
                  className={cn(
                    "group relative h-2.5 w-2.5 border-[2px] border-ink transition-all",
                    i === index ? "scale-125 bg-ember" : "bg-white hover:bg-blaze",
                  )}
                >
                  <span className="pointer-events-none absolute -top-9 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap border-[2px] border-ink bg-ink px-1.5 py-0.5 font-display text-[9px] uppercase tracking-wide text-paper opacity-0 transition-opacity group-hover:opacity-100">
                    {s.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Paused badge */}
            {!playing && (
              <div className="pointer-events-none absolute right-4 top-5 z-30 flex items-center gap-2 border-[3px] border-ink bg-paper px-3 py-1.5 font-display text-xs uppercase tracking-widest shadow-[3px_3px_0_0_var(--color-ink)]">
                <Pause className="size-3.5" strokeWidth={3} /> Paused
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <footer className="flex shrink-0 flex-wrap items-center justify-center gap-3 border-t-[3px] border-ink bg-white px-4 py-3">
        <button
          type="button"
          onClick={back}
          disabled={index === 0}
          className="nb-press flex items-center gap-2 border-[3px] border-ink bg-paper px-5 py-2.5 font-display text-sm uppercase shadow-[4px_4px_0_0_var(--color-ink)] hover:bg-blaze disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="size-5" strokeWidth={3} />
          Back
        </button>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause presentation" : "Play presentation"}
          className={cn(
            "nb-press flex min-w-[150px] items-center justify-center gap-2 border-[3px] border-ink px-7 py-2.5 font-display text-sm uppercase shadow-[4px_4px_0_0_var(--color-ink)] hover:text-white",
            playing ? "bg-blaze hover:bg-ember" : "bg-ember text-white hover:bg-leaf",
          )}
        >
          {playing ? (
            <>
              <Pause className="size-5" strokeWidth={3} /> Pause
            </>
          ) : (
            <>
              <Play className="size-5" strokeWidth={3} /> Play
            </>
          )}
        </button>

        <button
          type="button"
          onClick={next}
          className="nb-press flex items-center gap-2 border-[3px] border-ink bg-paper px-5 py-2.5 font-display text-sm uppercase shadow-[4px_4px_0_0_var(--color-ink)] hover:bg-ocean hover:text-white"
        >
          Next
          <ChevronRight className="size-5" strokeWidth={3} />
        </button>

        <span className="mx-1 hidden h-8 w-[3px] bg-ink sm:block" />

        <button
          type="button"
          onClick={restart}
          className="nb-press flex items-center gap-2 border-[3px] border-ink bg-paper px-4 py-2.5 font-display text-xs uppercase shadow-[4px_4px_0_0_var(--color-ink)] hover:bg-blaze"
        >
          <RotateCcw className="size-4" strokeWidth={2.6} /> Replay
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          className="nb-press flex items-center gap-2 border-[3px] border-ink bg-paper px-4 py-2.5 font-display text-xs uppercase shadow-[4px_4px_0_0_var(--color-ink)] hover:bg-blaze"
        >
          {isFullscreen ? (
            <>
              <Minimize className="size-4" strokeWidth={2.6} /> Window
            </>
          ) : (
            <>
              <Maximize className="size-4" strokeWidth={2.6} /> Fullscreen
            </>
          )}
        </button>

        <div className="hidden items-center gap-1.5 lg:flex">
          {["←", "→", "Space", "P"].map((k) => (
            <kbd
              key={k}
              className="border-2 border-ink bg-paper px-1.5 py-0.5 font-display text-[10px] uppercase shadow-[2px_2px_0_0_var(--color-ink)]"
            >
              {k}
            </kbd>
          ))}
          <span className="ml-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            keys
          </span>
        </div>
      </footer>
    </div>
  );
}
