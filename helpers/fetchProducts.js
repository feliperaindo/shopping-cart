const fetchProducts = async (searchItem) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${searchItem}`;

  try {
    const urlRequest = await fetch(url);
    const result = await urlRequest.json();
    return result;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
