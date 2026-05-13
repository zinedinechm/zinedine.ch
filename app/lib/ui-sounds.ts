"use client";

import { definePatch, ensureReady } from "@web-kits/audio";
import { _patch as minimalPatch } from "../../.web-kits/minimal";

const minimalUi = definePatch(minimalPatch);

let primed: Promise<void> | undefined;

function primeSounds() {
  if (typeof window === "undefined") return;
  primed ??= ensureReady().then(() => {});
  return primed;
}

export type MinimalUiSound =
  | "tap"
  | "copy"
  | "page-exit"
  | "success"
  | "page-enter"
  | "notification";

/** Fire-and-forget synthesized UI tone from the Minimal patch. */
export function playMinimal(sound: MinimalUiSound): void {
  if (typeof window === "undefined") return;
  void primeSounds()?.then(() => {
    minimalUi.play(sound);
  });
}
