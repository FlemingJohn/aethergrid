export function calculateDelta(currentTotal: number, previousTotal: number): number {
  if (currentTotal <= previousTotal) {
    return 0;
  }
  return currentTotal - previousTotal;
}

