const dishes = [
  {
    name: "French Special Pasta",
    price: 13.0,
    rating: 5,
    reviews: 120,
    desc: "Enjoy rich, creamy, authentic French flavors seasoned to your plate.",
    img: "pasta.png",
    category: "pasta",
  },
  {
    name: "French Special Burger",
    price: 13.0,
    rating: 5,
    reviews: 150,
    desc: "Bite into a juicy, flavorful burger with French twist, loaded with fresh ingredients and secret sauces.",
    img: "burger.png",
    category: "burger",
  },
  {
    name: "Italian Breakfast",
    price: 13.0,
    rating: 5,
    reviews: 100,
    desc: "Start your day with a delicious Italian breakfast, featuring classic flavors and wholesome ingredients.",
    img: "fast-food.png",
    category: "fast-foods",
  },
  {
    name: "American Burger",
    price: 13.0,
    rating: 5,
    reviews: 140,
    desc: "Enjoy a juicy, flavorful American burger packed with fresh ingredients and served to perfection.",
    img: "burger.png",
    category: "burger",
  },
  {
    name: "Indian Sandwich",
    price: 13.0,
    rating: 5,
    reviews: 110,
    desc: "Taste the vibrant spices and hearty flavors of a traditional Indian sandwich, made to satisfy every craving.",
    img: "sandwich.png",
    category: "sandwich",
  },
  {
    name: "French Special Pasta",
    price: 13.0,
    rating: 5,
    reviews: 130,
    desc: "Delight in the creamy, rich features of our French special pasta, crafted with authentic ingredients and flavors.",
    img: "pasta.png",
    category: "pasta",
  },
  {
    name: "Thali Special",
    price: 15.0,
    rating: 4.8,
    reviews: 90,
    desc: "A complete Indian meal with a variety of dishes, rice, and breads.",
    img: "thali.png",
    category: "thali",
  },
  {
    name: "Fast Food Combo",
    price: 10.0,
    rating: 4.5,
    reviews: 200,
    desc: "Quick and tasty fast food options including fries and a drink.",
    img: "fast-food.png",
    category: "fast-foods",
  },
  {
    name: "Veggie Sandwich",
    price: 12.0,
    rating: 4.7,
    reviews: 85,
    desc: "Fresh veggies and herbs in a toasted sandwich.",
    img: "sandwich.png",
    category: "sandwich",
  },
  {
    name: "Spicy Thali",
    price: 16.0,
    rating: 4.9,
    reviews: 105,
    desc: "Spicy Indian thali with curries and sides.",
    img: "thali.png",
    category: "thali",
  },
  {
    name: "Cheese Pasta",
    price: 14.0,
    rating: 4.6,
    reviews: 95,
    desc: "Creamy cheese pasta with herbs.",
    img: "pasta.png",
    category: "pasta",
  },
  {
    name: "Double Burger",
    price: 15.0,
    rating: 4.8,
    reviews: 160,
    desc: "Double patty burger with extra cheese.",
    img: "burger.png",
    category: "burger",
  },
];
// Global cart state
let cart = [];
let currentCategory = "all";
let visibleCount = 6;
// DOM Elements
const cartToggle = document.getElementById("cart-toggle");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartClose = document.getElementById("cart-close");
const cartItemsContainer = document.getElementById("cart-items");
const cartBadge = document.getElementById("cart-badge");
const cartTotalEl = document.getElementById("cart-total");

// === OPEN / CLOSE CART === (unchanged)
function openCart() {
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("show");
  renderCart();
}

function closeCart() {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("show");
}

cartToggle?.addEventListener("click", openCart);
cartClose?.addEventListener("click", closeCart);
cartOverlay?.addEventListener("click", closeCart);

// === CART FUNCTIONS ===
function addToCart(item, quantity = 1) {
  const existing = cart.find((c) => c.name === item.name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  updateCartUI();
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  updateCartUI();
}

function updateQuantity(name, delta) {
  const item = cart.find((i) => i.name === name);
  if (item) {
    item.quantity = Math.max(1, item.quantity + delta);
    if (item.quantity === 0) removeFromCart(name);
    updateCartUI();
  }
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  cartBadge.textContent = totalItems;
  renderCart();
}

function calculateTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);
}

