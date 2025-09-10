const express = require('express');
const Cart = require('../models/cart.model.js');
const Product = require('../models/product.model.js');

const cartsRouter = express.Router();

// GET todos los carritos
cartsRouter.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().populate('products.product').lean();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
});

// GET un carrito por ID
cartsRouter.get('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    res.json({ status: 'success', cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// POST crear carrito vacío
cartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    res.status(201).json({ message: 'Carrito creado', cart: newCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST agregar producto a un carrito
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const product = await Product.findById(pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    await cart.save();
    res.json({ message: 'Producto agregado al carrito', cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/carts/:cid/products/:pid - Eliminar producto del carrito
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// PUT /api/carts/:cid - Actualizar todos los productos del carrito
cartsRouter.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    if (!Array.isArray(products)) return res.status(400).json({ status: 'error', error: 'El body debe ser un arreglo de productos' });
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    cart.products = products;
    await cart.save();
    res.json({ status: 'success', message: 'Carrito actualizado', cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// PUT /api/carts/:cid/products/:pid - Actualizar cantidad de un producto
cartsRouter.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    if (typeof quantity !== 'number' || quantity < 1) return res.status(400).json({ status: 'error', error: 'Cantidad inválida' });
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    const prod = cart.products.find(p => p.product.toString() === pid);
    if (!prod) return res.status(404).json({ status: 'error', error: 'Producto no encontrado en el carrito' });
    prod.quantity = quantity;
    await cart.save();
    res.json({ status: 'success', message: 'Cantidad actualizada', cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// DELETE /api/carts/:cid - Vaciar carrito
cartsRouter.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    cart.products = [];
    await cart.save();
    res.json({ status: 'success', message: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

module.exports = cartsRouter;
