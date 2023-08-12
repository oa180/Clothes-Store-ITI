const products = data;
/**Window Onload  */
window.addEventListener("load", () => {
  updateCartItemsPadge();
  displayListOfProducts();
});

// Cart Event
const cartBtn = document.getElementsByClassName("cart-btn")[0];

cartBtn.addEventListener("click", function () {
  window.open("./cart.html", "_self");
});

/**============================================== */
/**Update Cart Page */
function updateCartItemsPadge() {
  let badgeValue = document.getElementsByClassName("cart-no-items")[0];
  let itemsInProduct = Object.keys({ ...localStorage }).filter(
    (key) => key != "current-prod"
  );

  badgeValue.innerText = `${itemsInProduct.length}`;
}

/**================================================ */
/**Find target Product */
function findProduct() {
  console.log(localStorage.getItem("current-prod"));

  return products.filter(
    (product) => product.id == localStorage.getItem("current-prod")
  );
}

/**================================================ */
/**Diaplay Product */
function displayListOfProducts() {
  const productsContainer =
    document.getElementsByClassName("product-container")[0];
  const product = findProduct()[0];
  console.log(product);

  productsContainer.innerHTML = "";

  productsContainer.innerHTML = `<div class="product-img-container">
    <img src="${product.image}" alt="" />
  </div>
  <div class="product-info">
    <h5>${product.category}</h5>
    <h2>${product.productName}</h2>
    <div class="product-rate">
      <h6>${product.brand}</h6>
      <h3>${product.rate}</h3>
    </div>
    <p>
    ${product.description}
    </p>
    <h3>$${product.price}</h3>

    <button onclick="addItemToCart(${product.id})">Add To Cart</button>
  </div>`;
}

/**Add To Cart Functionality */
function addItemToCart(pId) {
  if (localStorage.getItem(pId)) {
    let itemCurrentCount = localStorage.getItem(pId);
    localStorage.setItem(pId, ++itemCurrentCount);
  } else {
    localStorage.setItem(pId, 1);
    updateCartItemsPadge();
  }
}
