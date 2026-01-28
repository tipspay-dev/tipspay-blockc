// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address, address, uint256) external returns (bool);
}

contract HostingPayments {
    address public treasury;

    event HostingPaid(
        address payer,
        string planId,
        address token,
        uint256 amount,
        string metadataCid
    );

    constructor(address _treasury) {
        treasury = _treasury;
    }

    function payHosting(
        string calldata planId,
        address token,
        uint256 amount,
        string calldata metadataCid
    ) external {
        require(amount > 0, "Invalid amount");
        require(IERC20(token).transferFrom(msg.sender, treasury, amount));

        emit HostingPaid(msg.sender, planId, token, amount, metadataCid);
    }
}

