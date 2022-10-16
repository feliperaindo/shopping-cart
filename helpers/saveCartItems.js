const saveCartItems = (itemToSave) => {
  if (!localStorage.getItem('cartItem')) {
    localStorage.setItem('cartItem', JSON.stringify([itemToSave]));
    return;
  }
  const getOldLocalStorage = JSON.parse(localStorage.getItem('cartItem'));
  const newLocalStorage = [...getOldLocalStorage, itemToSave];
  localStorage.setItem('cartItem', JSON.stringify(newLocalStorage));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
