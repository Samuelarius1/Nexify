/** @format */

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to render cart items
function renderCartItems() {
	const cartItemsContainer = document.getElementById("cart-items");
	cartItemsContainer.innerHTML = "";
	let subtotal = 0;

	cart.forEach((item) => {
		if (item.name && item.price) {
			const total = item.price * item.quantity;
			subtotal += total;
			cartItemsContainer.innerHTML += `
                <tr>
                    <td><img src="${item.imageSrc}" alt="${item.name}"> ${item.name}</td>
                    <td>${item.price} UGX</td>
                    <td><input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)" /></td>
                    <td>${total} UGX</td>
                    <td><button class="remove-btn" onclick="removeItem(${item.id})"><i class="fas fa-trash"></i></button></td>
                </tr>
            `;
		}
	});

	document.getElementById("subtotal").innerText = `UGX ${subtotal}`;
}

// Function to update item quantity
function updateQuantity(id, quantity) {
	const item = cart.find((product) => product.id === id);
	if (item) {
		item.quantity = parseInt(quantity);
		localStorage.setItem("cart", JSON.stringify(cart));
		renderCartItems();
	}
}

// Function to remove an item from the cart
function removeItem(id) {
	cart = cart.filter((product) => product.id !== id);
	localStorage.setItem("cart", JSON.stringify(cart));
	renderCartItems();
}

// Function to add a product to the cart (called from the product page)
function addToCart(id, name, price, imageSrc) {
	const existingProduct = cart.find((item) => item.id === id);

	if (existingProduct) {
		existingProduct.quantity++;
	} else {
		cart.push({ id, name, price, quantity: 1, imageSrc });
	}

	localStorage.setItem("cart", JSON.stringify(cart));
	alert(`${name} added to your cart!`);
}

// Initial render of cart items
renderCartItems();
