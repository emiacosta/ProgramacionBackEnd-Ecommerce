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
    if(limit) products.splice(limit)
    
    res.json(products)
})
routerProducts.get('/:id', getProducts);
routerProducts.post('/', addProduct);
routerProducts.put('/:id', updateProduct);
routerProducts.delete('/:id', deleteProduct);

module.exports = routerProducts;