#!/usr/bin/env bash

echo 'computing the witness with wsm'
cd simple_js

echo -n 'a: '
read a

echo -n 'b: '
read b

echo 'generating witness...'

echo "{ \"a\": \"$a\", \"b\": \"$b\" }" > input.json

node generate_witness.js simple.wasm input.json witness.wtns
