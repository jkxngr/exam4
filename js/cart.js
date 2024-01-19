const cart_items = document.querySelector(".cart_items");
let params = new URLSearchParams(document.location.search);

const siteUrl = "https://fakestoreapi.com/products/";
const id = params.get("id");

let item = null;
let items = JSON.parse(localStorage.getItem("items"));
let oldProducts = items ? items : [];

const renderCart = async () => {
  try {
    const res = await fetch(`${siteUrl}/${id}`);
    item = await res.json();
    cart_items.innerHTML = `
    <div class="cart_item">
    <div class="cart_img_block">
    <button class="cart_delete_button" id="delete">x</button>
    <img class="cart_img" src="${item.image}" alt="" />
    <h3 class="cart_title">${item.title}</h3>
    </div>
    <div class="price_block">
      <p id="total">0</p>
      <div>
      <button id="plus">+</button>
      <span id="count">0</span>
      <button id="minus">-</button>
      </div>
      <p>${item.price}</p>
    </div>
  </div>
   
    `;
  } catch (error) {
    console.log(error);
  }
};

cart_items.addEventListener("click", (e) => {
  let count = document.querySelector("#count");
  let total = document.querySelector("#total");
  let id = e.target.id;
  let el = oldProducts.find((cart_item) => cart_item.id === item.id);
  if (id === "plus") {
    if (!el) {
      let newProduct = {
        ...item,
        userPrice: item.price,
        userCount: 1,
      };
      oldProducts.push(newProduct);
      count.textContent = 1;
      total.textContent = newProduct.userPrice + "$";
    } else {
      el.userCount += 1;
      el.userPrice = el.userCount * el.price;
      count.textContent = el.userCount;
    }
  }
  if (id === "minus") {
    if (el && el.userCount > 0) {
      el.userCount -= 1;
      el.userPrice = el.userCount * el.price;
      count.textContent = el.userCount;
    }
  }

  if (id === "delete") {
    const index = oldProducts.findIndex(
      (cart_item) => cart_item.id === item.id
    );
    if (index !== -1) {
      oldProducts.splice(index, 1);
    }
    cart_items.innerHTML = "";
  }
  total.textContent = el.userPrice + "$" ;
});

renderCart();
