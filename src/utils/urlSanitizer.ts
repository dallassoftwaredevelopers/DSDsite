/**
 * Sanitize a generic external URL.
 * Only allows HTTPS URLs to prevent javascript: and data: XSS attacks.
 *
 * @param url - The URL to sanitize
 * @returns The sanitized URL if valid, null otherwise
 */
export function sanitizeExternalUrl(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:') {
      return parsed.href;
    }
    return null;
  } catch {
    return null;
  }
}
