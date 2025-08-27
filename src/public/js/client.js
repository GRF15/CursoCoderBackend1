const socket = io();

const productsUl = document.getElementById('productsUl');
const addProductForm = document.getElementById('addProductForm');

function renderProducts(products = []) {
    productsUl.innerHTML = '';

    products.forEach(p => {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = p.thumbnails || '';
        img.alt = p.title || '';
        img.width = 50;

        const nameSpan = document.createElement('span');
        nameSpan.classList.add('productName');
        nameSpan.textContent = p.title || '';

        const priceSpan = document.createElement('span');
        priceSpan.classList.add('productPrice');
        priceSpan.textContent = ` $${Number(p.price).toFixed(2)}`;

        const stockSpan = document.createElement('span');
        stockSpan.classList.add('productStock');
        stockSpan.textContent = `Stock: ${p.stock ?? 0}`;

        const delBtn = document.createElement('button');
        delBtn.classList.add('deleteBtn');
        delBtn.textContent = 'Eliminar';
        delBtn.addEventListener('click', () => {
            const id = p.id ?? p._id;
            if (!id) return;

            Swal.fire({
                title: '¿Estás seguro?',
                html: `Vas a eliminar el producto <strong>${p.title}</strong> con stock: <strong>${p.stock}</strong>`,
                description: "Esta acción no se puede deshacer.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e74c3c',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    socket.emit('deleteProduct', id);
                    Swal.fire('Eliminado', `"${p.title}" ha sido eliminado.`, 'success');
                }
            });
        });

        li.appendChild(img);
        li.appendChild(nameSpan);
        li.appendChild(priceSpan);
        li.appendChild(stockSpan);
        li.appendChild(delBtn);
        productsUl.appendChild(li);
    });
}

// Escuchar lista actualizada
socket.on('products', (products) => {
    renderProducts(products);
});

if (addProductForm) {
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(addProductForm).entries());

        data.price = Number(data.price);
        data.stock = Number(data.stock);
        data.status = data.status.toLowerCase() === 'true';

        socket.emit('addProduct', data);

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: `"${data.title}" fue agregado correctamente`,
            timer: 1500,
            showConfirmButton: false
        });

        addProductForm.reset();
    });
}

// Mensaje de error del servidor
socket.on('error', (msg) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg
    });
});

socket.on('connect', () => {
    console.log('Conectado al servidor de sockets');
});
