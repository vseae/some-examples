#!/usr/bin/env bash

echo 'clean...'
rm -rf ./simple.*
rm -rf ./simple_js
rm -rf ./simple_cpp

echo 'compile...'
circom circuits/simple.circom --r1cs --wasm --sym --c
