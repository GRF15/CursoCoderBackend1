# Proyecto: API RESTful de Productos y Carritos

## Primera Entrega - Backend

### Descripción

Este proyecto consiste en el desarrollo de un servidor backend utilizando **Node.js** y **Express**, que implementa una API RESTful para el manejo de productos y carritos de compra. Los datos se almacenan en archivos `.json` utilizando el módulo `fs` para asegurar persistencia.

### Tecnologías Utilizadas

* Node.js
* Express.js
* JavaScript ES6
* File System (`fs`)

### Estructura de Carpetas

```
/src
├── controllers/          # Lógica de negocio
│   ├── products.controller.js
│   └── carts.controller.js
├── models/               # Manejo de datos con persistencia
│   ├── ProductManager.js
│   └── CartManager.js
├── routes/               # Rutas de la API
│   ├── products.router.js
│   └── carts.router.js
├── data/                 # Archivos JSON persistentes
│   ├── products.json
│   └── carts.json
├── app.js                # Configuración de la app
└── server.js             # Inicialización del servidor
/public                   # (Opcional) Imágenes para thumbnails
```

### Endpoints

#### Productos `/api/products/`

* `GET /` - Listar todos los productos.
* `GET /:pid` - Obtener un producto por ID.
* `POST /` - Crear un nuevo producto.
* `PUT /:pid` - Actualizar un producto por ID.
* `DELETE /:pid` - Eliminar un producto por ID.

#### Carritos `/api/carts/`

* `POST /` - Crear un nuevo carrito.
* `GET /:cid` - Obtener un carrito por ID.
* `POST /:cid/product/:pid` - Agregar un producto al carrito.

### Requisitos Funcionales Cumplidos

* CRUD de productos y carritos.
* Rutas separadas y bien organizadas con Express Router.
* Persistencia de datos en archivos `.json` mediante `fs`.
* Autogeneración de `id` para productos y carritos.
* Manejo adecuado de errores (404, 500).

### Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone <url-del-repo>
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el servidor:

```bash
node src/server.js
```

4. La API estará disponible en:

```
http://localhost:8080/api/products
http://localhost:8080/api/carts
```

### Observaciones

* Los datos se almacenan en `src/data/products.json` y `carts.json`.
* Las rutas son completamente funcionales y siguen el modelo REST.
* El proyecto está preparado para escalar hacia uso de bases de datos en futuras entregas.

---

**Autor:** Gabriel Rodriguez
**Curso:** Backend - Coderhouse
**Entrega:** Primera entrega (API con Express y persistencia en archivos)
