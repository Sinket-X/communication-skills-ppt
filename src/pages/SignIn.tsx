import { motion, type Variants } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, LogIn, TriangleAlert, User } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { checkCredentials, isUnlocked, unlock } from "@/lib/gate";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function resolveReturnTo(returnTo: string | null): string {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) return returnTo;
  return "/";
}

export default function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = resolveReturnTo(searchParams.get("returnTo"));

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alreadyUnlocked] = useState(() => isUnlocked());

  // Already signed in on this device? Skip the form.
  useEffect(() => {
    if (alreadyUnlocked) {
      navigate(returnTo, { replace: true });
    }
  }, [alreadyUnlocked, navigate, returnTo]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

    // Short delay so the press feels deliberate
    window.setTimeout(() => {
      if (checkCredentials(username, password)) {
        unlock();
        navigate(returnTo, { replace: true });
      } else {
        setError("Wrong username or password. Please try again.");
        setAttempt((a) => a + 1);
        setLoading(false);
      }
    }, 450);
  };

  return (
    <div className="nb-grid relative flex min-h-dvh items-center justify-center overflow-hidden bg-paper px-4 py-10 text-ink">
      {/* decorative shapes */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 22 }}
        className="absolute left-[7%] top-[12%] size-10 rotate-12 border-[3px] border-ink bg-ember shadow-[5px_5px_0_0_var(--color-ink)]"
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.42, type: "spring", stiffness: 300, damping: 22 }}
        className="absolute right-[8%] top-[20%] size-7 -rotate-6 border-[3px] border-ink bg-ocean shadow-[4px_4px_0_0_var(--color-ink)]"
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.54, type: "spring", stiffness: 300, damping: 22 }}
        className="absolute bottom-[14%] left-[12%] size-6 rotate-45 border-[3px] border-ink bg-leaf shadow-[4px_4px_0_0_var(--color-ink)]"
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.66, type: "spring", stiffness: 300, damping: 22 }}
        className="absolute bottom-[18%] right-[10%] size-9 -rotate-12 border-[3px] border-ink bg-blaze shadow-[5px_5px_0_0_var(--color-ink)]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-md"
      >
        {/* School identity */}
        <motion.div
          variants={item}
          className="mx-auto flex w-fit items-center gap-3 border-[3px] border-ink bg-white px-5 py-3 shadow-[5px_5px_0_0_var(--color-ink)]"
        >
          <img
            src="/school-logo.png"
            alt="CM Shri Civil Lines logo"
            className="size-9 shrink-0 object-contain"
          />
          <div className="leading-tight">
            <p className="font-display text-sm uppercase tracking-[0.12em]">
              CM Shri Civil Lines
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              School Project
            </p>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={item}
          className="mt-9 text-center font-display text-[44px] uppercase leading-[0.95] tracking-tight md:text-5xl"
        >
          Communication
          <br />
          <span className="bg-ink px-2 text-paper">Skills</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-3 text-center font-display text-xs uppercase tracking-[0.28em] text-muted-foreground"
        >
          Class 10 • Artificial Intelligence
        </motion.p>

        {/* Form card */}
        <motion.form
          variants={item}
          onSubmit={handleSubmit}
          className="mt-9 border-[3px] border-ink bg-white p-7 shadow-[8px_8px_0_0_var(--color-ink)]"
        >
          <div className="flex items-center gap-3 border-[3px] border-ink bg-blaze px-4 py-2.5">
            <Lock className="size-5 shrink-0" strokeWidth={2.6} />
            <span className="font-display text-sm uppercase tracking-[0.14em]">
              Sign in to watch
            </span>
          </div>

          <label className="mt-6 block">
            <span className="font-display text-xs uppercase tracking-[0.18em]">
              Username
            </span>
            <span className="relative mt-2 block">
              <User
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                strokeWidth={2.5}
              />
              <input
                name="username"
                autoComplete="username"
                required
                autoFocus
                placeholder="Enter your username"
                className="w-full border-[3px] border-ink bg-paper py-3 pl-10 pr-4 font-semibold outline-none transition-colors placeholder:font-medium placeholder:text-muted-foreground/60 focus:bg-blaze/40"
              />
            </span>
          </label>

          <label className="mt-5 block">
            <span className="font-display text-xs uppercase tracking-[0.18em]">
              Password
            </span>
            <span className="relative mt-2 block">
              <Lock
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                strokeWidth={2.5}
              />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="w-full border-[3px] border-ink bg-paper py-3 pl-10 pr-14 font-semibold outline-none transition-colors placeholder:font-medium placeholder:text-muted-foreground/60 focus:bg-blaze/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="nb-press absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center border-[2.5px] border-ink bg-white shadow-[2px_2px_0_0_var(--color-ink)]"
              >
                {showPassword ? (
                  <EyeOff className="size-4" strokeWidth={2.6} />
                ) : (
                  <Eye className="size-4" strokeWidth={2.6} />
                )}
              </button>
            </span>
          </label>

          {error && (
            <motion.p
              key={attempt}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="mt-5 flex items-center gap-2.5 border-[3px] border-ink bg-ember px-3.5 py-2.5 text-sm font-bold text-white"
            >
              <TriangleAlert className="size-4 shrink-0" strokeWidth={2.8} />
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="nb-press mt-6 flex w-full items-center justify-center gap-2.5 border-[3px] border-ink bg-ink py-3.5 font-display text-base uppercase tracking-[0.16em] text-paper shadow-[5px_5px_0_0_var(--color-ink)] hover:bg-ember disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-5 animate-spin" strokeWidth={2.6} />
                Checking…
              </>
            ) : (
              <>
                <LogIn className="size-5" strokeWidth={2.6} />
                Sign In
              </>
            )}
          </button>
        </motion.form>

        <motion.p
          variants={item}
          className="mt-7 text-center text-sm font-semibold text-muted-foreground"
        >
          Made by <span className="bg-blaze px-1 font-bold text-ink">Prabhat Sahu</span>
        </motion.p>
      </motion.div>
    </div>
  );
}
