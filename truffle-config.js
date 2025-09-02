module.exports = {
  networks: {
    // Local development with Ganache
    development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Ganache default port
      network_id: "*",       // Match any network id
    },
    // Example testnet (Goerli) - requires Infura/Alchemy + private key in .env
    // goerli: {
    //   provider: () => new HDWalletProvider(
    //     process.env.PRIVATE_KEY,
    //     `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    //   ),
    //   network_id: 5,
    //   gas: 5500000,
    // }
  },

  // Set default mocha options
  mocha: {
    timeout: 100000
  },

  // Solidity compiler
  compilers: {
    solc: {
      version: "0.8.20",  // Match your contracts
    }
  }
};
