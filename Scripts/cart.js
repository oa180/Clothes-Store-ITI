// Reading Data From File
const allProducts = data;
/**========================================= */

/**On Window Load Action */
window.addEventListener("load", (event) => {
  displayItemInCart();
});

/**Increase and deacrease item count in the cart */
function increaseValue(pid) {
  let value = parseInt(document.getElementsByClassName(pid)[0].value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementsByClassName(pid)[0].value = value;
  localStorage.setItem(pid, value);
  // Update total price
  displayItemInCart();
}
function decreaseValue(pid, event) {
  let value = parseInt(document.getElementsByClassName(pid)[0].value, 10);
  value = isNaN(value) ? 0 : value;
  value--;
  value = value < 0 ? 0 : value;
  document.getElementsByClassName(pid)[0].value = value;
  localStorage.setItem(pid, value);

  // Remove item form cart if its value reached 0
  if (localStorage.getItem(pid) == 0) removeCartItem(pid, event);
  // Update total price
  displayItemInCart();
}

/**================================================================ */
/**Add To Cart Fuctionality */
const cartList = document.getElementsByClassName("items-list")[0];

// Get items are in Cart
function getItemsInCart() {
  return Object.keys({ ...localStorage }).filter(
    (key) => key != "current-prod"
  );
}

// Get Item Info
function getItemInfo(pid) {
  // Search in local Storage Items  only becasue the current prod item
  const foundedItem = updateCartItemsPadge().filter((item) => item == pid);

  const product = allProducts.find((product) => product.id == foundedItem[0]);

  return {
    productName: product.productName,
    image: product.image,
    price: product.price,
  };
}
// Display item in cart
function displayItemInCart() {
  const totalPrice = document.getElementById("total-price");
  cartList.innerHTML = "";
  let tPrice = 0;

  console.log(getItemsInCart());

  for (const pid of getItemsInCart()) {
    console.log(pid);

    const { productName, image, price } = getItemInfo(pid);
    // console.log(getItemInfo(pid));

    cartList.innerHTML += `<li class="cart-item" onclick="changeCartFocusImg('${image}')">
    <img
      src="${image}"
      width="80px"
      alt=""
      class="cart-item-img"
    />
    <div class="cart-item-details">
      <p class="cart-item-name">${productName}</p>
      <div class="cart-item-prbn">
        <p class="cart-item-price">${price}</p>
        <button class="delete-cart-item" onclick="removeCartItem(${pid}, event)">
          <ion-icon name="trash-bin-outline"></ion-icon>
        </button>
        <div class="count-btn">
          <div
            class="value-button"
            id="decrease"
            onclick="decreaseValue(${pid}, event)"
            value="Decrease Value"
          >
            -
          </div>
          <input type="number" id="number" class="${pid}" value="${localStorage.getItem(
      pid
    )}" />
          <div
            class="value-button"
            id="increase"
            onclick="increaseValue(${pid})"
            value="Increase Value"
          >
            +
          </div>
        </div>
      </div>
    </div>
    </li>`;

    /**===================== */

    // Update Total Price
    // console.log(localStorage.getItem(pid));

    // updateTotalPrice(totalPrice, tPrice);
    // Update Cart Padge Number
    tPrice += localStorage.getItem(pid) * Number(price);
  }
  updateCartItemsPadge();
  updateTotalPrice(totalPrice, tPrice);
}

/**============================================== */
/**Remove Item From Cart */
const removebtn = document.getElementsByClassName("delete-cart-item"[0]);
function removeCartItem(pid, event) {
  console.log("click");
  event.stopPropagation();

  localStorage.removeItem(pid);
  changeCartFocusImg("../images/shiipingcart2resized.jpg");
  displayItemInCart();
  Toastify({
    text: "Item Removed",
    className: "info",
    style: {
      background: `linear-gradient(
        30deg,
        var(--ocean-green) 0%,
        var(--middle-blue-green) 100%
      )`,
    },
  }).showToast();
}

/**============================================== */
/**Update Cart Page */
function updateCartItemsPadge() {
  let badgeValue = document.getElementsByClassName("cart-no-items")[0];
  let itemsInCart = Object.keys({ ...localStorage }).filter(
    (key) => key != "current-prod"
  );

  // console.log(itemsInCart);

  badgeValue.innerText = `${itemsInCart.length}`;

  return itemsInCart;
}

/**============================================== */
/**Update Cart Total Price */
function updateTotalPrice(totalPriceElment, tPrice) {
  totalPriceElment.innerHTML = `$${tPrice}`;
}

/**============================================== */
/**cart-focus-img */

function changeCartFocusImg(img) {
  const imgELement = document.querySelector(".cart-focus-img img");

  imgELement.src = img;
}
