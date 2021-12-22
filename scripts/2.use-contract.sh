#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

# export CONTRACT=dev-somethingsomething
# export ACCOUNT_ID=dev-somethingsomething or your own testnet ID
# For example
export CONTRACT=dev-1640008486408-51574320535043
export ACCOUNT_ID=johnonym.testnet

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Call 'view' functions on the contract"
echo
echo "(run this script again to see changes made by this file)"
echo ---------------------------------------------------------
echo

echo "Get the current game's regisdtered words"
near view $CONTRACT getWords

echo "Get a game's state"
near view $CONTRACT getAGame '{"word": "スル"}'

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Call 'change' functions on the contract"
echo "Remember to change the word from キング to something else (in case a game with key キング already exists on the contract)"
echo ---------------------------------------------------------
echo

## See the addWord fumctiom to understand what the error codes mean
near call $CONTRACT addWord '{"word": "キング"}' --accountId $ACCOUNT_ID

echo
echo "now run this script again to see changes made by this file"
exit 0