// === RENDER CART ===
function renderCart() {
  cartItemsContainer.innerHTML = ""; // Clear
  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-cart";
    empty.textContent = "Your cart is empty";
    cartItemsContainer.appendChild(empty);
    cartTotalEl.textContent = "$0.00";
    return;
  }
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    // Image
    const img = document.createElement("img");
    img.src = item.img;
    img.className = "cart-item-img";
    cartItem.appendChild(img);

    // Details
    const details = document.createElement("div");
    details.className = "cart-item-details";
    const h4 = document.createElement("h4");
    h4.textContent = item.name;
    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `$${item.price.toFixed(2)} x ${item.quantity}`;
    details.appendChild(h4);
    details.appendChild(price);
    cartItem.appendChild(details);

    // Controls
    const controls = document.createElement("div");
    controls.className = "cart-item-controls";

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.onclick = () => updateQuantity(item.name, -1);

    const qty = document.createElement("span");
    qty.className = "qty";
    qty.textContent = item.quantity;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.onclick = () => updateQuantity(item.name, 1);

    controls.appendChild(minus);
    controls.appendChild(qty);
    controls.appendChild(plus);
    cartItem.appendChild(controls);

    // Remove
    const remove = document.createElement("button");
    remove.className = "remove-item";
    remove.textContent = "Remove";
    remove.onclick = () => removeFromCart(item.name);
    cartItem.appendChild(remove);

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalEl.textContent = `$${calculateTotal()}`;
}

// === POPULAR DISHES: createDishCard with innerHTML ===
function createDishCard(dish) {
  const card = document.createElement("div");
  card.className = "dish-card";

  card.innerHTML = `
      <div class="dish-image">
          <img src="${dish.img}" alt="${dish.name}">
      </div>
      <div class="dish-content">
          <h3>${dish.name}</h3>
          <div class="rating">
              ${createStars(dish.rating)} <span>(${dish.reviews})</span>
          </div>
          <p>${dish.desc}</p>
          <div class="dish-actions">
              <div class="price-tag">$${dish.price.toFixed(2)}</div>
              <button class="buy-btn">Add to Cart</button>
          </div>
          <div class="quantity-controls">
              <button class="quantity-btn minus">-</button>
              <span class="quantity">1</span>
              <button class="quantity-btn plus">+</button>
          </div>
      </div>
  `;

  // === Attach Events ===
  const minus = card.querySelector(".minus");
  const plus = card.querySelector(".plus");
  const qty = card.querySelector(".quantity");
  const buyBtn = card.querySelector(".buy-btn");

  const update = () => {
    const val = parseInt(qty.textContent);
    minus.disabled = val <= 1;
  };
  update();

  plus.addEventListener("click", () => {
    qty.textContent = parseInt(qty.textContent) + 1;
    update();
  });

  minus.addEventListener("click", () => {
    if (parseInt(qty.textContent) > 1) {
      qty.textContent = parseInt(qty.textContent) - 1;
      update();
    }
  });

  buyBtn.addEventListener("click", () => {
    const quantity = parseInt(qty.textContent);
    addToCart(dish, quantity);
  });

  return card;
}

function createStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
    else if (i === Math.ceil(rating) && rating % 1 >= 0.5)
      stars += '<i class="fas fa-star-half-alt"></i>';
    else stars += '<i class="far fa-star"></i>';
  }
  return stars;
}

// === DOM LOADED ===
document.addEventListener("DOMContentLoaded", () => {
  // HOME PAGE - Popular dishes with categories and show more/less
  const dishesContainer = document.getElementById("dishes-container");
  const seeMoreBtn = document.getElementById("see-more");
  if (dishesContainer) {
    // Initial render: all items, first 6
    renderDishes("all", visibleCount);

    // Tab clicks
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelector(".category-btn.active")
          ?.classList.remove("active");
        btn.classList.add("active");
        currentCategory = btn.dataset.category;
        visibleCount = 6; // Reset visible count on category change
        renderDishes(currentCategory, visibleCount);
      });
    });
  }

  // Render function for dishes
  function renderDishes(category, count) {
    dishesContainer.innerHTML = "";
    let filtered =
      category === "all"
        ? dishes
        : dishes.filter((d) => d.category === category);
    let toShow = filtered.slice(0, count);
    toShow.forEach((dish) => {
      dishesContainer.appendChild(createDishCard(dish));
    });

    // Handle See More / Show Less button
    if (filtered.length > 6) {
      seeMoreBtn.style.display = "block";
      if (count < filtered.length) {
        seeMoreBtn.textContent = "See More";
        seeMoreBtn.onclick = () => {
          visibleCount += 6;
          renderDishes(currentCategory, visibleCount);
        };
      } else {
        seeMoreBtn.textContent = "Show Less";
        seeMoreBtn.onclick = () => {
          visibleCount = 6;
          renderDishes(currentCategory, visibleCount);
        };
      }
    } else {
      seeMoreBtn.style.display = "none";
    }
  }
  // Checkout button (unchanged)
  document.querySelector(".checkout-btn")?.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert(
        `Proceeding to checkout with ${cart.reduce(
          (s, i) => s + i.quantity,
          0
        )} items. Total: $${calculateTotal()}`
      );
      // Later: redirect to checkout page
    }
  });
});
// Hamburger Menu Toggle (Add this to script.js)
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // Optional: Close menu when clicking a link (prevents it from staying open)
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });

    // Optional: Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  }
});
