const getSavedCartItems = (key) => {
  if (!localStorage.getItem(key)) {
    return null;
  }
  return JSON.parse(localStorage.getItem(key));
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
