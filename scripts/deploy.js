const { errors } = require("ethers");
const hre = require("hardhat");

async function main() {
    const BasicMarketplace = await hre.ethers.getContractFactory(
        "BasicMarketplace"
    );

    const basicmarketplace = await BasicMarketplace.deploy();

    await basicmarketplace.deployed();

    console.log("BasicMarketplace deployed to: " + basicmarketplace.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });