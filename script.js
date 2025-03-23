document.addEventListener("DOMContentLoaded", function () {
    var addToCartButton = document.getElementById("adCardButton");
    addToCartButton.addEventListener("click", function () {
        var productName = document.querySelector(".single-pro-details h4").innerText;
        var productPriceText = parseFloat(document.getElementById("adPrice").innerText);
        var productPrice = parseFloat(productPriceText);
        var productQuantity = parseInt(document.getElementById("quantity").value);
        var subtotal = productPrice * productQuantity;

        var cartItem = {
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            subtotal: subtotal
        };

        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(cartItem);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        window.location.href = "cart.html";
    });

 
    var cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            var row = event.target.closest('tr');
            var itemId = row.id;

        
            var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            cartItems = cartItems.filter(function (item) {
                return item.name !== itemId;
            });

       
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

 
            row.remove();
        }
    });
});
