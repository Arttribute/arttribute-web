const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ArtAttribution", function () {
  it("Allows", async function () {
    const ArtAttribution = await ethers.getContractFactory("ArtAttribution");
    const artAttributionContract = await ArtAttribution.deploy();
    await artAttributionContract.deployed();

    const [_, firstMemberAddress, secondMemberAddress, thirdMemberAddress] =
      await ethers.getSigners();

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

    let allcertificates = await artAttributionContract.fetchAllCertificates();
    let allcollection = await artAttributionContract.fetchAllCollections();
    let ownedCollections = await artAttributionContract.getOwnedCollections(
      "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
    );

    console.log("all certificates : ", allcertificates);
    console.log("all collection : ", allcollection);
    console.log("owned collections : ", ownedCollections);
  });
});
