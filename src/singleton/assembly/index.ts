import { Context, storage } from 'near-sdk-as';
import { ShiriToriGame } from './game';
import { Player } from './player';

@nearBindgen
export class Contract {
  private notMutatable: string = 'foo';
  private mutatable: string = 'bar';
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

  getGame(): ShiriToriGame {
    return this.game;
  }

  getAGame(word: string): ShiriToriGame | null {
    if (storage.hasKey(word)) {
      return storage.getSome<ShiriToriGame>(word);
    }
    return null;
  }

  // ===== Everything below is just testing web assembly and smart contract in general =====

  addPlayer(): Player {
    return this.game.addPlayer();
  }

  changePlayer(index: i32, value: boolean): Player {
    return this.game.changePlayer(index, value);
  }

  getPlayers(): Player[] {
    return this.game.getPlayers();
  }

  addStatToPlayer(index: i32, stat: string): Player {
    return this.game.addStatToPlayer(index, stat);
  }

  changeNotMutatable(): string {
    this.notMutatable = 'asd';
    // This will not overwrite the state, becase we don't use the @mutateState decorator
    return this.notMutatable;
  }

  @mutateState()
  changeMutatable(): string {
    // This will overwritten the state, becase we use the @mutateState decorator
    this.mutatable = 'asd';
    return this.mutatable;
  }

  getSomeState(): string {
    return this.notMutatable + ' - ' + this.mutatable;
  }

  addAbility(index: i32, ability: string): Player {
    return this.game.addAbility(index, ability);
  }
}
