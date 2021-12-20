import { PersistentVector } from 'near-sdk-as';
/**
 * A Japanese game where you have to write a word that starts with the previous's words last character.
 * It's intended to be played using Japanese characters, and only katakana (カタカナ)
 * You cannot write the same word that has already been used
 * The word cannot start with an illegal character (ん), then you losse and the game resets
 */
@nearBindgen
export class ShiriToriGame {
  private words: PersistentVector<string> = new PersistentVector<string>('w');
  constructor() {}

  /**
   * Adds a word to the game array if legal word.
   * Restart game (empty the array) if word was illegal.
   * @param word
   * @param lastIndex
   * @returns
   * 0 = you lost the game because the word was either already in the list, or didn't start with the previous's words last character, or ended with a special character (ん)
   * 1 = word added to list
   * 2 = error in input word (maybe empty or includes invalid characters)
   * 3 = state updateded since call was made. Another user updated the list at the same time.
   */
  addWord(word: string): number {
    // TODO (johnedvard) Make sure users's are't adding words at the same time and
    // TODO (johnedvard) Create mechanism to make sure the user is adding a word on a specific index, so we know that there weren't a user adding a word at the same time.
    if (!word || this.doesContainIllegalCharacters(word)) return 2;
    if (
      !this.doesEndWithIllegalCharacter(word) &&
      !this.doesWordExist(word) &&
      this.doesStartWithCorrectCharacter(word)
    ) {
      this.words.push(word);
      return 1;
    } else {
      // you lost. Restart the game.
      return 0;
    }
  }

  doesContainIllegalCharacters(word: string): boolean {
    // TODO (johnedvard) add regular expression check
    return false;
  }

  // Need to start with the previous's inputted word's last character
  doesStartWithCorrectCharacter(word: string): boolean {
    if (this.words.isEmpty) return true; // no words in list. Any word is OK
    const lastWord = this.words.last;

    if (lastWord && word) {
      return word.substring(0, 1) == lastWord.substring(lastWord.length - 1);
    } else {
      return false;
    }
  }

  doesEndWithIllegalCharacter(
    word: string,
    illegalCharacter: string = 'ん'
  ): boolean {
    return !!(word && word.substring(word.length - 1) == illegalCharacter);
  }

  doesWordExist(word: string): boolean {
    if (this.words.isEmpty) return false;

    let isWordFound = false;
    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i] == word) {
        isWordFound = true;
        break;
      }
    }
    return isWordFound;
  }

  getWords(): string[] {
    const stringWords: string[] = [];
    for (let i = 0; i < this.words.length; i++) {
      stringWords.push(this.words[i]);
    }
    return stringWords;
  }
}
