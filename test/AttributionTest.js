const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ArtAttribution", function () {
  it("Rewards artists when their artwork is used to train generative models", async function () {
    //Deploying token contract
    const ArtToken = await ethers.getContractFactory("ArtToken");
    const artTokenContract = await ArtToken.deploy();
    await artTokenContract.deployed();
    const artTokenAddress = artTokenContract.address;

    //Deploying ArtAttribution contract
    const ArtAttribution = await ethers.getContractFactory("ArtAttribution");
    const artAttributionContract = await ArtAttribution.deploy(artTokenAddress);
    await artAttributionContract.deployed();

    const [_, firstMemberAddress, secondMemberAddress, thirdMemberAddress] =
      await ethers.getSigners();

    // Adding funds to firstMemberAddress
    await ethers.provider.sendTransaction({
      to: firstMemberAddress.address,
      value: ethers.utils.parseEther("100").toHexString(), // Specify the amount of ether to send
    });

    // Adding funds to secondMemberAddress
    await ethers.provider.sendTransaction({
      to: secondMemberAddress.address,
      value: ethers.utils.parseEther("100").toHexString(), // Specify the amount of ether to send
    });

    // Adding funds to thirdMemberAddress
    await ethers.provider.sendTransaction({
      to: thirdMemberAddress.address,
      value: ethers.utils.parseEther("100").toHexString(), // Specify the amount of ether to send
    });

    //Add members
    await artAttributionContract.connect(firstMemberAddress).addMember("URI_1");
    await artAttributionContract
      .connect(secondMemberAddress)
      .addMember("URI_2");
    await artAttributionContract.connect(thirdMemberAddress).addMember("URI_3");

    //Creating new Collection
    await artAttributionContract
      .connect(firstMemberAddress)
      .createCollection(2, "URI_1");

    await artAttributionContract
      .connect(secondMemberAddress)
      .createCollection(2, "URI_2");

    await artAttributionContract
      .connect(thirdMemberAddress)
      .createCollection(2, "URI_3");

    //Attributing a collection
    await artAttributionContract
      .connect(thirdMemberAddress)
      .attributeCollection(1, 4, "certificate_uri");

    //Invalid attribution request
    //await artAttributionContract
    //  .connect(secondMemberAddress)
    //  .attributeCollection(1, 1, "certificate_uri");

    let allmembers = await artAttributionContract.fetchAllMembers();
    let allcertificates = await artAttributionContract.fetchAllCertificates();
    let allcollection = await artAttributionContract.fetchAllCollections();
    let collectionbyId = await artAttributionContract.getCollectionById(1);
    let ownedCollections = await artAttributionContract.getOwnedCollections(
      "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
    );
    let ownedCertificates = await artAttributionContract.getOwnedCertificates(
      "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
    );
    let memmberbyId = await artAttributionContract.getMemberById(1);
    let memberbyAddress = await artAttributionContract.getMemberByAddress(
      "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
    );

    console.log("all members : ", allmembers);
    console.log("all certificates : ", allcertificates);
    console.log("all collection : ", allcollection);
    console.log("collection by id : ", collectionbyId);
    console.log("owned collections : ", ownedCollections);
    console.log("owned certificates : ", ownedCertificates);
    console.log("member by id : ", memmberbyId);
    console.log("member by address : ", memberbyAddress);
  });
});
