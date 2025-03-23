document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    console.log("Product ID from URL:", productId); // Debugging

    fetch('../JSON/products.json')
        .then(response => response.json())
        .then(data => {
            console.log("JSON Data:", data); // Debugging

            if (data[productId]) {
                const product = data[productId];

                console.log("Product Data:", product); // Debugging

                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-image').src = product.image;
                document.getElementById('product-price').textContent = product.price;
                document.getElementById('product-sizes').textContent = "Sizes: " + product.sizes.join(', ');

                // Add more fields as needed

            } else {
                console.error("Product not found:", productId); // Debugging
            }
        })
        .catch(error => console.error("Error fetching JSON:", error)); // Debugging
});