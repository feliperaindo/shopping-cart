// Varíaveis Globais.
const GET_BUY_LIST = document.querySelector('#cart__items');

// Função de consulta à API
const requireClickedItemInfo = async (productClicked) => fetchItem(productClicked);

// Funçẽos de construção da página
const setIdAtribute = (element, elementType, className, number) =>
  element.setAttribute('id', `${elementType}-${className}-${number}`);
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};
const createProductImageElement = (imageSource) => {
  const img = createCustomElement('img', 'item__image', '');
  img.setAttribute('alt', 'product image');
  img.src = imageSource;
  return img;
};
const createProductItemElement = ({ id, title, thumbnail }, number) => {
  const text = 'Adicionar ao carrinho!';

  const section = createCustomElement('section', 'item', '');
  const spanId = createCustomElement('span', 'item_id', id);
  const spanTitle = createCustomElement('span', 'item__title', title);
  const img = createProductImageElement(thumbnail);
  const listeningButton = createCustomElement('button', 'item__add', text);

  setIdAtribute(section, 'section', 'item', number);
  setIdAtribute(spanId, 'span', 'item_id', number);
  setIdAtribute(spanTitle, 'span', 'item__title', number);
  setIdAtribute(listeningButton, 'button', 'item__add', number);

  section.appendChild(spanId);
  section.appendChild(spanTitle);
  section.appendChild(img);
  section.appendChild(listeningButton);

  return section;
};
const populateWebPage = (population) => {
  const getSectionContainer = document.querySelector('#items-container');
  getSectionContainer.appendChild(population);
};
const getEachItemFromAPI = (ArrayDeObjFromAPI) => {
  ArrayDeObjFromAPI.forEach((objProduct, index) => {
    const constructor = createProductItemElement(objProduct, index);
    populateWebPage(constructor);
  });
};

// Funções de Local Storage
const removeCartItemFromLocalStorage = (itemToRemove) => {
  const data = getSavedCartItems('cartItems');
  const findItemToRemoved = data.filter((removeItem) => removeItem.HTMLId !== itemToRemove);
  const renameAllData = findItemToRemoved.map(({ id, title, price, HTMLId }, index) => {
    const newId = HTMLId.replace(/\d+/g, index);
    const newObj = { id: [id], title: [title], price: [price], HTMLId: newId };
    return newObj;
  });
  saveCartItems('cartItems', renameAllData);
};
function saveInLocalStorage({ id, title, price }, liElement) {
  const localStorage = getSavedCartItems('cartItem');
  const elementToSave = { id, title, price, HTMLId: liElement.id };
  localStorage.push(elementToSave);
  saveCartItems('cartItem', localStorage);
}

// Funções relacionadas ao carrinho de compras
function updateWindowPrice(priceUpdate = 0) {
  const getHTMLElement = document.querySelector('#span-price');
  getHTMLElement.innerText = `Total: $ ${priceUpdate}`;
}
const getPrice = async (productInCart) => {
  const getId = productInCart.innerText.split('|')[0].replace(/\s+/g, '').split('ID:')[1];
  const InfoOfProduct = await requireClickedItemInfo(getId);
  return Math.round(InfoOfProduct.price);
};
const totalPriceCalculator = async () => {
  let totalPrice = 0;
  if (!GET_BUY_LIST.childNodes.length) {
    updateWindowPrice();
  } else {
    GET_BUY_LIST.childNodes.forEach(async (productInCart) => {
      const price = await getPrice(productInCart);
      totalPrice += price;
      updateWindowPrice(totalPrice);
    });
  }
};
const renameAllIdsFromCart = () => {
  GET_BUY_LIST.childNodes.forEach((each, index) => setIdAtribute(each, 'li', 'cart__item', index));
};
const addItemInCart = (productToBuy) => GET_BUY_LIST.appendChild(productToBuy);
const itemRemoverFromCart = async (productClicked) => {
  const getIdFrom = productClicked.target.id;

  removeCartItemFromLocalStorage(getIdFrom);

  GET_BUY_LIST.removeChild(productClicked.target);
  renameAllIdsFromCart();

  await totalPriceCalculator();
};
const createCartItemElement = ({ id, title, price }) => {
  const liText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  const li = createCustomElement('li', 'cart__item', liText);
  li.addEventListener('click', itemRemoverFromCart);
  setIdAtribute(li, 'li', 'cart__item', GET_BUY_LIST.children.length);
  return li;
};

// Funções de admistração do fluxo
async function market(itemClicked) {
  const infoItem = await requireClickedItemInfo(itemClicked);
  const itemToAddInBuyList = createCartItemElement(infoItem);
  addItemInCart(itemToAddInBuyList);

  await totalPriceCalculator();

  saveInLocalStorage(infoItem, itemToAddInBuyList);
}
function getIdFromProductItem(element) {
  const clickedElement = element.target.id;
  const getElementNumber = clickedElement.match(/(\d+)/)[0];
  const elementToSearch = document.querySelector(`#span-item_id-${getElementNumber}`);
  market(elementToSearch.innerText);
}
async function localStorageManager() {
  const recoveryLocalStorageData = getSavedCartItems('cartItem');
  if (!recoveryLocalStorageData) {
    saveCartItems('cartItem', []);
    return;
  }
  recoveryLocalStorageData.forEach(async (itemSaved) => {
    const liElement = createCartItemElement(itemSaved);
    addItemInCart(liElement);
    await totalPriceCalculator();
  });
}
function makeButtonsDinamics() {
  const GET_BUTTONS = document.querySelectorAll('.item__add');
  GET_BUTTONS.forEach((listeningButton) => {
    listeningButton.addEventListener('click', getIdFromProductItem);
  });
}
window.onload = async () => {
  const requestAPI = await fetchProducts('computador');
  getEachItemFromAPI(requestAPI.results);
  makeButtonsDinamics();
  updateWindowPrice();
  await localStorageManager();
};
