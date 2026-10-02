// ================================
// MOBILE MENU
// ================================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", function () {

        mobileMenu.classList.toggle("open");

    });

    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileMenu.classList.remove("open");

        });

    });

}


// ================================
// CART COUNT
// ================================

let cartCount = 0;
const cartNumber = document.querySelector(".cart span");
function updateCart() {
    cartNumber.textContent = cartCount;
}
updateCart();



// ========================================
// PRODUCT DATA
// ========================================

const products = {

    1: {
        name: "Farm Fresh Eggs",
        pack: "(12 eggs)",
        category: "FRESH EGGS",
         price: 72,
        image: "imges/individual_eggs.png",
        description:
            "Nutritious, high-quality eggs from healthy and well-cared poultry.",
        features: [
            "Farm fresh",
            "High quality",
            "Hygienically handled",
            "Suitable for home and commercial use"
        ]
    },


    2: {
        name: "Egg Trays",
        pack: "1 tray (30 eggs)",
        category: "EGG TRAYS",

        price: 180,
        image: "imges/single_tray.png",

        description:
            "Strong and convenient trays designed for safe egg handling and transport.",

        features: [
            "Good quality tray",
            "Suitable for egg transport",
            "Easy to handle",
            "Suitable for storage and supply"
        ]
    },


    3: {
        name: "Bulk Egg Supply",
        pack: "10 trays (300 eggs)",
        category: "BULK SUPPLY",
        price: 1800,
        image: "imges/bulk_egg.png",

        description:
            "Bulk egg supply for shops, hotels, restaurants and other business requirements.",

        features: [
            "Bulk quantity available",
            "Fresh egg supply",
            "Careful handling",
            "Suitable for commercial use"
        ]
    }

};// ========================================
// DISPLAY PRICES ON HOME PAGE
// ========================================

const eggsPrice = document.getElementById("price-eggs");

if (eggsPrice) {
    eggsPrice.textContent = `₹${products[1].price}`;
}


const trayPrice = document.getElementById("price-tray");

if (trayPrice) {
    trayPrice.textContent = `₹${products[2].price}`;
}


const bulkPrice = document.getElementById("price-bulk");

if (bulkPrice) {
    bulkPrice.textContent = `₹${products[3].price}`;
}


// ========================================
// GET PRODUCT ID FROM URL
// ========================================

const urlParams = new URLSearchParams(window.location.search);

let productId = urlParams.get("id");


// Support the old format also
if (!productId) {

    const oldProduct = urlParams.get("product");

    if (oldProduct === "eggs") {
        productId = "1";
    }

    else if (oldProduct === "tray") {
        productId = "2";
    }

    else if (oldProduct === "bulk") {
        productId = "3";
    }
}


// ========================================
// DISPLAY PRODUCT DETAILS
// ========================================

const product = products[productId];

if (product) {

    // Product image

    const productImage =
        document.querySelector(".product-detail-image img");

    if (productImage) {

        productImage.src = product.image;
        productImage.alt = product.name;

    }
    // Product price

const productPrice =
    document.getElementById("productPrice");

if (productPrice) {
    productPrice.textContent = `₹${product.price}`;
}


    // Category

    const category =
        document.querySelector(".product-category");

    if (category) {
        category.textContent = product.category;
    }


    // Product name

    const productName =
        document.querySelector(".product-detail-info h1");

    if (productName) {
        productName.textContent = product.name;
    }


    // Pack size

    const pack =
        document.querySelector(".product-detail-info h2");

    if (pack) {
        pack.textContent = product.pack;
    }


    // Description

    const description =
        document.querySelector(".detail-description");

    if (description) {
        description.textContent = product.description;
    }


    // Features

    const featuresContainer =
        document.querySelector(".detail-features");

    if (featuresContainer) {

        featuresContainer.innerHTML = "";

        product.features.forEach(function (feature) {

            const featureDiv =
                document.createElement("div");

            featureDiv.className = "detail-feature";

            featureDiv.innerHTML = `
                <span class="check">✓</span>
                <span>${feature}</span>
            `;

            featuresContainer.appendChild(featureDiv);

        });

    }

}

// ========================================
// UPDATE PRODUCT DETAIL PRICE
// ========================================

