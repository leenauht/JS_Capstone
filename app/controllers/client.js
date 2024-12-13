const getEleId = (id) => document.getElementById(id);

// Render List Product
const renderListProduct = (data) => {
  console.log(data);
  let content = "";
  data.forEach((product) => {
    console.log(product);
    const { img, name, price } = product;
    content += `
   <div class="relative">
    <img class="h-auto max-w-full rounded-lg"
    src="./../../img/${img}" alt="">
    <h4 class=" text-base font-semibold mt-2">${name}</h4>
    <p class=" text-2xl text-red-500 font-semibold mt-1">$${price}</p>
    <button type="button"
    class="bg-blue-200 text-blue-700 hover:bg-blue-500 hover:text-white px-6 py-2 border rounded-full ease-in duration-300 w-full cursor-pointer">Mua</button>
  </div>
    `;
  });
  getEleId("mainProduct").innerHTML = content;
};
// show loader 
getEleId("loaderProducts").style.display = "block";

const fetchListProduct = () => {
  const promise = axios({
    url: "https://6756aa03c0a427baf949beca.mockapi.io/api/Products",
    method: "GET",
  });
  promise
    .then((result) => {
      renderListProduct(result.data);
      getEleId("loaderProducts").style.display = "none";
    })
    .catch((error) => {
      console.log(error);
      getEleId("loaderProducts").style.display = "none";
    });
};
fetchListProduct();
