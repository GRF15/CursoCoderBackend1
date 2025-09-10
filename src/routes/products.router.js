const express = require('express');
const Product = require('../models/product.model.js');
const productsRouter = express.Router();

// GET /api/products 
productsRouter.get('/', async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    const filter = {};
    if (query) {
      // Permite buscar por categoría o disponibilidad
      if (query === 'disponible') filter.status = true;
      else if (query === 'nodisponible') filter.status = false;
      else filter.category = query;
    }
    let sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    else if (sort === 'desc') sortOption.price = -1;

    const options = {
      page,
      limit,
      sort: sortOption,
      lean: true
    };
    const result = await Product.paginate ? Product.paginate(filter, options) : paginateFallback(Product, filter, options);
    // Formato de respuesta
    const { docs, totalDocs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = result;
    const baseUrl = req.baseUrl + req.path;
    const queryString = (params) => Object.entries({ ...req.query, ...params })
      .filter(([k, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${k}=${v}`).join('&');
    res.json({
      status: 'success',
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `${baseUrl}?${queryString({ page: prevPage })}` : null,
      nextLink: hasNextPage ? `${baseUrl}?${queryString({ page: nextPage })}` : null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
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
    nextPage: options.page < totalPages ? options.page + 1 : null
  };
}

// GET /api/products/:pid
productsRouter.get('/:pid', async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products
productsRouter.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ message: 'Producto agregado correctamente', product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/products/:pid
productsRouter.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado correctamente', product: updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/products/:pid
productsRouter.delete('/:pid', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
    if (!deletedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente', product: deletedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = productsRouter;