// cart-function.js
document.addEventListener('DOMContentLoaded', () => {
    const filledCartItems = document.getElementById('filled-cart-items');
    const youMayAlsoLike = document.getElementById('you-may-also-like');

    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const filledCartItems = document.getElementById('filled-cart-items');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const orderDetails = document.getElementById('order-details');
        const suggestions = document.getElementById('suggestions');

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            filledCartItems.style.display = 'none';
            orderDetails.style.display = 'none';
            suggestions.style.display = "flex";
            youMayAlsoLike.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            filledCartItems.style.display = 'inline-block';
            orderDetails.style.display = 'inline-block';
            suggestions.style.display = 'none';
            youMayAlsoLike.style.display = 'flex';
            populateCartItems(cart);
            updateOrderDetails(cart);
        }
    }

    function populateCartItems(cartItems) {
        filledCartItems.innerHTML = ''; // Clear previous items
        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <p>${item.name}</p>
                    <div class="item-price">${item.price}</div>
                    <p>Size: ${item.size}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-id="${item.productId}" data-size="${item.size}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-id="${item.productId}" data-size="${item.size}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.productId}" data-size="${item.size}">Remove</button> 
                </button>
            `;
            filledCartItems.appendChild(cartItemDiv);
        });
        addEventListeners(cartItems);
    }

    function updateOrderDetails(cartItems) {
        let totalItems = 0;
        let originalPrice = 0;
        cartItems.forEach(item => {
            totalItems += item.quantity;
            originalPrice += parseFloat(item.price.replace('$', '')) * item.quantity;
        });

        document.querySelector('#order-details p:nth-child(2)').textContent = `Number of Items ${totalItems}`;
        document.querySelector('#order-details p:nth-child(3)').textContent = `Original Price $${originalPrice.toFixed(2)}`;

        updateTotal(originalPrice, 0); // Initially no discount
    }

    function updateTotal(originalPrice, discount) {
        document.getElementById('cart-total').innerHTML = `<strong>TOTAL</strong> <strong>$${(originalPrice - discount).toFixed(2)}</strong>`;
    }

    function addEventListeners(cartItems) {
        // Quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.id;
                const size = this.dataset.size;
                const isIncrement = this.textContent === '+';
                updateQuantity(productId, size, isIncrement, cartItems);
            });
        });
        // Remove items
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.id;
                const size = this.dataset.size;
                removeItem(productId, size, cartItems);
            });
        });
        // Discount code
        document.getElementById('apply-discount').addEventListener('click', function() {
            applyDiscount(cartItems);
        });
    }

    function updateQuantity(productId, size, isIncrement, cartItems) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let updated = false;
        cart = cart.map(item => {
            if (item.productId === productId && item.size === size) {
                item.quantity = isIncrement ? item.quantity + 1 : Math.max(1, item.quantity - 1);
                updated = true;
            }
            return item;
        });
        if (updated) {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay(); // Update the display
        }
    }

    function removeItem(productId, size, cartItems) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => !(item.productId === productId && item.size === size));
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay(); // Update the display
    }

    function applyDiscount(cartItems) {
        const discountCode = document.getElementById('discount-code').value.toUpperCase(); // Convert to uppercase once
        let discount = 0;
        let originalPrice = 0;
    
        cartItems.forEach(item => {
            originalPrice += parseFloat(item.price.replace('$', '')) * item.quantity;
        });
    
        if (discountCode === 'NEW15') {
            discount = originalPrice * 0.15;
            document.getElementById('discount-message').textContent = "Discount applied!";
        } else if (discountCode === 'SHOP1OFF') {
            discount = 1;
            document.getElementById('discount-message').textContent = "Discount applied!";
        } else if (discountCode === 'SHOP5OFF') {
            if (originalPrice >= 35) {
                discount = originalPrice * 0.05;
                document.getElementById('discount-message').textContent = "Discount applied!";
            } else {
                document.getElementById('discount-message').textContent = "Minimum $35 required for 5% discount.";
            }
        } else if (discountCode === 'SHOP10OFF') {
            if (originalPrice >= 60) {
                discount = originalPrice * 0.1;
                document.getElementById('discount-message').textContent = "Discount applied!";
            } else {
                document.getElementById('discount-message').textContent = "Minimum $60 required for 10% discount.";
            }
        } else {
            document.getElementById('discount-message').textContent = "Invalid discount code.";
        }
    
        updateTotal(originalPrice, discount);
        document.querySelector('#order-details p:nth-child(6)').textContent = `Voucher Discount $${discount.toFixed(2)}`;
    }

    // Initial call to update display
    updateCartDisplay();

    // Listen for storage events
    window.addEventListener('storage', (event) => {
        if (event.key === 'cart') { // Check if the cart was changed
            updateCartDisplay();
        }
    });

    // Expose updateCartDisplay globally
    window.updateCartDisplay = updateCartDisplay;
});

document.addEventListener('DOMContentLoaded', function() {
    const placeorderButton = document.getElementById('placeorder-btn');

    placeorderButton.addEventListener('click', function() {
        window.location.href = 'OrderConfirmed.html';
    });
});