## Summary

This is a project for NEAR certified program level 1. This project was cloned from the starter template, [starter--near-sdk-as](https://github.com/Learn-NEAR/starter--near-sdk-as)

This project is based on the Japanese game, [Shiritori Game](https://en.wikipedia.org/wiki/Shiritori), where you have to write a word that starts with the previous's words last character. It's intended to be played using Japanese characters, and only katakana (カタカナ). The rules I have implemtend are simple:

1. Add one word to a list
2. You cannot write the same word that has already been used
3. You cannot write more than one consecutive word (you need to wait for someone else to add a word first)
4. The next word need to start with last word's last character
   - ['カイ','イクラ'] OK
   - ['カイ','クライ'] Not OK, you loose the game.
5. The word cannot end with an illegal character (ン), then you loose the game
6. This is a bonus rule, but we are only allowed to have one, and only one game, that starts with the same word
   - game1: ['カイ', 'イクラ'] -> try to add 'イクラ' again, game resets.
   - game2: try to add 'カイ' as the first word. Not allowed because game1 uses that word as a key, and its final.

When a player looses the game, the game restarts.

## How to run

1. `npm install`
2. deploy contract by running shell script `./scripts/1.dev-deploy.sh`
3. change CONTRACT (and ACCOUNT_ID) in "scripts/2.dev-deploy.sh" with the newly generated dev-account
4. run `./scripts/2.dev-deploy.sh` to see some example usage of the contract functions
   - Remember to change the ACCOUNT_ID each time you add a new word to the contract (because of the game's rules)

## How to test

run `npm run test` to run the tests for the game found in "src/singleton/**tests**/index.unit.spec.ts"

## Additional comments

There are a lot of experimental code in this project, but the contact for the submission is inside.

- `src/singleton/assembly/index.ts`
- `src/singleton/assembly/game.ts`
- I have also created some tests in `src/singleton/__tests__/index.unit.spec.ts`
  Ignore the rest of the files, as they are only for experimenting.

If you're not able to run the shell scripts inside ./scripts, check the README, `scripts/README.md` for some help.

## Demo Video on Loom

https://www.loom.com/share/81a53b6abe7644f8b74e4d92a569ab63
