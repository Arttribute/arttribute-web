pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ArtToken is ERC20 {
    constructor() ERC20("ArtToken", "ARTRBT ") {
        uint256 initialSupply = 1000000 * (10 ** decimals());
        _mint(msg.sender, initialSupply);
    }
}