const saveCartItems = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

if (typeof module !== 'undefined') {
  module.exports = { saveCartItems };
}