function updateDetailPrice() {

    const productPrice =
        document.getElementById("productPrice");

    if (productPrice && product) {

        productPrice.textContent =
            `₹${product.price * quantity}`;

    }

}
// ========================================
// QUANTITY
// ========================================

let quantity = 1;

const quantityDisplay =
    document.getElementById("quantity");

const decreaseBtn =
    document.getElementById("decreaseBtn");

const increaseBtn =
    document.getElementById("increaseBtn");


if (increaseBtn && quantityDisplay) {

    increaseBtn.addEventListener("click", function () {

        quantity++;

        quantityDisplay.textContent = quantity;
             updateDetailPrice();
    });

}


if (decreaseBtn && quantityDisplay) {

    decreaseBtn.addEventListener("click", function () {

        if (quantity > 1) {

            quantity--;

            quantityDisplay.textContent = quantity;
             updateDetailPrice();
        }

    });

}



// ========================================
// ADD TO CART
// ========================================

const addToCartBtn = document.getElementById("addToCartBtn");

if (addToCartBtn && product) {

    addToCartBtn.addEventListener("click", function () {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cart.find(
            item => item.id === productId
        );

        if (existingProduct) {

    existingProduct.quantity += quantity;
    existingProduct.price = product.price;

} else {

           cart.push({
    id: productId,
    name: product.name,
    image: product.image,
    quantity: quantity,
    price: product.price
});

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        showCartMessage("Your item has been added to the cart.");

    });

}


// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalQuantity = 0;

    cart.forEach(function (item) {

        totalQuantity += item.quantity;

    });

    const cartNumbers = document.querySelectorAll(".cart span");

    cartNumbers.forEach(function (number) {

        number.textContent = totalQuantity;

    });

}

updateCartCount();


// ========================================
// DISPLAY CART ITEMS
// ========================================

const cartItemsContainer = document.querySelector(".cart-items");

if (cartItemsContainer) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach(function (item) {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>

                <div class="cart-item-details">

                    <h2>
                        ${item.name}
                    </h2>

                    <p>
                        Product
                    </p>

                    <span class="cart-item-price">
                    ₹${item.price}
                    </span>

                </div>


                <div class="cart-quantity">

                    <button
                        type="button"
                        class="quantity-btn"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        class="quantity-btn"
                    >
                        +
                    </button>

                </div>


                <div class="cart-item-total">
                  ₹${item.price * item.quantity}
                </div>


    <button
    type="button"
    class="remove-item"
    title="Remove from cart"
>
    <i class="fa-solid fa-trash"></i>
</button>

            `;

            cartItemsContainer.appendChild(cartItem);

        });

    }

}

// ========================================
// CART QUANTITY BUTTONS
// ========================================

if (cartItemsContainer) {

    const quantityButtons =
        cartItemsContainer.querySelectorAll(".quantity-btn");

    quantityButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const cartItem =
                button.closest(".cart-item");

            const itemIndex =
                Array.from(
                    cartItemsContainer.children
                ).indexOf(cartItem);

            let cart =
                JSON.parse(localStorage.getItem("cart")) || [];

            const item = cart[itemIndex];

            if (!item) {
                return;
            }

            // PLUS
            if (button.textContent.trim() === "+") {

                item.quantity++;

            }

            // MINUS
            if (button.textContent.trim() === "−") {

                if (item.quantity > 1) {

                    item.quantity--;

                }

            }

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            updateCartCount();

            location.reload();

        });

    });

}
// ========================================
// REMOVE ITEM FROM CART
// ========================================

if (cartItemsContainer) {

    const removeButtons =
        cartItemsContainer.querySelectorAll(".remove-item");

    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const cartItem =
                button.closest(".cart-item");

            const itemIndex =
                Array.from(
                    cartItemsContainer.children
                ).indexOf(cartItem);

            let cart =
                JSON.parse(localStorage.getItem("cart")) || [];

            cart.splice(itemIndex, 1);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            updateCartCount();

            location.reload();

        });

    });

}


// ========================================
// CLEAR ENTIRE CART
// ========================================

const clearCartBtn =
    document.getElementById("clearCartBtn");

if (clearCartBtn) {

    clearCartBtn.addEventListener("click", function (event) {

        event.preventDefault();

        localStorage.removeItem("cart");

        updateCartCount();

        location.reload();
    
    });

}

// ========================================
// CART MESSAGE
// ========================================

function showCartMessage(message) {

    let messageBox = document.getElementById("cartMessage");

    if (!messageBox) {

        messageBox = document.createElement("div");

        messageBox.id = "cartMessage";

        document.body.appendChild(messageBox);

    }

    messageBox.textContent = message;

    messageBox.classList.add("show");

    setTimeout(function () {

        messageBox.classList.remove("show");

    }, 2500);
}

// ========================================
// UPDATE ORDER SUMMARY
// ========================================

function updateOrderSummary() {

    const cartTotalItems =
        document.getElementById("cartTotalItems");

    if (!cartTotalItems) {
        return;
    }

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(function (item) {
        totalItems += item.quantity;
    });

   cartTotalItems.textContent = totalItems;

const cartTotal =
    document.getElementById("cartTotal");

let totalAmount = 0;

cart.forEach(function (item) {

    totalAmount += item.price * item.quantity;

});

if (cartTotal) {

    cartTotal.textContent = `₹${totalAmount}`;

}

}

updateOrderSummary();

// ========================================
// DISPLAY CHECKOUT ORDER
// ========================================

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");

if (checkoutItems && checkoutTotal) {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    checkoutItems.innerHTML = "";

    let totalAmount = 0;

    cart.forEach(function (item) {

        totalAmount += item.price * item.quantity;

        const orderItem =
            document.createElement("div");

        orderItem.className = "checkout-item";

        orderItem.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>Quantity: ${item.quantity}</p>
            </div>

            <span>
                ₹${item.price * item.quantity}
            </span>
        `;

        checkoutItems.appendChild(orderItem);

    });

    checkoutTotal.textContent = `₹${totalAmount}`;

}

