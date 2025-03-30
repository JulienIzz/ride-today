#!/usr/bin/env bash
MODULE_NAME=$1

if [ -z "$MODULE_NAME" ]; then
  echo "Error: no module name supplied."
  echo "Usage: yarn create:module -- test"
  exit 1
fi

cd src/modules || exit 1
mkdir "$MODULE_NAME"
cd "$MODULE_NAME" || exit 1
mkdir components utils hooks api types
