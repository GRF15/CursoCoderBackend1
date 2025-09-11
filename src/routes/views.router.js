const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');


// Home
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render('home', { products });
  } catch (error) {
    res.status(500).send('Error al cargar productos en home');
  }
});

// Vista de productos con paginación
router.get('/products', async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    const filter = {};
    if (query) {
      if (query === 'disponible') filter.status = true;
      else if (query === 'nodisponible') filter.status = false;
      else filter.category = query;
    }
    let sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    else if (sort === 'desc') sortOption.price = -1;
    const options = { page, limit, sort: sortOption, lean: true };
    const result = await paginateFallback(Product, filter, options);
    res.render('products', {
      products: result.docs || [],
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limit}&sort=${sort||''}&query=${query||''}` : null,
      nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limit}&sort=${sort||''}&query=${query||''}` : null,
      queryParams: { limit, sort, query }
    });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
});

// Vista de detalle de producto
router.get('/products/:pid', async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).send('Error al cargar producto');
  }
});

// Vista de carrito
router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product').lean();
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).send('Error al cargar carrito');
  }
});

// Vista de productos en tiempo real
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).send('Error al cargar productos en tiempo real');
  }
});

// Fallback para paginación si no se usa mongoose-paginate-v2
async function paginateFallback(Model, filter, options) {
  const skip = (options.page - 1) * options.limit;
  const docs = await Model.find(filter).sort(options.sort).skip(skip).limit(options.limit).lean();
  const totalDocs = await Model.countDocuments(filter);
  const totalPages = Math.ceil(totalDocs / options.limit);
  return {
    docs,
    totalDocs,
    totalPages,
    hasPrevPage: options.page > 1,
    hasNextPage: options.page < totalPages,
    prevPage: options.page > 1 ? options.page - 1 : null,
    nextPage: options.page < totalPages ? options.page + 1 : null,
    page: options.page
  };
}

module.exports = router;
