/** @format */

document
	.querySelector(".search-bar button")
	.addEventListener("click", function () {
		const query = document.querySelector(".search-bar input").value.trim();
		if (query) {
			// Simulate search by redirecting to a products page with search results
			window.location.href = `products.html?search=${encodeURIComponent(
				query
			)}`;
		} else {
			alert("Please enter a search query.");
		}
	});
