document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch('../JSON/products.json')
        .then(response => response.json())
        .then(data => {
            if (data[productId]) {
                const product = data[productId];

                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-image').src = product.image;
                document.getElementById('product-price').textContent = product.price;

                const sizesContainer = document.getElementById('product-sizes');
                let selectedSize = null;

                product.sizes.forEach(size => {
                    const sizeButton = document.createElement('button');
                    sizeButton.textContent = size;
                    sizeButton.classList.add('size-button');
                    sizeButton.addEventListener('click', function() {
                        // Remove 'selected' class from all buttons
                        document.querySelectorAll('.size-button').forEach(btn => {
                            btn.classList.remove('selected');
                        });

                        // Add 'selected' class to the clicked button
                        this.classList.add('selected');

                        selectedSize = size;
                        console.log("Selected size:", size);
                    });
                    sizesContainer.appendChild(sizeButton);
                });

                document.getElementById('add-to-cart').addEventListener('click', function() {
                    const quantity = parseInt(document.getElementById('quantity').value);
                    if (!selectedSize) {
                        alert("Please select a size.");
                        return;
                    }

                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    let itemExists = false;

                    // Check if the item already exists in the cart with the same size
                    cart = cart.map(item => {
                        if (item.productId === productId && item.size === selectedSize) {
                            item.quantity += quantity; // Update quantity
                            itemExists = true;
                        }
                        return item;
                    });

                    // If the item doesn't exist, add it to the cart
                    if (!itemExists) {
                        const cartItem = {
                            productId: productId,
                            name: product.name,
                            image: product.image,
                            price: product.price,
                            size: selectedSize,
                            quantity: quantity
                        };
                        cart.push(cartItem);
                    }

                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert("Product added to cart!");

                    if (window.updateCartDisplay) {
                        window.updateCartDisplay();
                    }
                });

            } else {
                console.error("Product not found:", productId);
            }
        })
        .catch(error => console.error("Error fetching JSON:", error));
});