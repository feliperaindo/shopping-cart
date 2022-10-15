const getBuyList = document.querySelector('#cart__items');

/** Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText, index = 0) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  e.setAttribute('id', `${element}-${className}-${index}`);
  return e;
};

/** Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource, index) => {
  const img = createCustomElement('img', 'item__image', '', index);
  img.src = imageSource;
  return img;
};

const removerListener = (productClicked) => getBuyList.removeChild(productClicked.target);

/** Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }, number) => {
  const liText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  const li = createCustomElement('li', 'cart__item', liText, number);
  li.addEventListener('click', removerListener);
  return li;
};

const addItemInCart = (productToBuy) => getBuyList.appendChild(productToBuy);

const requireClickedItemInfo = async (productClicked) => fetchItem(productClicked);

async function market(itemClicked, number) {
  const infoItem = await requireClickedItemInfo(itemClicked);
  const itemToAddInBuyList = createCartItemElement(infoItem, number);
  addItemInCart(itemToAddInBuyList);
}

/** Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
function getIdFromProductItem(element) {
    const clickedElement = element.target.id;
    const getElementNumber = clickedElement.match(/(\d+)/)[0];
    const elementToSearch = document.querySelector(`#span-item_id-${getElementNumber}`);
    market(elementToSearch.innerText, getElementNumber);
}

/** Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }, index) => {
  const section = createCustomElement('section', 'item', '', index);

  section.appendChild(createCustomElement('span', 'item_id', id, index));
  section.appendChild(createCustomElement('span', 'item__title', title, index));
  section.appendChild(createProductImageElement(thumbnail, index));

  const text = 'Adicionar ao carrinho!';
  const listeningButton = createCustomElement('button', 'item__add', text, index);
  listeningButton.addEventListener('click', getIdFromProductItem);

  section.appendChild(listeningButton);

  return section;
};

const populateWebPage = (population) => {
  const getList = document.querySelector('#items-container');
  getList.appendChild(population);
};

const getEachItemFromAPI = (objFromAPI) => {
  objFromAPI.forEach((objProduct, index) => {
    const constructor = createProductItemElement(objProduct, index);
    populateWebPage(constructor);
  });
};

window.onload = async () => {
  const requestAPI = await fetchProducts('computador');
  getEachItemFromAPI(requestAPI.results);
};
