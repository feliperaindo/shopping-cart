const removeCartItemFromLocalStorage = (key, itemToRemove) => {
  const data = JSON.parse(localStorage.getItem(key));

  const findItemToRemoved = data.filter((removeItem) => removeItem.HTMLId !== itemToRemove);
  const renameAllData = findItemToRemoved.map(({ id, title, price, HTMLId }, index) => {
    const newId = HTMLId.replace(/\d+/g, index);
    const newObj = { id: [id], title: [title], price: [price], HTMLId: newId };
    return newObj;
  });
  
  localStorage.setItem(key, JSON.stringify(renameAllData));
};

const saveCartItems = (key, item, actOf = undefined) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([item]));
    return;
  }
  if (actOf === 'remove') {
    removeCartItemFromLocalStorage(key, item);
    return;
  }
  const getOldLocalStorage = JSON.parse(localStorage.getItem(key));
  const newLocalStorage = [...getOldLocalStorage, item];
  localStorage.setItem(key, JSON.stringify(newLocalStorage));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
