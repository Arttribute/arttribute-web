// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ArtAttribution {
    using Counters for Counters.Counter;

    struct ArtCollection {
        uint256 collectionId;
        address creator;
        uint256 price;
        string collectionUri;
        uint256 totalAttributions;
        uint256 totalRewards;
        bool exists;
    }

    struct AttributionCertificate {
        uint256 certificateId;
        address owner;
        uint256 collectionId;
        string certificateUri;
        bool exists;
    }

    ArtCollection[] public artCollections;
    AttributionCertificate[] public attributionCertificates;

    Counters.Counter private collectionIdCounter;
    Counters.Counter private certificateIdCounter;

    address creator;


    event CollectionCreated(uint256 collectionId, address indexed creator, uint256 price, string collectionUri, uint256 totalAttributions, uint256 totalRewards);
    event ArtworkAttributed(uint256 certificateId, address indexed owner, uint256 collectionId, string certificateUri);

    constructor() public {
       creator = msg.sender;
    }


    function createCollection(uint256 _price, string memory collectionUri) external {
        collectionIdCounter.increment();
        uint256 collectionId = collectionIdCounter.current();
        artCollections.push(ArtCollection(collectionId, msg.sender, _price, collectionUri, 0, 0, true));

        emit CollectionCreated(collectionId, msg.sender, _price, collectionUri, 0, 0);
    }

    function attributeCollection(uint256 _collectionId, uint256 contribution, string memory certificateUri) public payable {
        require(artCollections[_collectionId].exists, "Collection does not exist");
        ArtCollection storage collection = artCollections[_collectionId-1];
        require(contribution >= collection.price, "Insufficient contribution");
        payable(collection.creator).transfer(msg.value);
        
        collection.totalAttributions += 1;
        collection.totalRewards += contribution;
        certificateIdCounter.increment();
        uint256 certificateId = certificateIdCounter.current();
        attributionCertificates.push(AttributionCertificate(certificateId, msg.sender, _collectionId, certificateUri, true));

        emit ArtworkAttributed(certificateId, msg.sender, _collectionId, certificateUri);
    }


    function getCertificateOwner(uint256 _certificateId) external view returns (address) {
        require(attributionCertificates[_certificateId].exists, "Certificate does not exist");

        return attributionCertificates[_certificateId].owner;
    }

    function getCertificateCollection(uint256 _certificateId) external view returns (uint256) {
        require(attributionCertificates[_certificateId].exists, "Certificate does not exist");

        return attributionCertificates[_certificateId].collectionId;
    }

    function fetchAllCollections() public view returns (ArtCollection[] memory) {
        return artCollections;
    }

    function fetchAllCertificates() public view returns (AttributionCertificate[] memory) {
        return attributionCertificates;
    }

    function getOwnedCollections(address author) public view returns ( ArtCollection[] memory) {
        uint256 creatorArtCollectionCount = 0;
        for (uint256 i = 0; i < artCollections.length; i++) {
            if (artCollections[i].creator == author) {
                creatorArtCollectionCount++;
            }
        }
        ArtCollection[] memory creatorArtCollections = new ArtCollection[](creatorArtCollectionCount);
        uint256 j = 0;
        for (uint256 i = 0; i < creatorArtCollections.length; i++) {
            if (artCollections[i].creator == author) {
                creatorArtCollections[j] = artCollections[i];
                j++;
            }
        }
        return creatorArtCollections;
    }

}
