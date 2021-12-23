import { VMContext } from 'near-mock-vm';
import { Contract } from '../assembly';

let contract: Contract;

beforeEach(() => {
  contract = new Contract();
  VMContext.setSigner_account_id('a');
  VMContext.setPredecessor_account_id('a');
});

describe('Contract', () => {
  it('adds word', () => {
    expect(contract.addWord('コイ')).toStrictEqual(1);
    expect(contract.getWords().length).toStrictEqual(1);
  });

  it('cannot save same word', () => {
    expect(contract.addWord('コイ')).toStrictEqual(1);
    VMContext.setSigner_account_id('b');
    VMContext.setPredecessor_account_id('b');
    expect(contract.addWord('コイ')).toStrictEqual(0);
    expect(contract.getWords().length).toStrictEqual(0);
  });

  it('cannot save illegal word', () => {
    expect(contract.addWord('コイ')).toStrictEqual(1);
    VMContext.setSigner_account_id('b');
    VMContext.setPredecessor_account_id('b');
    expect(contract.addWord('コイン')).toStrictEqual(0);
    expect(contract.getWords().length).toStrictEqual(0);
  });

  it('must add word that start with correct character', () => {
    expect(contract.addWord('コイ')).toStrictEqual(1);
    VMContext.setSigner_account_id('b');
    VMContext.setPredecessor_account_id('b');
    expect(contract.addWord('タマゴ')).toStrictEqual(0);
    expect(contract.getWords().length).toStrictEqual(0);
  });

  it('cannot add more than one word at the time by the same sender', () => {
    expect(contract.addWord('コイ')).toStrictEqual(1);
    expect(contract.addWord('イクラ')).toStrictEqual(3);
  });

  it('cannot have more than one unique game id', () => {
    expect(contract.addWord('コイ')).toStrictEqual(1);
    VMContext.setSigner_account_id('b');
    VMContext.setPredecessor_account_id('b');
    expect(contract.addWord('タマゴ')).toStrictEqual(0);
    expect(contract.getWords().length).toStrictEqual(0);
    VMContext.setSigner_account_id('a');
    VMContext.setPredecessor_account_id('a');
    expect(contract.addWord('コイ')).toStrictEqual(4);
    expect(contract.getWords().length).toStrictEqual(0);
  });
});
