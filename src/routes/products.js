const express = require('express');
const {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct
} = require('../controllers/products.js');

const routerProducts = express.Router();

routerProducts.get('/', async (req, res) => {
    const products = await manager.getProducts()
    let limit = req.query.limit
    if (!limit) res.send({products})
    else {
        const prodLimit = [];
        if (limit > products.length) limit = products.length;
        for (let index = 0; index < limit; index++) {
            prodLimit.push(products[index]);
        }
        res.send({prodLimit})
    }
})
routerProducts.get('/:id', getProducts);
routerProducts.post('/', addProduct);
routerProducts.put('/:id', updateProduct);
routerProducts.delete('/:id', deleteProduct);

module.exports = routerProducts;