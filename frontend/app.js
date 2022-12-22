// const { ethers } = require("hardhat");
// const { ethers } = require("hardhat");
App = {
    contract: {},

    init: async function() {
        console.log("init is called");

        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();

        document.getElementById("wallet").innerText = "Your wallet address is: " + userAddress;

        const resourceAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
        $.getJSON("../artifacts/contracts/BasicMarketplace.sol/BasicMarketplace.json", function(BasicMarketplaceArtifact) {
            const contract = new ethers.Contract(
                resourceAddress,
                BasicMarketplaceArtifact.abi,
                signer
            );

            App.contract = contract;

            contract.getProducts().then((data) => {
                console.log(data);

                var allItemDiv = $("#addItems");
                var itemTemplate = $("#itemTemplate");
                for (i = 0; i < data.length; i++) {
                    itemTemplate.find(".itemName").text(data[i].itemName);
                    itemTemplate.find(".itemOwner").text(data[i].owner);
                    itemTemplate.find(".itemCreator").text(data[i].creator);
                    itemTemplate.find(".askingPrice").text(data[i].askingPrice);
                    itemTemplate
                        .find(".itemStatus")
                        .text(data[i].isSold ? "Sold" : "Available");
                    itemTemplate.find(".buy_btn").attr("data-id", data[i].id);
                    if (data[i].isSold) {
                        itemTemplate.find(".buy_btn").hide();
                    } else {
                        itemTemplate.find(".buy_btn").show();
                    }
                    allItemDiv.append(itemTemplate.html());
                }
            });
        });
        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on("click", ".btn_add", App.handleAdd);
        $(document).on("click", ".buy_btn", { id: this.id }, App.handleBuy);
    },

    handleAdd: function() {
        console.log("Handling Add Item..");
        var newItemName = $("#new_itemname").val();
        var newAskingPrice = $("#new_askingprice").val();

        App.contract.addProduct(newItemName, newAskingPrice);
    },

    handleBuy: function(event) {
        var productId = parseInt($(event.target).data("id"));
        console.log("Handling buying product with id:" + productId);

        App.contract.sellProduct(productId);
    },


};

$(function() {
    $(window).load(function() {
        App.init();
    });
});