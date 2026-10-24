export function formatAddress(address: string): string {
  if (address.length <= 12) {
    return address;
  }
  const prefix = address.slice(0, 6);
  const suffix = address.slice(-4);
  return `${prefix}...${suffix}`;
}

