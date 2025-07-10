
async function loadProducts() {
  const res = await fetch('data/products.json');
  const data = await res.json();
  const list = document.getElementById('product-list');
  data.products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${p.title}</h3>
      <img src="${p.thumbnail}" width="150">
      <button onclick="addToCart(${p.id})">เพิ่มลงตะกร้า</button>
    `;
    list.appendChild(div);
  });
}
function addToCart(id) {
  alert('เพิ่มสินค้าลงตะกร้า: ' + id);
}
loadProducts();
