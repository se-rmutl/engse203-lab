
fetch('data/products.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('product-list');
    data.products.forEach(p => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${p.title}</h3><img src="${p.thumbnail}" width="100">`;
      list.appendChild(div);
    });
  });
