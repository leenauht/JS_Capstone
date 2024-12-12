import api from "../services/api.js";

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
            <button class="btn btn-primary">Edit</button>
            <button class="btn btn-danger">Delete</button>
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
