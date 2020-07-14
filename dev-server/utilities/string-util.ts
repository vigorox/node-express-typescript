/**
 * Performs common operations for strings, such as checking
 * if the string is empty or null
 */
export class StringUtil {
  static isEmpty(value: string): boolean {
    return !value || !value.trim();
  }

  static capitalize(word: string): string {
    return word.charAt(0).toUpperCase();
  }
}
