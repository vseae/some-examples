#!/usr/bin/env bash

echo 'powers of tau...'

cd simple_js

echo 'start a new "powers of tau" ceremony'
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v

echo 'generate random text...'
rnd1=""
rnd2=""
for i in {1..50}; do
    n=$(($RANDOM % 100))
    rnd1="$rnd1$n"
    n=$(($RANDOM % 100))
    rnd2="$rnd2$n"
done

echo 'contribute to the ceremony'
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v -e="$rnd1"

echo 'start phase 2...'
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v

echo 'generate .zkey file...'
snarkjs groth16 setup ../simple.r1cs pot12_final.ptau simple_0000.zkey

echo 'contribute to the phase 2 of the ceremony...'
snarkjs zkey contribute simple_0000.zkey simple_0001.zkey --name="1st Contributor Name" -v

echo 'export the verification key'
snarkjs zkey export verificationkey simple_0001.zkey verification_key.json


echo 'generating a proof...'
snarkjs groth16 prove simple_0001.zkey witness.wtns proof.json public.json


echo 'verify proof...'
snarkjs groth16 verify verification_key.json public.json proof.json

echo 'generate solidity code...'

snarkjs zkey export solidityverifier simple_0001.zkey ../../contracts/Verifier.sol

echo 'generate call...'
snarkjs generatecall