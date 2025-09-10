
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

async function addToCart(productId, quantity = 1) {
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
      Swal.fire({ icon: 'success', title: 'Agregado', text: `Producto agregado al carrito` });
    } else {
      alert('Producto agregado al carrito');
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
});
