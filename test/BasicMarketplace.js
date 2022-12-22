const { expect } = require("chai");
const { ether, ethers } = require("hardhat");

describe("BasicMarketplace", function() {
    it("Should return a new Product once deployed", async function() {
        const Contract = await ethers.getContractFactory("BasicMarketplace");
        const contract = await Contract.deploy();
        await contract.deployed();

        expect(await contract.numProduct()).to.equal(1);

    });

    it("Should create a new Product", async function() {
        const Contract = await ethers.getContractFactory("BasicMarketplace");
        const contract = await Contract.deploy();
        await contract.deployed();

        const addProductTx = await contract.addProduct("Test Product", 100);

        expect(await contract.numProduct()).to.equal(2);
    });

    it("Should get a Product", async function() {
        const Contract = await ethers.getContractFactory("BasicMarketplace");
        const contract = await Contract.deploy();
        await contract.deployed();

        const getProductTx = await contract.getProduct(0);

        expect(await contract.numProduct()).to.equal(1);
    });

    it("Should get all Products", async function() {
        const Contract = await ethers.getContractFactory("BasicMarketplace");
        const contract = await Contract.deploy();
        await contract.deployed();

        const getProductsTx = await contract.getProducts();

        expect(await contract.numProduct()).to.equal(1);
    });

    it("Should Sell a Product", async function() {
        const Contract = await ethers.getContractFactory("BasicMarketplace");
        const contract = await Contract.deploy();
        await contract.deployed();

        const sellProductTx = await contract.sellProduct(0);

        expect(await contract.numProduct()).to.equal(1);
    });
});