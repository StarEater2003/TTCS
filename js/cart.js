const modal = document.getElementById('cartModal');
const btn = document.querySelector('.cart');
const span = document.getElementsByClassName('close')[0];
let cart=[]
btn.onclick = function() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.textContent = 'Giỏ hàng rỗng. Hãy chọn sản phẩm';
    } else {
        let count = 1;
        let totalPrice = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `<strong>${count++}</strong>. ${item.name} - ${item.price} - Số lượng: ${item.quantity}`;
            cartItemsDiv.appendChild(cartItem);
            totalPrice += parsePrice(item.price) * parseInt(item.quantity);
        });

        const totalDiv = document.createElement('div');
        totalDiv.classList.add('cart-total');
        totalDiv.innerHTML = `<strong>Tổng tiền: ${formatPrice(totalPrice)}</strong>`;
        cartItemsDiv.appendChild(totalDiv);
    }

    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function parsePrice(priceString) {
    // Loại bỏ dấu chấm và ký tự "đ"
    const cleanedString = priceString.replace(/[.đ]/g, '');
    // Chuyển đổi chuỗi còn lại thành số nguyên
    const priceNumber = parseInt(cleanedString, 10);
    return priceNumber;
}
function formatPrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
}