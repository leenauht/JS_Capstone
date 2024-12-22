import productList from "../services/product_lists.js";
import api from "../services/cms-api.js";

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
    })
    .catch((error) => {
      console.log(error);
      getEleId("loader").style.display = "none";
    });
};
getListProduct();

// Add Products To Cart
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll("#muaSP");
  const cartTableBody = document.querySelector("#tbodyProduct");
  const btnThanhToan = document.querySelector("#btnThanhToan");

  // Load giỏ hàng từ localStorage nếu có
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Nếu không có giỏ hàng, khởi tạo mảng rỗng

  // Xử lý sự kiện khi nhấn "Thêm vào giỏ hàng"
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productContainer = this.closest("div.noiDungSp");
      const productName = productContainer
        .querySelector("#tenSP")
        .textContent.trim();
      const productPrice = productContainer
        .querySelector("#giaSP")
        .textContent.trim();
      const productImage =
        productContainer.previousElementSibling.getAttribute("src");

      const priceNumber = parseFloat(productPrice.replace(/[^0-9.-]+/g, ""));

      const existingProduct = cartItems.find(
        (item) => item.name === productName
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartItems.push({
          name: productName,
          price: priceNumber,
          priceFormatted: productPrice,
          image: productImage,
          quantity: 1,
        });
      }

      // Lưu giỏ hàng vào localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      renderCart(); // Cập nhật lại giỏ hàng
    });
  });

  // Hàm render giỏ hàng
  function renderCart() {
    cartTableBody.innerHTML = ""; // Xóa nội dung giỏ hàng cũ

    if (cartItems.length === 0) {
      cartTableBody.innerHTML =
        "<tr><td colspan='7' class='text-center'>Giỏ hàng của bạn hiện tại trống.</td></tr>";
      return;
    }

    let totalAmount = 0;

    cartItems.forEach((item, index) => {
      const totalPrice = item.price * item.quantity;
      const formattedPrice = formatPrice(item.price);
      const formattedTotalPrice = formatPrice(totalPrice);
      totalAmount += totalPrice;

      const row = `
        <tr>
          <td class="border p-2">${index + 1}</td>
          <td class="border p-2">${item.name}</td>
          <td class="border p-2"><img src="${item.image}" alt="${
        item.name
      }" class="w-16 h-16 rounded"></td>
          <td class="border p-2">
            <div class="flex items-center justify-center">
              <button onclick="decreaseQuantity('${
                item.name
              }')" class="px-2 py-1 text-white bg-red-500 rounded-lg">-</button>
              <span class="mx-2">${item.quantity}</span>
              <button onclick="increaseQuantity('${
                item.name
              }')" class="px-2 py-1 text-white bg-green-500 rounded-lg">+</button>
            </div>
          </td>
          <td class="border p-2">${formattedPrice}</td> <!-- Cập nhật hiển thị giá tiền không dấu phẩy -->
          <td class="border p-2">${formattedTotalPrice}</td> <!-- Cập nhật hiển thị thành tiền không dấu phẩy -->
          <td class="border p-2">
            <button class="text-red-500 hover:text-red-700" onclick="removeFromCart('${
              item.name
            }')">Xóa</button>
          </td>
        </tr>
      `;
      cartTableBody.insertAdjacentHTML("beforeend", row);
    });

    const totalFormatted = formatPrice(totalAmount);
    const totalRow = `
      <tr>
        <td colspan="5" class="text-right font-semibold">Tổng tiền:</td>
        <td class="border p-2">${totalFormatted}</td> <!-- Hiển thị tổng tiền không dấu phẩy -->
        <td class="border p-2"></td>
      </tr>
    `;
    cartTableBody.insertAdjacentHTML("beforeend", totalRow);
  }

  // Hàm định dạng giá tiền
  function formatPrice(amount) {
    return amount.toFixed(0);
  }

  // Hàm giảm số lượng sản phẩm
  window.decreaseQuantity = function (name) {
    const product = cartItems.find((item) => item.name === name);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
    } else if (product && product.quantity === 1) {
      cartItems = cartItems.filter((item) => item.name !== name);
    }

    // Lưu giỏ hàng vào localStorage sau khi thay đổi
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  };

  // Hàm tăng số lượng sản phẩm
  window.increaseQuantity = function (name) {
    const product = cartItems.find((item) => item.name === name);
    if (product) {
      product.quantity += 1;
    }

    // Lưu giỏ hàng vào localStorage sau khi thay đổi
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  window.removeFromCart = function (name) {
    cartItems = cartItems.filter((item) => item.name !== name);

    // Lưu giỏ hàng vào localStorage sau khi thay đổi
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  };

  // Thêm sự kiện cho nút "Thanh toán"
  if (btnThanhToan) {
    btnThanhToan.addEventListener("click", function () {
      // Xóa sạch giỏ hàng và localStorage
      cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Cập nhật giỏ hàng
      renderCart();

      // Thông báo thanh toán thành công
      alert("Thanh toán thành công!");
    });
  }

  // Render giỏ hàng khi trang tải lại
  renderCart();
});

// Thêm sản phẩm và đếm số lượng sản phẩm
let count = 0;
const handleAdd = (id) => {
  count++;
  getEleId("gioHang").innerHTML = `
          Xem giỏ hàng (${count})
        `;
  const promise = api.fetchData();
  promise
    .then((result) => {})
    .catch((error) => {
      console.log(error);
    });
};
window.handleAdd = handleAdd;
