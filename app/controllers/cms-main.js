import api from "../services/cms-api.js";
import Products from "../models/cms-product.js";
import Validation from "../models/cms-validation.js";

export const getElmId = (id) => document.getElementById(id);

const validation = new Validation();

const getInfoInput = () => {
  const name = getElmId("name").value;
  const price = getElmId("price").value;
  const screen = getElmId("screen").value;
  const backCam = getElmId("backCam").value;
  const frontCam = getElmId("frontCam").value;
  const img = getElmId("img").value;
  const desc = getElmId("desc").value;
  const type = getElmId("type").value;

  // Check Validation
  let isValid = true;

  // Phone name
  isValid &=
    validation.checkEmpty(name, "tbname", "Please input phone name!") &&
    validation.checkSpecialCharacter(
      name,
      "tbname",
      "Must not contain special characters!"
    );
  // Phone price
  isValid =
    validation.checkEmpty(price, "tbprice", "Please input phone price!") &&
    validation.checkCharacterNumber(
      price,
      "tbprice",
      "The number you entered is invalid!"
    );

  // Phone screen
  isValid &= validation.checkEmpty(
    screen,
    "tbscreen",
    "Please input phone screen!"
  );

  // Back camera
  isValid &= validation.checkEmpty(
    backCam,
    "tbbackCam",
    "Please input back camera!"
  );

  // Front camera
  isValid &= validation.checkEmpty(
    frontCam,
    "tbfrontCam",
    "Please input front camera!"
  );

  // Image url
  isValid &=
    validation.checkEmpty(img, "tbimg", "Please input image link!") &&
    validation.checkUrl(img, "tbimg", "Invalid image path!");

  // Description
  isValid &= validation.checkEmpty(desc, "tbdesc", "Please input description!");

  // Select brand
  isValid &= validation.checkSelect(type, "tbtype", "Please choose type!");

  if (!isValid) return;

  return { name, price, screen, backCam, frontCam, img, desc, type };
};

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
            onclick="handleEdit('${product.id}')"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Edit
          </button>
          <button
            onclick="handleDelete('${product.id}')"
            class="btn btn-danger"
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
      console.log(result.data.id);
      renderListProduct(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

getListProduct();

const handleDelete = (id) => {
  const promise = api.deleteDataById(id);
  promise
    .then((result) => {
      alert(`Delete product name: ${result.data.name} success!`);
      getListProduct();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.handleDelete = handleDelete;

getElmId("btnAddPhone").addEventListener("click", () => {
  // Update title modal
  getElmId("staticBackdropLabel").innerHTML = "Add Phone Management";
  // create button "Add" => footer modal
  const btnAdd = `<button class="btn btn-primary" onclick="handleAdd()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
  getElmId("product_form").reset();
});

const handleAdd = () => {
  // Lấy value input
  const productInfo = getInfoInput();
  if (!productInfo) return;

  const { name, price, screen, backCam, frontCam, img, desc, type } =
    productInfo;
  // Tạo ra object product
  const product = new Products(
    "",
    name,
    price,
    screen,
    backCam,
    frontCam,
    img,
    desc,
    type
  );

  // call api add product
  const promise = api.addData(product);
  promise
    .then((result) => {
      console.log(result.data);

      alert(`Add product name: ${result.data.name} success!`);
      // Render list product
      getListProduct();
      // Close modal
      document.getElementsByClassName("btn-close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.handleAdd = handleAdd;

const handleEdit = (id) => {
  // Update title modal
  getElmId("staticBackdropLabel").innerHTML = "Edit Phone Management";
  // create button "Add" => footer modal
  const btnUpdate = `<button class="btn btn-danger" onclick="handleUpdate(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;
  // Call api get product by id
  const promise = api.getDataById(id);

  promise
    .then((result) => {
      const { data } = result;
      // Dom tới các thẻ input gán giá trị
      getElmId("name").value = data.name;
      getElmId("price").value = data.price;
      getElmId("screen").value = data.screen;
      getElmId("backCam").value = data.backCamera;
      getElmId("frontCam").value = data.frontCamera;
      getElmId("img").value = data.img;
      getElmId("desc").value = data.desc;
      getElmId("type").value = data.type;
    })
    .catch((error) => {
      console.log(error);
    });
};
window.handleEdit = handleEdit;

const handleUpdate = (id) => {
  // Lấy value input
  const productInfo = getInfoInput();
  const { name, price, screen, backCam, frontCam, img, desc, type } =
    productInfo;
  // Tạo ra object product
  const product = new Products(
    id,
    name,
    price,
    screen,
    backCam,
    frontCam,
    img,
    desc,
    type
  );
  const promise = api.updateData(product);
  promise
    .then((result) => {
      alert(`Update product id: ${result.data.id} success!`);
      // Render list product
      getListProduct();
      // Close modal
      document.getElementsByClassName("btn-close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.handleUpdate = handleUpdate;

// Reset validation

document
  .getElementsByClassName("btn-close")[0]
  .addEventListener("click", () => {
    const elmError = document.querySelectorAll("#product_form .sp-thongbao");
    for (let i = 0; i < elmError.length; i++) {
      elmError[i].style.display = "none";
    }
  });

// Lấy

// Search phone
const handleSearch = (data, keyword) => {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    const keywordLowerCase = keyword.toLowerCase();
    const phoneNameLowerCase = product.name.toLowerCase();
    if (phoneNameLowerCase.indexOf(keywordLowerCase) !== -1) {
      result.push(product);
    }
  }
  return result;
};
window.handleSearch = handleSearch;

getElmId("voice-search").addEventListener("keyup", () => {
  const keyword = getElmId("voice-search").value;
  // call api lấy list phone
  const promise = api.fetchData();
  promise
    .then((result) => {
      const phoneSearch = handleSearch(result.data, keyword);
      if (keyword === "") {
        getElmId("tbSearch").style.display = "none";
        renderListProduct(phoneSearch);
      } else if (phoneSearch.length > 0) {
        getElmId("tbSearch").style.display = "none";
        renderListProduct(phoneSearch);
      } else {
        renderListProduct(phoneSearch);
        getElmId("tbSearch").style.display = "block";
        getElmId(
          "tbSearch"
        ).innerHTML = `Không tìm thấy sản phẩm có tên "${keyword}"`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// Sắp xếp tăng dần
getElmId("arrange").addEventListener("change", () => {
  const promise = api.fetchData();
  promise
    .then((result) => {
      const { data } = result;
      const value = getElmId("arrange").value;
      if (value === "Ascending order") {
        const increase = handleIncrease(data);
        renderListProduct(increase);
      } else if (value === "Descending order") {
        const decrease = handleDecrease(data);
        renderListProduct(decrease);
      } else {
        getListProduct();
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const handleIncrease = (data) => {
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (data[i].price * 1 > data[j].price * 1) {
        const temp = data[i];
        data[i] = data[j];
        data[j] = temp;
      }
    }
  }
  return data;
};
window.handleIncrease = handleIncrease;

// Sắp xếp giảm
const handleDecrease = (data) => {
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (data[j].price * 1 > data[i].price * 1) {
        const temp = data[i];
        data[i] = data[j];
        data[j] = temp;
      }
    }
  }
  return data;
};
window.handleDecrease = handleDecrease;
