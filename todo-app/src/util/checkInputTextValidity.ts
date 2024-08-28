export function checkInputTextValidity(text: string): boolean {
  const trimmedText = text.trim();

  if (trimmedText.length === 0) {
    return false;
  }

  // This regex allows unicode chars, spaces, hyphens, apostrophes, and periods
  const regex = /^[\p{L}\p{N}\s\-'.,]+$/u;
  if (regex.test(trimmedText)) {
    return true;
  }

  return false;
}
