const getSavedCartItems = () => {
  if (!localStorage.getItem('cartItem')) {
    return null;
  }
  return JSON.parse(localStorage.getItem('cartItem'));
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
