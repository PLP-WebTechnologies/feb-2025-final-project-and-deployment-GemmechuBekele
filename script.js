document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  if (window.location.pathname.includes("cart.html")) {
    renderCartItems();
  }
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

function addToCart(id, name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === id);
  if (!existing) {
    cart.push({ id, name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
  } else {
    alert(`${name} is already in the cart.`);
  }
}

function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContent = document.getElementById("cart-content");
  const totalPrice = document.getElementById("total-price");
  let total = 0;

  if (cart.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
    totalPrice.textContent = "0.00";
    return;
  }

  cartContent.innerHTML = cart
    .map((item, index) => {
      total += item.price;
      return `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    })
    .join("");

  totalPrice.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}
