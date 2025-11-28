import type { ClassValue } from "svelte/elements";

type MaybeClassValue = ClassValue | undefined | null;

export function cn(...classes: MaybeClassValue[]) {
  return classes.filter(Boolean).join(" ").trim();
}
