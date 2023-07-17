const express = require("express");
const app = express();
const fs = require('fs');
const productRoute = express.Router();

let products = require("../resources/products.json");



// CREATE
productRoute.route("/add-product").post(async (req, res, next) => {
    max_id = Math.max.apply(Math, products.map(function (event) {
        return event._id;
    }));

    const newProduct = {
        "_id": max_id + 1,
        "name": req.body.name,
        "price": req.body.price,
        "quantity": req.body.quantity
    };
    products.push(newProduct);
    var newProductsList = JSON.stringify(products);
    fs.writeFileSync("./resources/products.json", newProductsList);
    res.status(200).json(products);
});

// GET ALL
productRoute.route("/").get(async (req, res, next) => {
    res.json({
        data: products,
        message: "All items successfully fetched!",
        status: 200
    });
});

// GET SINGLE BY ID
productRoute.route("/read-product-by-id/:id").get(async (req, res, next) => {
    const productId = +req.params.id;
    const product = products.find(product => product._id === productId);
    res.json({
        data: product,
        message: "Data successfully fetched!",
        status: 200
    });
});

// GET SINGLE BY NAME
productRoute.route("/read-product-by-name/:name").get(async (req, res, next) => {
    const productName = req.params.name;
    const product = products.find(product => product.name === productName);
    res.json({
        data: product,
        message: "Data successfully fetched!",
        status: 200
    });
});

// UPDATE
productRoute.route("/update-product/:id").put(async (req, res, next) => {
    const productId = +req.params.id;
    const oldProduct = products.find(product => product._id === productId);
    if (req.body.name === '') {
        newName = oldProduct.name;
    } else {
        newName = req.body.name;
    }
    if (req.body.price === '') {
        newPrice = oldProduct.price;
    } else {
        newPrice = req.body.price;
    }
    if (req.body.quantity === '') {
        newQuantity = oldProduct.quantity;
    } else {
        newQuantity = req.body.quantity;
    }
    const newProduct = {
        "_id": productId,
        "name": newName,
        "price": newPrice,
        "quantity": newQuantity
    };
    const OldProductIndex = products.findIndex(product => product._id === productId);
    products.splice(OldProductIndex, 1, newProduct);
    var newProductsList = JSON.stringify(products);
    fs.writeFileSync("./resources/products.json", newProductsList);
    res.status(200).json(newProduct);
});

// DELETE
productRoute.route("/delete-product/:id").delete(async (req, res, next) => {
    const productId = +req.params.id;
    const OldProductIndex = products.findIndex(product => product._id === productId);
    products.splice(OldProductIndex,1);
    var newProductsList = JSON.stringify(products);
    fs.writeFileSync("./resources/products.json", newProductsList);
    res.status(200).json(products);
});


module.exports = productRoute;