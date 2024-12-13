class Api {
  fetchData() {
    const promise = axios({
      url: "https://6756aa03c0a427baf949beca.mockapi.io/api/Products",
      method: "GET",
    });
    return promise;
  }
}

export default new Api();
