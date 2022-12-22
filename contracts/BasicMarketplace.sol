//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;

contract BasicMarketplace{
    struct Product{
        uint256 id;
        string itemName;
        address creator;
        address owner;
        uint256 askingPrice;
        bool isSold;
    }

    mapping(uint256 => Product) public products;
    event savingsEvent(uint256 indexed _productId);
    uint256 public numProduct;

    constructor(){
        numProduct = 0;
        // addProduct("P1", 500)
    }
    
    function addProduct(string memory itemName, uint256 askingPrice) public{
        Product storage product = products[numProduct];
        product.creator = msg.sender;
        product.owner = msg.sender;
        product.askingPrice = askingPrice;
        product.itemName = itemName;
        product.isSold = false;

        products[numProduct] = Product(
            numProduct,
            itemName,
            product.creator,
            product.owner,            
            product.askingPrice,
            false

        );

        numProduct++;
    }

    function getProduct(uint256 productId) public view returns(Product memory) {
        return products[productId];
    }

    function getProducts() public view returns(Product[] memory) {
        Product[] memory prodlist = new Product[](numProduct);
        for(uint256 i =0; i < numProduct; i++) {
            Product storage product = products[i];
            prodlist[i] = product;
        }
        return prodlist;
    }

    function sellProduct(uint productId) public {
        Product storage product = products[productId];
        product.owner = msg.sender;
        product.isSold = true;
    }
}