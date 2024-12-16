import api from "../services/cms-api.js";
import filter from "./../services/product_filter.js";

const getElmId = (id) => document.getElementById(id);

const renderListProduct = (data) => {
  let content = "";
  data.forEach((product, index) => {
    content += `
      <tr class="bg-white border-b">
        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${
          index + 1
        }</td>
        <td class="px-6 py-4">${product.name}</td>
        <td class="px-6 py-4">${product.price}</td>
        <td class="px-6 py-4">
            <img src="${product.img}" width="60"/>
        </td>
        <td class="px-6 py-4">${product.desc}</td>
        <td class="px-6 py-4">
          <button
            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Edit
          </button>
          <button
            class="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Delete
          </button>
        </td>
      </tr>
    `;
  });
  getElmId("tbListProduct").innerHTML = content;
};

const getListProduct = () => {
  const promise = api.fetchData();
  promise
    .then((result) => {
      renderListProduct(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

getListProduct();