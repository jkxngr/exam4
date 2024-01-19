const product_detail = document.querySelector(".product_detail");
let params = new URLSearchParams(document.location.search);

const siteUrl = "https://fakestoreapi.com/products/";
const id = params.get("id");

const renderCart = async () => {
  try {
    const res = await fetch(`${siteUrl}/${id}`);
    const data = await res.json();
    product_detail.innerHTML = `
    <div class="detail_card">
    <div>
      <img class="detail_img" src="${data.image}" alt="" />
    </div>
    <div style="width:700px">
      <p class="detail_text"> <span class="detail_title"> Title :</span> ${data.title}</p>
      <p class="detail_text">
        <span class="detail_title">Description:</span>
        ${data.description}
      </p>
      <p class="detail_text"><span class="detail_title">Price:</span> ${data.price}$</p>
      <p class="detail_text"><span class="detail_title">Category:</span> ${data.category}</p>
    </div>
  </div>
     
      `;
  } catch (error) {
    console.log(error);
  }
};
renderCart();
