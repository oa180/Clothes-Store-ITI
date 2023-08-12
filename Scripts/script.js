"use strict";
// import allProducts from "./Data/products" assert { type: "json" };

/**Window Onload  */
window.addEventListener("load", () => {
  updateCartItemsPadge();
});

const allProducts = data;
console.log(allProducts);

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
    // navbar.style.top = "-100px";
    navbarSearch.classList.add("hide-search");
  }
});

// Image Slider
let i = 0;
const sliderImages = [
  "../images/hero-banner.jpg",
  "../images/blog-3.jpg",
  "../images/blog-2.jpg",
];

/** ************************************************* */
/** DOM Elements */

const sliderImg = document.querySelector("[displayed-img ]");
const nextBtn = document.querySelector("[next-btn]");
const prevtBtn = document.querySelector("[prev-btn]");
const searchInput = document.getElementsByClassName("input-field");
const categoryItem = document.querySelectorAll(".category a");

/** ************************************************* */
/** Evets Listners */

/**Nav bar Events */

// Cart Event
const cartBtn = document.getElementsByClassName("cart-btn")[0];

cartBtn.addEventListener("click", function () {
  window.open("./cart.html", "_self");
});

/** ************************************************* */

/** Slider Event */
nextBtn.addEventListener("click", function () {
  i++;
  i == sliderImages.length ? (i = 0) : (i = i);

  sliderImg.src = sliderImages[i];
});

prevtBtn.addEventListener("click", function () {
  i--;
  i < 0 ? (i = sliderImages.length - 1) : (i = i);

  sliderImg.src = sliderImages[i];
});

/** Search Bar Evetn */
// searchInput.addEventListener("input", function () {
//   products = searchProduct(products, this.value);
// });

searchInput[1].addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const products = searchProduct(allProducts, this.value);

    console.log(products);

    displayListOfProducts(products);
  }
});
// searchInput.forEach((s) => {
//   s.addEventListener("keypress", function (e) {
//     if (e.key === "Enter") {
//       const products = searchProduct(allProducts, this.value);

//       console.log(products);

//       displayListOfProducts(products);
//     }
//   });
// });

categoryItem.forEach((item) => {
  item.addEventListener("click", function () {
    const products = searchProduct(allProducts, item.id, "category");
    displayListOfProducts(products);
  });
});

/** ************************************************* */
/**
 * Categories => [women, men, accessories, foot-wear, sunglasses, ]
 */
/**
 * Display Products Function
 */

let addToCartBtn = null;
const productsContainer = document.querySelector(
  ".section .container .product-list"
);

function displayListOfProducts(products) {
  // Css Selector ['.section .container]

  productsContainer.innerHTML = "";
  products.forEach((product) => {
    productsContainer.innerHTML += `<li>
    <div class="product-card">
    <figure class="card-banner">
    <a href="#">
    <img
    src="${product.image}"
    alt="${product.productName}"
    id="img-${product.id}"
    onclick="showProductDetails(${product.id})"
    width="800"
    height="1034"
            class="w-100"
          />
        </a>
        ${
          product.padge.length > 0
            ? product.padge == "offer"
              ? `<div class="card-badge red">--25%</div>`
              : `<div class="card-badge green">New</div>`
            : ""
        }
        <div class="card-actions">
        <button class="card-action-btn" aria-label="Quick view">
        <ion-icon name="eye-outline"></ion-icon>
        </button>
          <button
          class="card-action-btn cart-btn"
            aria-label="Add to Cart"
            onclick="addItemToCart(${product.id})" >
            <ion-icon
              name="bag-handle-outline"
              aria-hidden="true"
            ></ion-icon>
            <p>Add to Cart</p>
            </button>
            <button
            class="card-action-btn"
            aria-label="Add to Wishlist"
            >
            <ion-icon name="heart-outline"></ion-icon>
            </button>
            </div>
            </figure>
            
      <div class="card-content">
        <h3 class="h4 card-title">
          <a href="#">${product.productName}</a>
        </h3>
        <div class="card-price">
        <data value="${product.price}">&pound;${product.price}</data>
        ${
          product.offerPrice.length > 0
            ? `<data value="37.57">&pound;37.75</data>`
            : ""
        }
            </div>
            </div>
            </div>
            </li>`;
  });
}

/**Add To Cart Fuctionality */
//BUG I am not able to access the add to cart btn, because it was printed before the produts are loaded
function addItemToCart(pId) {
  if (localStorage.getItem(pId)) {
    let itemCurrentCount = localStorage.getItem(pId);
    localStorage.setItem(pId, ++itemCurrentCount);
  } else {
    localStorage.setItem(pId, 1);
    updateCartItemsPadge();
  }
}

/**
 * Search Functionality
 */

function searchProduct(data, searchTxt, optional) {
  console.log(optional);

  if (arguments.length == 2) return search(data, searchTxt, "productName");
  else if (arguments.length == 3) return search(data, searchTxt, optional);
}

function search(data, searchTxt, attribute) {
  const searchResultArr = [];

  data.forEach((d) => {
    if (d[attribute].toLowerCase().includes(searchTxt.toLowerCase()))
      searchResultArr.push(d);
  });

  return searchResultArr;
}

// Updata Cart Badge Number
function updateCartItemsPadge() {
  let badgeValue = document.getElementsByClassName("cart-no-items")[0];
  let itemsInProduct = Object.keys({ ...localStorage }).filter(
    (key) => key != "current-prod"
  );

  badgeValue.innerText = `${itemsInProduct.length}`;
}
/************************ */
displayListOfProducts(allProducts);
// searchProduct(products, "shirt");

/************************========================== */
// Display Product Details
function showProductDetails(pid) {
  localStorage.setItem("current-prod", pid);
  window.open("./product-details.html", "_self");
}

/************************========================== */
// Filters
let filter = null;
const filterBtn = document.getElementsByClassName("filter-list")[0];
filterBtn.addEventListener("click", (event) => {
  console.log(event.target.innerText);
  filter = event.target.innerText;
  filterProducts();
});

function filterProducts() {
  let sortedProducts = null;
  if (filter == "Highest Prices") {
    filter = "price";
    sortedProducts = allProducts.sort(sortDesc);
  } else if (filter == "Lowest Prices") {
    filter = "price";
    sortedProducts = allProducts.sort(sortAsc);
  } else if (filter == "High Rate") {
    filter = "rate";
    sortedProducts = allProducts.sort(sortAsc);
  } else if (filter == "New Arrival") {
    filter = "new";
    sortedProducts = filterOnBadges(allProducts, filter);
  }
  displayListOfProducts(sortedProducts);
}

function sortAsc(p1, p2) {
  return p1[filter] - p2[filter];
}
function sortDesc(p1, p2) {
  return p2[filter] - p1[filter];
}
function filterOnBadges(products, filter) {
  return products.filter((product) => product.padge == filter);
}
