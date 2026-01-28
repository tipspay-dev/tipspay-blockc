// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract bDOIRegistry {
    struct Asset {
        uint256 chainId;
        address contractAddress;
        string metadataCid;
    }

    mapping(string => Asset) public registry;

    function registerAsset(
        string calldata bdoiId,
        uint256 chainId,
        address contractAddress,
        string calldata metadataCid
    ) external {
        registry[bdoiId] = Asset(chainId, contractAddress, metadataCid);
    }

    function resolve(string calldata bdoiId)
        external
        view
        returns (Asset memory)
    {
        return registry[bdoiId];
    }
}

