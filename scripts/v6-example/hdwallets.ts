import { ethers } from "ethers";

const main = async () => {
  const mnemonic = ethers.Mnemonic.fromPhrase(
    "deer cricket canal orphan tank trade balcony mind guard romance ramp garden version summer aisle model proud stereo defy blossom chair lottery case brief"
  );

  const numWallet = 20;
  const wallets = [];
  const basePath = "m/44'/60'/0'/0/";
  for (let i = 0; i < numWallet; i++) {
    const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, basePath + i);
    console.log(wallet.address);
    wallets.push(wallet);
  }
  const pwd = "password";
  const json = await wallets[0].encrypt(pwd);
  console.log(json);
  const wallet2 = await ethers.Wallet.fromEncryptedJson(json, pwd);
  console.log(wallet2.address);
};

main();
