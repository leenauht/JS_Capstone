class ProductList {
  constructor() {
    this.arr = [];
  }

  addProduct(data) {
    this.arr = data;
  }

  filterProducts(type) {
    if (type === "Tất cả") {
      return this.arr;
    } else {
      const result = [];
      for (let i = 0; i < this.arr.length; i++) {
        const product = this.arr[i];
        if (product.type === type) {
          result.push(product);
        }
      }
      return result;
    }
  }
}
export default new ProductList();
