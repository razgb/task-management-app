export function checkWordsAgainstLimit(word: string, limit: number) {
  return word.split(/\s+/).filter(Boolean).length <= limit;
}
