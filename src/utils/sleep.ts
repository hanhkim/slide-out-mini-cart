export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomPatchDelay(
  min = 400,
  max = 800,
): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
