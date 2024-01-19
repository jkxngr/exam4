import { getProducts, getCategory } from "./service.js";

const hero_cards = document.querySelector(".hero_cards");
const seller_cards = document.querySelector(".seller_cards");
const card_type_block = document.querySelector(".card_type_block");
const header_search = document.querySelector(".header_search");
const list_products = document.querySelector(".list_products");
const item_count = document.querySelector(".item_count");
let count = 0;
const renderHero = async () => {
  const data = await getProducts();
  hero_cards.innerHTML = data
    ?.map(
      (item) => `

    <div class="hero_card">
    <div class="hero_card_title_block">
      <h2 class="hero_card_title">${
        item.title.split("").length > 30
          ? item.title.slice(0, 30) + "..."
          : item.title
      }
      </h2>
      <p class="hero_card_price">
        <p class="hero_card_price_top"></p>
        <span class="price_item">$${item.price}</span>
      </p>
      
    </div>
    <div>
    <img src="${item.image}" alt="" class="hero_card_image" />
    </div>
    <div class="hero_price_block">
      <p class="hero_card_real_price">${item.price}</p>
      <p class="hero_card_discount">24% Off</p>
    </div>
  </div>
  `
    )
    .join("");
};
renderHero();

const renderProduct = async (category) => {
  const url =
    category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;
  const res = await fetch(url);
  const data = await res.json();
  seller_cards.innerHTML = data
    ?.map((item) => {
      return `
     
        <div class="serller_card">
            <img src="${item.image}" class="product_image" alt="" />
            <h3 class="product_title"> ${item.title}</h3>
            <img src="./img/star.svg" alt="" class="product_stars" />
           <div class="seller_price_block">
              <p class="seller_price_blue">$${item.price}</p>
              <p class="seller_price">$534,33</p>
              <p class="seller_price_discount">24% Off</p>
            </div>
            <div class="icon_block">
              <a href="http://127.0.0.1:5500/detail.html?id=${item.id}"><img class="info_icon" src="./img/info_icon.svg" alt="" /></a>
              <a  data-id href="http://127.0.0.1:5500/cart.html?id=${item.id}"><img data-id class="cart_icon" src="./img/Cart.svg" alt="" /></a>
            </div>
        </div>
    
      `;
    })
    .join("");
  const categoryButtons = document.querySelectorAll(".category_name");
  categoryButtons.forEach((button) => {
    button.classList.remove("category_active");
  });
  const activeButton = document.querySelector(
    `.category_name[data-category="${category}"]`
  );
  if (activeButton) {
    activeButton.classList.add("category_active");
  }
};
renderProduct();

const getCategories = async () => {
  try {
    const categories = await getCategory();
    const all = document.createElement("div");
    all.classList.add("category_name");
    all.dataset.category = "all";
    all.innerHTML = `<h3 class="category_name">All Categories</h3>`;
    all.addEventListener("click", () => {
      renderProduct("all");
    });
    card_type_block.appendChild(all);
    categories.forEach((category) => {
      const categoryEl = document.createElement("div");
      categoryEl.classList.add("category_name");
      categoryEl.dataset.category = category;
      categoryEl.innerHTML = `<h3 class="category_name">${category}</h3>`;
      categoryEl.addEventListener("click", () => {
        renderProduct(category);
      });
      card_type_block.appendChild(categoryEl);
    });
    renderProduct("all");
  } catch (error) {}
};
getCategories();

header_search.addEventListener("keyup", async (e) => {
  const res = await fetch("https://fakestoreapi.com/products/");
  const data = await res.json();
  list_products.innerHTML = data
    ?.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    )
    ?.map(
      (item) => `

    <div class="search_card">
        <img width="100" src="${item.image}" alt="" />
        <p class="search_text">${item.title}</p>
    </div>

  `
    )
    .join("");
  list_products.style.height = "400px";
  if (!e.target.value) {
    list_products.innerHTML = "";
    list_products.style.height = "0px";
  }
});
window.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-id")) {
    item_count.innerHTML = ++count;
  }
});


$(".slider").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});