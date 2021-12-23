import { Context, storage } from 'near-sdk-as';
import { ShiriToriGame } from './game';

@nearBindgen
export class Contract {
  private game: ShiriToriGame = new ShiriToriGame();

  @mutateState()
  addWord(word: string): number {
    assert(
      Context.sender == Context.predecessor,
      'Users must add words directly'
    );
    return this.game.addWord(word, Context.sender);
  }

  getWords(): string[] {
    return this.game.getWords();
  }

  getAGame(word: string): ShiriToriGame | null {
    if (storage.hasKey(word)) {
      return storage.getSome<ShiriToriGame>(word);
    }
    return null;
  }
}
