export function getWordCount(word: string) {
  return word.split(/\s+/).filter(Boolean).length;
}
