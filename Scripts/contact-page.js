/**========================================= */

/**On Window Load Action */
window.addEventListener("load", (event) => {
  updateCartItemsPadge();
});

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navbarSearch = document.querySelector(".hide-search");

const navElemArr = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    // console.log(navElemArr[i]);
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

// Hide Header when scrolling 200px
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (this.window.scrollY >= 200) {
    header.classList.add("hidden");
    navbarSearch.classList.remove("hide-search");
  } else {
    header.classList.remove("hidden");
    navbarSearch.classList.add("hide-search");
  }
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
