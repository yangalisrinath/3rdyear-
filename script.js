let products = [];

function addOrUpdateProduct() {
  const id = document.getElementById('productId').value.trim();
  const name = document.getElementById('productName').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const quantity = parseInt(document.getElementById('quantity').value);

  if (!id || !name || isNaN(price) || isNaN(quantity)) {
    alert("Please enter all product details correctly.");
    return;
  }

  const existingIndex = products.findIndex(p => p.id === id);

  if (existingIndex !== -1) {
    // Update existing
    products[existingIndex] = { id, name, price, quantity };
    alert("Product updated.");
  } else {
    // Add new
    products.push({ id, name, price, quantity });
    alert("Product added.");
  }

  clearForm();
  displayProducts();
}

function displayProducts() {
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  products.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>${product.quantity}</td>
      <td>
        <button onclick="editProduct('${product.id}')">Update</button>
        <button onclick="deleteProduct('${product.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('quantity').value = product.quantity;
  }
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  displayProducts();
}

function clearForm() {
  document.getElementById('productId').value = '';
  document.getElementById('productName').value = '';
  document.getElementById('price').value = '';
  document.getElementById('quantity').value = '';
}