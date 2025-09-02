const Token = artifacts.require("Token");
const Dex = artifacts.require("Dex");

contract("Dex", (accounts) => {
  let tokenInstance, dexInstance;
  const initialSupply = 1000000;

  before(async () => {
    tokenInstance = await Token.new(initialSupply);
    dexInstance = await Dex.new(tokenInstance.address);
  });

  it("deploys successfully", async () => {
    assert(dexInstance.address !== "");
  });

  it("allows users to deposit ETH", async () => {
    await dexInstance.depositETH({ from: accounts[0], value: web3.utils.toWei("1", "ether") });
    const balance = await dexInstance.ethBalance(accounts[0]);
    assert.equal(balance.toString(), web3.utils.toWei("1", "ether"));
  });

  it("allows users to deposit Tokens", async () => {
    // Approve Dex to spend tokens
    await tokenInstance.approve(dexInstance.address, 500, { from: accounts[0] });
    await dexInstance.depositToken(500, { from: accounts[0] });

    const tokenBalance = await dexInstance.tokenBalance(accounts[0]);
    assert.equal(tokenBalance.toNumber(), 500);
  });

  it("swaps ETH for Tokens at fixed rate", async () => {
    // Swap 1 ETH → should get 100 tokens (since rate = 1 ETH : 100 Tokens)
    await dexInstance.swapETHforToken(web3.utils.toWei("1", "ether"), { from: accounts[0] });

    const tokenBalance = await dexInstance.tokenBalance(accounts[0]);
    assert(tokenBalance.toNumber() >= 500 + 100); // previously deposited 500
  });
});
