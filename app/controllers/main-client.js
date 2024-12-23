import productList from "../services/product_lists.js";
import api from "../services/cms-api.js";

const getEleId = (id) => document.getElementById(id);
// let listProduct = [];
let cartList = [];

/**
 * Render SP
 */
const renderList = (data) => {
  let content = "";

  data.forEach((product) => {
    const { img, name, price, desc, id } = product;
    content += `
      <div class="w-full shadow-blue-3 py-10 px-5 bg-bg-modal rounded-xl">
          <img class="max-w-60 rounded-lg"
            src="${img}" alt="logo">
          <div class="noiDungSp mt-4">
            <h4 class="tenSP" class="text-2xl mb-2 font-medium">${name}</h4>
            <p class="moTaSP">${desc}</p>
            <h2 class="giaSP text-xl text-red-500 my-2 font-medium">${price}</h2>
            <button onclick="handleAdd(${id})" type="button"
              class="ease-out duration-300 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Thêm
              vào giỏ hàng</button>
          </div>
      </div>
    `;
  });
  getEleId("container_product").innerHTML = content;
};

// show loader
getEleId("loader").style.display = "block";

const getListProduct = () => {
  const promise = api.fetchData();
  promise
    .then((result) => {
      renderList(result.data);
      getEleId("loader").style.display = "none";
      // listProduct = result.data;
      productList.addProduct(result.data);
    })
    .catch((error) => {
      console.log(error);
      getEleId("loader").style.display = "none";
    });
};
getListProduct();

// Set localStorage
const setLocalStorage = () => {
  const dataJson = cartList;
  // Convert dataJson to string
  const dataString = JSON.stringify(dataJson);
  // Save dataString to localStorage
  localStorage.setItem("CART_LIST", dataString);
};

// Get localStorage
const getLocalStorage = () => {
  const dataString = localStorage.getItem("CART_LIST");
  if (!dataString) return;
  // Convert dataString to Json
  const dataJson = JSON.parse(dataString);
  cartList = dataJson;
};
getLocalStorage();
// Render cart list
getEleId("gioHang").onclick = function () {
  let content = "";
  cartList.forEach((product, index) => {
    content += `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td class="flex items-center">
          <button onclick="handleDecreace(${
            product.id
          })" class="text-red-600 bg-gray-100 h-8 w-8 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M2 7.75A.75.75 0 0 1 2.75 7h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.75"/></svg>
          </button>
          <img src="${product.img}" alt="" width="50"/>
          <button onclick="handleIncreace(${
            product.id
          })" class="text-blue-600 bg-gray-100 h-8 w-8 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8"/><path fill="currentColor" d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"/></svg>
          </button>
        </td>
        <td>${product.amount}</td>
        <td>${product.price}</td>
        <td>${product.price * product.amount}</td>
      </tr>
  `;
  });
  getEleId("tbodyProduct").innerHTML = content;
};

const checkExist = (id) => {
  return cartList.some((item) => {
    return Number(id) === Number(item.id);
  });
};

const renderNumberCart = () => {
  let sum = 0;
  cartList.forEach((item) => {
    sum += item.amount;
  });
  getEleId("gioHang").innerHTML = `
          Xem giỏ hàng (${sum})
        `;
};
renderNumberCart();
// Thêm sản phẩm và đếm số lượng sản phẩm
const handleAdd = (id) => {
  const isValid = checkExist(id);

  if (isValid) {
    const resultIndex = cartList.findIndex((item) => {
      return Number(id) === Number(item.id);
    });
    cartList[resultIndex] = {
      ...cartList[resultIndex],
      amount: cartList[resultIndex].amount + 1,
    };
  } else {
    for (let i = 0; i < productList.arr.length; i++) {
      if (Number(id) === Number(productList.arr[i].id)) {
        cartList.push({
          ...productList.arr[i],
          amount: 1,
        });
        break;
      }
    }
  }
  renderNumberCart();
  alert("Thêm vào giỏ hàng thành công!");
  setLocalStorage();
};
window.handleAdd = handleAdd;

getEleId("btnThanhToan").onclick = function () {
  cartList = [];
  alert("Bạn đã mua thành công");
  getEleId("btn_close").click();
  localStorage.removeItem("CART_LIST");
  renderNumberCart();
};

getEleId("fillter").addEventListener("change", () => {
  const promise = api.fetchData();
  let listFillter = [];
  promise
    .then((result) => {
      const { data } = result;
      console.log(data);
      const value = getEleId("fillter").value;
      if (value === "Tất cả") {
        renderList(data);
      } else if (value === "Iphone") {
        data.forEach((item) => {
          if (item.type === "Iphone") {
            listFillter.push(item);
          }
          renderList(listFillter);
        });
      } else {
        data.forEach((item) => {
          if (item.type === "Samsung") {
            listFillter.push(item);
          }
          renderList(listFillter);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
const handleDecreace = () => {};
window.handleDecreace = handleDecreace;

const handleIncreace = () => {};
window.handleIncreace = handleIncreace;
