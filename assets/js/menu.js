const menuItems = [
    { name: "Samosa Chaat", desc: "Crispy samosas topped with chickpeas, yogurt, tamarind chutney and spices", price: "$8.99", category: "starters", popular: true },
    { name: "Paneer Tikka", desc: "Grilled cottage cheese cubes marinated in spices and yogurt", price: "$10.99", category: "starters", popular: true },
    { name: "Vegetable Pakora", desc: "Assorted vegetables dipped in spiced chickpea batter and deep fried", price: "$7.99", category: "starters" },
    { name: "Palak Paneer", desc: "Fresh spinach and paneer cooked in a creamy spiced gravy", price: "$14.99", category: "main", popular: true },
    { name: "Chana Masala", desc: "Chickpeas simmered in onion-tomato masala with cumin & coriander", price: "$13.49", category: "main" },
    { name: "Dal Makhani", desc: "Black lentils cooked with butter, cream, and spices", price: "$12.99", category: "main" },
    { name: "Garlic Naan", desc: "Tandoor-baked naan infused with garlic and cilantro", price: "$3.99", category: "breads" },
    { name: "Butter Naan", desc: "Soft naan brushed with ghee", price: "$3.49", category: "breads" },
    { name: "Gulab Jamun", desc: "Milk-solid balls soaked in rose sugar syrup", price: "$5.99", category: "desserts", popular: true },
    { name: "Kheer", desc: "Rice pudding with saffron, nuts, and cardamom", price: "$5.49", category: "desserts" }
  ];
  
  function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(cartItem => cartItem.name === item.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  
    const toast = document.getElementById("add-toast");
    toast.classList.remove("opacity-0");
    toast.classList.add("opacity-100");
    setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0");
    }, 2000);
  
    updateCartCount();
  }
  
  function renderMenu(category = "all") {
    const grid = document.getElementById("menu-grid");
    grid.innerHTML = "";
  
    const filtered = category === "all" ? menuItems : menuItems.filter(item => item.category === category);
  
    filtered.forEach(item => {
      grid.innerHTML += `
        <div class="relative group overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition">
          <div class="h-40 bg-gray-200 overflow-hidden">
            <img src="https://source.unsplash.com/400x300/?indian,food&sig=${item.name}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center z-10">
            <button onclick='addToCart(${JSON.stringify(item)})' class="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full font-semibold transition">Add to Order</button>
          </div>
          <div class="p-5 relative z-0">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-bold text-lg text-gray-800">${item.name}</h3>
              <span class="text-amber-500 font-semibold">${item.price}</span>
            </div>
            <p class="text-gray-600 text-sm">${item.desc}</p>
            ${item.popular ? `<span class="inline-block mt-2 text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full">Popular</span>` : ""}
          </div>
        </div>
      `;
    });
  }
  
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active-tab"));
      btn.classList.add("active-tab");
      renderMenu(btn.dataset.category);
    });
  });
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById("cart-count");
    if (badge) {
      if (count > 0) {
        badge.textContent = count;
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }
  }
  
  renderMenu();
  updateCartCount();  