const saveCartItems = (itemToSave) => {
  const dataToLocalStorage = [JSON.stringify(itemToSave)];

  if (!localStorage.getItem('cartItem')) {
    localStorage.setItem('cartItem', dataToLocalStorage);
  }
  const getOldLocalStorage = localStorage.getItem('cartItem');
  const newLocalStorage = [...getOldLocalStorage, dataToLocalStorage];
  localStorage.setItem('cartItem', newLocalStorage);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
