import { Contract } from '../assembly';

let contract: Contract;

beforeEach(() => {
  contract = new Contract();
});

describe('Contract', () => {
  it('adds word', () => {
    expect(contract.addWord('コイ')).toStrictEqual(1);
  });

  it('cannot save same word', () => {
    expect(contract.addWord('コイ')).toStrictEqual(1);
    expect(contract.addWord('コイ')).toStrictEqual(0);
  });

  it('cannot save illegal word', () => {
    expect(contract.addWord('コイ')).toStrictEqual(1);
    expect(contract.addWord('コイん')).toStrictEqual(0);
  });

  it('must add word that start with correct character', () => {
    expect(contract.addWord('コイ')).toStrictEqual(1);
    expect(contract.addWord('イクラ')).toStrictEqual(1);
  });
});
