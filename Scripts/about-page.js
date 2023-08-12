/**Window Onload  */
window.addEventListener("load", () => {
  updateCartItemsPadge();
});

/** ************************************************* */
/** Evets Listners */

/**Nav bar Events */

// Cart Event
const cartBtn = document.getElementsByClassName("cart-btn")[0];

cartBtn.addEventListener("click", () => window.open("./cart.html", "_self"));

// Shop Now Event
const shopNowBtn = document.getElementsByClassName("shopBtn")[0];

shopNowBtn.addEventListener("click", () =>
  window.open("./index.html", "_self")
);

/**============================================== */
/**Update Cart Page */
function updateCartItemsPadge() {
  let badgeValue = document.getElementsByClassName("cart-no-items")[0];
  let itemsInProduct = Object.keys({ ...localStorage }).filter(
    (key) => key != "current-prod"
  );

  console.log(itemsInProduct);

  badgeValue.innerText = `${itemsInProduct.length}`;
}
