const express = require('express');
const viewsRouter = express.Router();
const ProductManager = require('../models/productManager');

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await ProductManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = viewsRouter;