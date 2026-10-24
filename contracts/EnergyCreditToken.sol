// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EnergyCreditToken {
    string public name = "Verifiable Renewable Energy Credit";
    string public symbol = "vREC";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    address public owner;
    address public registry;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event RegistryUpdated(address indexed previousRegistry, address indexed newRegistry);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyRegistry() {
        require(msg.sender == registry, "Only registry");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setRegistry(address newRegistry) external onlyOwner {
        require(newRegistry != address(0), "Invalid address");
        address previousRegistry = registry;
        registry = newRegistry;
        emit RegistryUpdated(previousRegistry, newRegistry);
    }

    function mint(address recipient, uint256 amount) external onlyRegistry returns (bool) {
        require(recipient != address(0), "Invalid recipient");
        totalSupply += amount;
        balanceOf[recipient] += amount;
        emit Transfer(address(0), recipient, amount);
        return true;
    }

    function transfer(address recipient, uint256 amount) external returns (bool) {
        return executeTransfer(msg.sender, recipient, amount);
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) {
        uint256 currentAllowance = allowance[sender][msg.sender];
        require(currentAllowance >= amount, "Allowance exceeded");
        allowance[sender][msg.sender] = currentAllowance - amount;
        return executeTransfer(sender, recipient, amount);
    }

    function executeTransfer(address sender, address recipient, uint256 amount) private returns (bool) {
        require(recipient != address(0), "Invalid recipient");
        require(balanceOf[sender] >= amount, "Insufficient balance");
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }
}

