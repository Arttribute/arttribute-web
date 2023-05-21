const hre = require("hardhat");

async function main() {
  const ArtToken = await hre.ethers.getContractFactory("ArtToken");
  const artTokenContract = await ArtToken.deploy();
  await artTokenContract.deployed();
  const artTokenAddress = artTokenContract.address;
  console.log("ArtToken contract deployed to:", artTokenAddress);

  const ArtAttribution = await hre.ethers.getContractFactory("ArtAttribution");
  const contract = await ArtAttribution.deploy(artTokenAddress);
  await contract.deployed();
  console.log("ArtAttribution contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
