// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

/// @title Simple Decentralized Exchange (DEX)
/// @notice Allows users to deposit ETH and tokens, and perform swaps
/// @dev Minimal example for learning purposes only, not for production use

contract Dex {
    Token public token;

    mapping(address => uint256) public ethBalance;
    mapping(address => uint256) public tokenBalance;

    event DepositedETH(address indexed user, uint256 amount);
    event DepositedToken(address indexed user, uint256 amount);
    event SwappedETHforToken(address indexed user, uint256 ethAmount, uint256 tokenAmount);
    event SwappedTokenforETH(address indexed user, uint256 tokenAmount, uint256 ethAmount);

    constructor(address _token) {
        token = Token(_token);
    }

    // Deposit ETH into the DEX
    function depositETH() public payable {
        require(msg.value > 0, "Must send ETH");
        ethBalance[msg.sender] += msg.value;
        emit DepositedETH(msg.sender, msg.value);
    }

    // Deposit ERC20 tokens into the DEX
    function depositToken(uint256 _amount) public {
        require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
        tokenBalance[msg.sender] += _amount;
        emit DepositedToken(msg.sender, _amount);
    }

    // Swap ETH for Tokens (very simple pricing, 1 ETH = 100 Tokens for demo)
    function swapETHforToken(uint256 _ethAmount) public {
        require(ethBalance[msg.sender] >= _ethAmount, "Not enough ETH deposited");
        uint256 tokenAmount = _ethAmount * 100; // fixed rate for simplicity
        require(token.balanceOf(address(this)) >= tokenAmount, "Not enough tokens in pool");

        ethBalance[msg.sender] -= _ethAmount;
        tokenBalance[msg.sender] += tokenAmount;

        emit SwappedETHforToken(msg.sender, _ethAmount, tokenAmount);
    }

    // Swap Tokens for ETH (reverse of above)
    function swapTokenforETH(uint256 _tokenAmount) public {
        require(tokenBalance[msg.sender] >= _tokenAmount, "Not enough tokens deposited");
        uint256 ethAmount = _tokenAmount / 100; // fixed rate

        require(address(this).balance >= ethAmount, "Not enough ETH in pool");

        tokenBalance[msg.sender] -= _tokenAmount;
        ethBalance[msg.sender] += ethAmount;

        emit SwappedTokenforETH(msg.sender, _tokenAmount, ethAmount);
    }
}
