(async () => {
    try {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();

        const wpProductDiv = document.querySelector('#wp-product .product-list');
        wpProductDiv.classList.add('product-list-container');
        products.forEach(product => {
            // Tạo một ô sản phẩm
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            // Thêm ảnh sản phẩm vào ô sản phẩm
            const productImage = document.createElement('img');
            productImage.src = product.imageUrl;
            productImage.classList.add('img-product')
            productItem.appendChild(productImage);

            // Thêm tên sản phẩm vào ô sản phẩm
            const productName = document.createElement('p');
            productName.textContent = product.name;
            productName.classList.add('product-name')
            productItem.appendChild(productName);

            // Thêm giá sản phẩm vào ô sản phẩm
            const productPrice = document.createElement('p');
            productPrice.textContent = product.price;
            productPrice.classList.add('product-price')
            productItem.appendChild(productPrice);

            // Thêm trường số lượng vào ô sản phẩm
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1; // Số lượng mặc định là 1
            quantityInput.min = 1;
            quantityInput.classList.add('quantity-input');
            productItem.appendChild(quantityInput);


            // Thêm vào giỏ hàng
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Thêm vào giỏ hàng';
            addToCartButton.classList.add('add-button');
            addToCartButton.addEventListener('click', () => {
                const quantity = parseInt(quantityInput.value);
                if (!isNaN(quantity) && quantity > 0) {
                    const productToAdd = { ...product, quantity }; // Thêm số lượng vào sản phẩm
                    addToCart(productToAdd);
                } else {
                    alert('Số lượng không hợp lệ.');
                }
            });
            productItem.appendChild(addToCartButton);


            // Thêm ô sản phẩm vào danh sách
            wpProductDiv.appendChild(productItem);
        });
    } catch (err) {
        console.error('Error retrieving data:', err);
    }
})();


function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push({ ...product });
    }
    alert(`${product.quantity} ${product.name} đã được thêm vào giỏ hàng.`);
}