const express = require('express');
const productManager = require('../models/productManager.js');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductById(parseInt(req.params.pid));
        if (!product)
            return res.status(404).json({ error: 'Producto no encontrado' });
            res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        const newProduct = await productManager.addProduct(title, description, code, price, status, stock, category, thumbnails);
        res.status(201).json({ message: 'Producto agregado correctamente', product: newProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const updatedProduct = await productManager.updateProduct(parseInt(req.params.pid), req.body);
        res.json({ message: 'Producto actualizado correctamente', product: updatedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const deleted = await productManager.deleteProduct(parseInt(req.params.pid));
        res.json({ message: 'Producto eliminado correctamente', product: deleted });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;