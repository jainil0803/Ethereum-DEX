const Token = artifacts.require("Token");
const Dex = artifacts.require("Dex");

module.exports = async function (deployer) {
  // Deploy Token with initial supply (e.g., 1,000,000 tokens)
  await deployer.deploy(Token, 1000000);
  const token = await Token.deployed();

  // Deploy Dex with the address of the token
  await deployer.deploy(Dex, token.address);
};
