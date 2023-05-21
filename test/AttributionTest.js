const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ArtAttribution", function () {
  it("Rewards artists when their artwork is used to train generative models", async function () {
    //Deploying ArtAttribution contract
    const ArtAttribution = await ethers.getContractFactory("ArtAttribution");
    const artAttributionContract = await ArtAttribution.deploy();
    await artAttributionContract.deployed();

    const [_, firstMemberAddress, secondMemberAddress, thirdMemberAddress] =
      await ethers.getSigners();

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
      .attributeCollection(1, "certificate_uri", {
        value: ethers.utils.parseUnits("4", "ether"),
      });

    await artAttributionContract
      .connect(thirdMemberAddress)
      .attributeCollection(1, "certificate_uri", {
        value: ethers.utils.parseUnits("2", "ether"),
      });

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
