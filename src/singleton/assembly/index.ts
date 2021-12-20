import { PersistentVector } from 'near-sdk-core';
import { ShiriToriGame } from './game';

@nearBindgen
export class Contract {
  private game: ShiriToriGame = new ShiriToriGame();

  helloWorld(): string {
    return 'hello world';
  }

  @mutateState()
  addWord(word: string): number {
    return this.game.addWord(word);
  }

  getWords(): string[] {
    return this.game.getWords();
  }
}
