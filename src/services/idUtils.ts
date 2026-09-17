/**
 * Generates a clean, modern 6-character Short UUID for shareable WhatsApp links.
 * E.g., 'k8s2d9'
 */
export function generateShortId(): string {
  const chars = "23456789abcdefghjkmnpqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
