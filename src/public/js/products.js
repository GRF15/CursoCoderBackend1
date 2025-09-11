async function getOrCreateCartId() {
  let cartId = localStorage.getItem('cartId');
  if (cartId) return cartId;

  const res = await fetch('/api/carts', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
  if (!res.ok) {
    const err = await res.json().catch(()=>({error:'Error creando carrito'}));
    throw new Error(err.error || 'No se pudo crear carrito');
  }
  const data = await res.json();
  // tu endpoint devuelve { message: 'Carrito creado', cart: newCart }
  const newCart = data.cart || data;
  cartId = newCart._id || newCart.id || newCart;
  localStorage.setItem('cartId', cartId);
  return cartId;
}

async function addToCart(productId, quantity = 1, productTitle = '') {
  try {
    const cartId = await getOrCreateCartId();
    const res = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || JSON.stringify(json));
    // feedback visual
    if (window.Swal) {
      Swal.fire({ icon: 'success', title: 'Agregado', text: `${productTitle ? '"' + productTitle + '" ' : ''}agregado al carrito` });
    } else {
      alert(`${productTitle ? productTitle + ' ' : ''}agregado al carrito`);
    }
  } catch (err) {
    console.error(err);
    if (window.Swal) {
      Swal.fire({ icon: 'error', title: 'Error', text: String(err.message) });
    } else {
      alert(String(err.message));
    }
  }
}

// Delegación: botones en products page
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.addToCartBtn');
  if (btn) {
    const pid = btn.dataset.pid;
    if (pid) addToCart(pid);
  }
});

// Si hay botón de detalle (productDetail)
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addToCartBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const pid = addBtn.dataset.pid;
      addToCart(pid);
    });
  }
  // Formulario de agregar al carrito en productDetail
  const addToCartForm = document.getElementById('addToCartForm');
  if (addToCartForm) {
    addToCartForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const quantity = Math.min(
        parseInt(document.getElementById('quantity').value) || 1,
        typeof productStock !== 'undefined' ? productStock : 1
      );
      // Validar stock en el backend, pero también en el frontend
      const cartId = await getOrCreateCartId();
      // Obtener cantidad actual en el carrito para este producto
      let currentQty = 0;
      try {
        const res = await fetch(`/api/carts/${cartId}`);
        if (res.ok) {
          const data = await res.json();
          const prod = (data.cart.products || []).find(p => p.product && (p.product._id === productId || p.product === productId));
          if (prod) currentQty = prod.quantity;
        }
      } catch {}
      if (currentQty + quantity > productStock) {
        Swal.fire('Stock insuficiente', `No puedes agregar más de ${productStock} unidades en total.`, 'warning');
        return;
      }
      addToCart(productId, quantity, productTitle);
    });
  }
  // Botón fijo para ir al carrito
  const goToCartBtn = document.getElementById('goToCartBtn');
  if (goToCartBtn) {
    goToCartBtn.addEventListener('click', async () => {
      let cartId = localStorage.getItem('cartId');
      if (!cartId) {
        const res = await fetch('/api/carts', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
        const data = await res.json();
        cartId = data.cart._id || data.cart.id || data.cart;
        localStorage.setItem('cartId', cartId);
      }
      window.location.href = `/carts/${cartId}`;
    });
  }
});
