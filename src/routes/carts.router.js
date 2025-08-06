const express = require('express');
const cartManager = require('../models/cartManager.js');
const cartsRouter = express.Router();


cartsRouter.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los carritos' });
    }
});

cartsRouter.get('/:cid', async(req, res) => {
    try {
        const cart = await cartManager.getCartById(parseInt(req.params.cid));
        if (!cart)
            return res.status(404).json({ error: 'Carrito no encontrado' });
            res.json(cart);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.addCart([]);
        res.status(201).json({ message: 'Carrito creado', cart: newCart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity || 1;
        if (isNaN(cartId) || isNaN(productId)) {
            return res.status(400).json({ error: 'ID de carrito y producto deben ser números' });
        }
        if (quantity < 1) {
            return res.status(400).json({ error: 'La cantidad debe ser mayor a cero' });
        }
        const updatedCart = await cartManager.updateProduct(cartId, productId, quantity);
        res.status(200).json({ message: 'Producto agregado al carrito', cart: updatedCart });
    } catch (error) {
        if (error.message.includes('Carrito no encontrado') || error.message.includes('Producto no encontrado')) {
        return res.status(404).json({ error: error.message });}
        res.status(400).json({ error: 'Error al agregar el producto al carrito', error: error.message });
    }
});

module.exports = cartsRouter;