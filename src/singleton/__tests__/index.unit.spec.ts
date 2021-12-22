import { Contract } from '../assembly';

let contract: Contract;

beforeEach(() => {
  contract = new Contract();
});

describe('Contract', () => {
  it('adds word', () => {
    expect(contract.getGame().addWord('コイ', 'a')).toStrictEqual(1);
    expect(contract.getWords().length).toStrictEqual(1);
  });

  it('cannot save same word', () => {
    expect(contract.getGame().addWord('コイ', 'a')).toStrictEqual(1);
    expect(contract.getGame().addWord('コイ', 'b')).toStrictEqual(0);
    expect(contract.getWords().length).toStrictEqual(0);
  });

  it('cannot save illegal word', () => {
    expect(contract.getGame().addWord('コイ', 'a')).toStrictEqual(1);
    expect(contract.getGame().addWord('コイン', 'b')).toStrictEqual(0);
    expect(contract.getWords().length).toStrictEqual(0);
  });

  it('must add word that start with correct character', () => {
    expect(contract.getGame().addWord('コイ', 'a')).toStrictEqual(1);
    expect(contract.getGame().addWord('タマゴ', 'b')).toStrictEqual(0);
    expect(contract.getWords().length).toStrictEqual(0);
  });

  it('cannot add more than one word at the time by the same sender', () => {
    expect(contract.getGame().addWord('コイ', 'a')).toStrictEqual(1);
    expect(contract.getGame().addWord('イクラ', 'a')).toStrictEqual(3);
  });

  it('cannot have more than one unique game id', () => {
    expect(contract.getGame().addWord('コイ', 'a')).toStrictEqual(1);
    expect(contract.getGame().addWord('タマゴ', 'b')).toStrictEqual(0);
    expect(contract.getWords().length).toStrictEqual(0);

    expect(contract.getGame().addWord('コイ', 'a')).toStrictEqual(4);
    expect(contract.getWords().length).toStrictEqual(0);
  });
});
