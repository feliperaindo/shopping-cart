const removeCartItemFromLocalStorage = (itemToRemove) => {
  const data = JSON.parse(localStorage.getItem('cartItem'));

  const findItemToRemoved = data.filter((removeItem) => removeItem.HTMLId !== itemToRemove);
  const renameAllData = findItemToRemoved.map(({ id, title, price, HTMLId }, index) => {
    const newId = HTMLId.replace(/\d+/g, index);
    const newObj = { id: [id], title: [title], price: [price], HTMLId: newId };
    return newObj;
  });
  
  localStorage.setItem('cartItem', JSON.stringify(renameAllData));
};

const saveCartItems = (item, actOf = undefined) => {
  if (!localStorage.getItem('cartItem')) {
    localStorage.setItem('cartItem', JSON.stringify([item]));
    return;
  }
  if (actOf === 'remove') {
    removeCartItemFromLocalStorage(item);
    return;
  }
  const getOldLocalStorage = JSON.parse(localStorage.getItem('cartItem'));
  const newLocalStorage = [...getOldLocalStorage, item];
  localStorage.setItem('cartItem', JSON.stringify(newLocalStorage));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
