/**
 * Simple presentation gate.
 * Credentials live in code (per project requirement) and are never shown in the UI.
 */
const GATE_USERNAME = "prabhat";
const GATE_PASSWORD = "prabhat@123#";
const GATE_KEY = "comm-skills-unlocked";

/** Username is matched case-insensitively; password must match exactly. */
export function checkCredentials(username: string, password: string): boolean {
  return (
    username.trim().toLowerCase() === GATE_USERNAME && password === GATE_PASSWORD
  );
}

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(GATE_KEY) === "true";
  } catch {
    return false;
  }
}

export function unlock(): void {
  try {
    window.localStorage.setItem(GATE_KEY, "true");
  } catch {
    // ignore storage errors
  }
}

export function lock(): void {
  try {
    window.localStorage.removeItem(GATE_KEY);
  } catch {
    // ignore storage errors
  }
}
