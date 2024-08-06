export function checkInputTextValidity(text: string): boolean {
    // Trim leading and trailing whitespace
    const trimmedText = text.trim();

    // Return false if text is empty
    if (trimmedText.length === 0) {
        return false;
    }

    // Allow letters, spaces, and basic punctuation in the title
    // This regex allows letters, spaces, hyphens, apostrophes, and periods
    const regex = /^[\p{L}\p{N}\s\-'.,]+$/u;
    if (!regex.test(trimmedText)) {
        return false;
    }

    return true;
}
