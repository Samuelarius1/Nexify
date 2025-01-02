/** @format */

// Initialize the cart from localStorage, or as an empty array if no cart exists
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the cart in localStorage after any modification
function updateCartStorage() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to handle adding products to the cart when the button is clicked
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const productCard = button.closest(".product-card");
		const id = productCard.getAttribute("data-id");
		const name = productCard.getAttribute("data-name") || "Unnamed Product"; // Fallback to prevent null
		const price = parseInt(productCard.getAttribute("data-price")) || 0;
		const imageSrc = productCard.querySelector("img").src; // Get the image source

		if (!name || isNaN(price)) {
			alert("Product name or price is missing!");
			return; // Prevent adding invalid product
		}

		const product = {
			id,
			name,
			price,
			quantity: 1,
			imageSrc, // Include the image source in the product
		};

		// Add the product to the cart
		addToCart(product);

		// Show a confirmation alert
		alert(`${name} has been added to your cart!`);

		// Debugging: log the cart
		console.log(cart);
	});
});

// Function to add items to the cart
function addToCart(product) {
	const existingProductIndex = cart.findIndex((item) => item.id === product.id);

	if (existingProductIndex >= 0) {
		// If the product is already in the cart, increase the quantity
		cart[existingProductIndex].quantity += 1;
	} else {
		// Otherwise, add the new product to the cart
		cart.push(product);
	}

	// Update cart in localStorage
	updateCartStorage();

	// Debugging: log the updated cart
	console.log("Updated Cart:", cart);
}

// Function to dynamically update product image when uploading
document.querySelectorAll(".upload-image").forEach((input) => {
	input.addEventListener("change", function () {
		const productCard = this.closest(".product-card");
		const image = productCard.querySelector("img");
		const file = this.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				image.src = e.target.result; // Update image source dynamically
			};
			reader.readAsDataURL(file); // Read the image as a DataURL for preview
		}
	});
});

// Call updateCartStorage to make sure the cart persists between sessions
updateCartStorage();
