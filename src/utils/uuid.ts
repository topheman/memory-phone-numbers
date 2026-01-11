/**
 * Generates a UUID v4 string.
 * Uses crypto.randomUUID() if available (modern browsers),
 * otherwise falls back to a manual implementation using crypto.getRandomValues()
 * which is more widely supported (including older Safari).
 */
export function generateUUID(): string {
  // Use native crypto.randomUUID() if available (Chrome 92+, Safari 15.4+, Firefox 95+)
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback: Generate UUID v4 manually using crypto.getRandomValues()
  // This works in all modern browsers including older Safari versions
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    // where x is any hexadecimal digit and y is one of 8, 9, A, or B
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    // Set version (4) and variant bits
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10

    // Convert to hex string
    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Format as UUID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20, 32),
    ].join("-");
  }

  // Last resort fallback (shouldn't happen in modern browsers)
  // This is a simple fallback that's not cryptographically secure
  // but will work in any environment
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
