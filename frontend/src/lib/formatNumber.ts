export function formatNumber(value: number, decimalPlaces: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
}

