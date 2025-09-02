const Token = artifacts.require("Token");

contract("Token", (accounts) => {
  let tokenInstance;
  const initialSupply = 1000000;

  before(async () => {
    tokenInstance = await Token.new(initialSupply);
  });

  it("deploys successfully", async () => {
    assert(tokenInstance.address !== "");
  });

  it("has a name", async () => {
    const name = await tokenInstance.name();
    assert.equal(name, "EthereumDEX Token");
  });

  it("has a symbol", async () => {
    const symbol = await tokenInstance.symbol();
    assert.equal(symbol, "EDX");
  });

  it("mints the initial supply to deployer", async () => {
    const balance = await tokenInstance.balanceOf(accounts[0]);
    assert.equal(balance.toString(), initialSupply * (10 ** 18));
  });

  it("transfers tokens between accounts", async () => {
    await tokenInstance.transfer(accounts[1], 100, { from: accounts[0] });
    const balance = await tokenInstance.balanceOf(accounts[1]);
    assert.equal(balance.toNumber(), 100);
  });

  it("approves and uses allowance", async () => {
    await tokenInstance.approve(accounts[1], 200, { from: accounts[0] });
    const allowance = await tokenInstance.allowance(accounts[0], accounts[1]);
    assert.equal(allowance.toNumber(), 200);
  });
});
