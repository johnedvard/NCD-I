import { PersistentVector } from 'near-sdk-as';
/**
 * This class is only for testing and experiments
 */
@nearBindgen
export class Player {
  private isAi: boolean = false;
  // OBS! Since this is a persistentVector, we potentially save/share the same stats for all players. Similar to a static variable
  private stats: PersistentVector<string> = new PersistentVector<string>('ps');
  private abilities: string[] = [];
  constructor() {}

  setAi(value: boolean): void {
    this.isAi = value;
  }

  addStat(stat: string): void {
    this.stats.push(stat);
  }

  addAbility(ability: string): void {
    this.abilities.push(ability);
  }
}
