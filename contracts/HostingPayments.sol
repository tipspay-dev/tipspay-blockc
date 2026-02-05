// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

interface IERC20Upgradeable {
    function transferFrom(address, address, uint256) external returns (bool);
}

contract HostingPaymentsUpgradeable is Initializable, UUPSUpgradeable, AccessControlUpgradeable {
    bytes32 public constant TREASURY_MANAGER_ROLE = keccak256("TREASURY_MANAGER_ROLE");
    bytes32 public constant TOKEN_MANAGER_ROLE = keccak256("TOKEN_MANAGER_ROLE");

    address public treasury;
    mapping(address => bool) public allowedTokens;

    event HostingPaid(
        address indexed payer,
        string planId,
        address indexed token,
        uint256 amount,
        string metadataCid,
        uint256 timestamp
    );

    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event TokenAllowed(address indexed token, bool allowed);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _admin,
        address _treasury,
        address[] calldata _initialTokens
    ) public initializer {
        require(_admin != address(0), "Admin required");
        require(_treasury != address(0), "Treasury required");

        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(TREASURY_MANAGER_ROLE, _admin);
        _grantRole(TOKEN_MANAGER_ROLE, _admin);

        treasury = _treasury;
        emit TreasuryUpdated(address(0), _treasury);

        for (uint256 i = 0; i < _initialTokens.length; i++) {
            allowedTokens[_initialTokens[i]] = true;
            emit TokenAllowed(_initialTokens[i], true);
        }
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyRole(DEFAULT_ADMIN_ROLE)
    {}

    function setTreasury(address _treasury) external onlyRole(TREASURY_MANAGER_ROLE) {
        require(_treasury != address(0), "Invalid treasury");
        emit TreasuryUpdated(treasury, _treasury);
        treasury = _treasury;
    }

    function setAllowedToken(address token, bool allowed) external onlyRole(TOKEN_MANAGER_ROLE) {
        require(token != address(0), "Invalid token");
        allowedTokens[token] = allowed;
        emit TokenAllowed(token, allowed);
    }

    function payHosting(
        string calldata planId,
        address token,
        uint256 amount,
        string calldata metadataCid
    ) external {
        require(bytes(planId).length > 0, "Plan required");
        require(amount > 0, "Invalid amount");
        require(allowedTokens[token], "Token not allowed");
        require(treasury != address(0), "Treasury not set");

        bool ok = IERC20Upgradeable(token).transferFrom(msg.sender, treasury, amount);
        require(ok, "Transfer failed");

        emit HostingPaid(
            msg.sender,
            planId,
            token,
            amount,
            metadataCid,
            block.timestamp
        );
    }
}
