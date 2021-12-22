import { PersistentVector, storage, logging } from 'near-sdk-as';

import { Player } from './player';
/**
 * A Japanese game where you have to write a word that starts with the previous's words last character.
 * It's intended to be played using Japanese characters, and only katakana (カタカナ)
 * You cannot write the same word that has already been used
 * The word cannot end with an illegal character (ン), then you loose and the game resets
 */
@nearBindgen
export class ShiriToriGame {
  private words: PersistentVector<string> = new PersistentVector<string>('w'); // The "w" is a prefix used in the contract
  private players: PersistentVector<Player> = new PersistentVector<Player>('p'); // just for testing
  private lastSignedBy: string = '';

  constructor() {}

  /**
   * Adds a word to the game array if legal word.
   * Restart game (empty the array) if word was illegal.
   * @param word
   * @param lastIndex
   * @returns
   * 0 = you lost the game because the word was either already in the list, or didn't start with the previous's words last character, or ended with a special character (ン)
   * 1 = word added to list
   * 2 = error in input word (maybe empty or includes invalid characters)
   * 3 = Trying to add a consecutive word
   * 4 = a game already exists with that key. We are not allowed to have more than one game with any given word
   * 5 = state updateded since call was made. Another user updated the list at the same time.
   */
  @mutateState()
  addWord(word: string, sender: string): number {
    // TODO (johnedvard) Make sure users's are't adding words at the same time
    // TODO (johnedvard) Create mechanism to make sure the user is adding a word on a specific index, so we know that there weren't a user adding a word at the same time.
    assert(word.length > 0, 'Word length cannot be 0');
    if (!word || this.doesContainIllegalCharacters(word)) return 2;
    if (this.lastSignedBy == sender) return 3; // can't add more than one consecutive word)
    if (this.words.length == 0 && storage.hasKey(word)) return 4; // We don't allow any game to start with the first word more than once
    if (
      !this.doesEndWithIllegalCharacter(word) &&
      !this.doesWordExist(word) &&
      this.doesStartWithCorrectCharacter(word)
    ) {
      // changing the class(singleton)'s state requires @mutateState().
      // this variable could have been stored using storage instead.
      this.lastSignedBy = sender;
      this.words.push(word);
      // update the gamestate in storage
      storage.set<ShiriToriGame>(this.words[0], this);
      return 1;
    } else {
      // you lost. Restart the game.
      while (!this.words.isEmpty) {
        this.words.pop();
      }
      this.lastSignedBy = '';
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
    illegalCharacter: string = 'ン'
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

  // ===== Everything below is just testing web assembly and smart contract in general =====

  addPlayer(): Player {
    this.players.push(new Player());
    return this.players[0];
  }

  changePlayer(index: i32, value: boolean): Player {
    const player = this.players[index];
    player.setAi(value);
    this.players[index] = player;
    // this.players[index].setAi(value); // This does not overwrite the state. Need to set the new player explicitly.
    return this.players[index];
  }

  getPlayers(): Player[] {
    const players: Player[] = [];
    for (let i = 0; i < this.players.length; i++) {
      players.push(this.players[i]);
    }
    return players;
  }

  addStatToPlayer(index: i32, stat: string): Player {
    const player = this.players[index];
    player.addStat(stat);
    this.players[index] = player;
    return this.players[index];
  }

  addAbility(index: i32, ability: string): Player {
    const player = this.players[index];
    player.addAbility(ability);
    this.players[index] = player;
    return this.players[index];
  }
}
