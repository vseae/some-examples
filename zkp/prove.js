const snarkjs = require("snarkjs");
const fs = require("fs");
async function main() {
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    { a: "2", b: "3" },
    "simple_js/simple.wasm",
    "simple_js/simple_0001.zkey"
  );

  console.log("Proof: ");
  console.log(JSON.stringify(proof, null, 1));
  console.log("Public signals: ");
  console.log(JSON.stringify(publicSignals, null, 1));
  const vKey = JSON.parse(fs.readFileSync("simple_js/verification_key.json"));

  const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

  if (res === true) {
    console.log("Verification OK");
  } else {
    console.log("Invalid proof");
  }
}
main().then(() => {
  console.log("done");
  process.exit(0);
});
