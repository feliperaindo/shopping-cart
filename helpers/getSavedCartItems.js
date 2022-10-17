const getSavedCartItems = (key) => JSON.parse(localStorage.getItem(key));

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
