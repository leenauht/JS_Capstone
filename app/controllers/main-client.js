import productList from "../services/product_lists.js";

const getEleId = (id) => document.getElementById(id);

// State for cart items
let productInCart = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : []; // Giỏ hàng lấy từ localStorage hoặc là mảng rỗng

/**
 * Render SP
 */
const renderList = (data) => {
  let content = "";
  data.forEach((product) => {
    const { img, name, price, desc } = product;
    content += `
<div>
  <img class="h-auto max-w-full rounded-lg"
    src="./../../img/${img}" alt="">
  <div class="noiDungSp mt-4">
    <h4 id="tenSP" class="text-2xl">${name}</h4>
    <h7 class="moTaSP" class="text-xs">${desc}</h7>
    <h2 id="giaSP" class="text-xl text-red-500">${price}</h2>
    <button id="muaSP" type="button"
      class="ease-out duration-300 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Thêm
      vào giỏ hàng</button>
  </div>
</div>
    `;
  });
  getEleId("mainProduct").innerHTML = content;
};

// show loader
getEleId("loader").style.display = "block";

const fetchList = () => {
  const promise = axios({
    url: "https://6756aa03c0a427baf949beca.mockapi.io/api/Products",
    method: "GET",
  });
  promise
    .then((result) => {
      renderList(result.data);
      getEleId("loader").style.display = "none";
    })
    .catch((error) => {
      console.log(error);
      getEleId("loader").style.display = "none";
    });
};
fetchList();