// ========================================
// PLACE ORDER
// ========================================

const checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

       localStorage.removeItem("cart");

        showOrderSuccess();

    });

}
// ========================================
// ORDER SUCCESS MESSAGE
// ========================================

function showOrderSuccess() {

    const overlay = document.createElement("div");

    overlay.className = "order-success-overlay";

    overlay.innerHTML = `
        <div class="order-success-box">

            <div class="order-success-icon">
                ✓
            </div>

            <h2>
                Order Placed Successfully!
            </h2>

            <p>
                Thank you for your order.
            </p>

            <button
                type="button"
                id="orderSuccessOk"
            >
                OK
            </button>

        </div>
    `;

    document.body.appendChild(overlay);


    const okButton =
        document.getElementById("orderSuccessOk");


    okButton.addEventListener("click", function () {

        window.location.href = "product.html";

    });

}// ========================================
// PAYMENT METHOD
// ========================================

const paymentOptions =
    document.querySelectorAll('input[name="paymentMethod"]');

const onlinePaymentBox =
    document.getElementById("onlinePaymentBox");

if (paymentOptions.length > 0 && onlinePaymentBox) {

    function updatePaymentMethod() {

        const selectedPayment =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );

        if (selectedPayment &&
            selectedPayment.value === "online") {

            onlinePaymentBox.style.display = "block";

        } else {

            onlinePaymentBox.style.display = "none";

        }

    }

    paymentOptions.forEach(function (option) {

        option.addEventListener("change", function () {

            updatePaymentMethod();

        });

    });

    updatePaymentMethod();

}
// ========================================
// CONTACT FORM
// ========================================

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        showMessageSent();

        contactForm.reset();

    });

}


// ========================================
// MESSAGE SENT POPUP
// ========================================

function showMessageSent() {

    const overlay =
        document.createElement("div");

    overlay.className = "message-sent-overlay";

    overlay.innerHTML = `
        <div class="message-sent-box">

            <div class="message-sent-icon">
                ✓
            </div>

            <h2>
                Message Sent Successfully!
            </h2>

            <p>
                Thank you for contacting us.
            </p>

            <button
                type="button"
                id="messageSentOk"
            >
                OK
            </button>

        </div>
    `;

    document.body.appendChild(overlay);


    document
        .getElementById("messageSentOk")
        .addEventListener("click", function () {

            overlay.remove();

        });

}