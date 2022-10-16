/** Variáveis globais.
 * @param {HTML} GET_BUY_LIST - Lista onde serão armazenados os itens adcionados ao carrinho de compras.
 */
const GET_BUY_LIST = document.querySelector('#cart__items');

/** Função responsável atribuir um ID ao elemento HTML.
* @param {HTML} element - Elemento a ser aplicado o ID.
* @param {string} elementType - tipo de elemento HTML.
* @param {string} className - Classe do elemento.
* @param {number} number - Número do elemento, necessário para composição única do ID do elemento
*/
const setIdAtribute = (element, elementType, className, number) =>
  element.setAttribute('id', `${elementType}-${className}-${number}`);

/** Função responsável por criar e retornar qualquer elemento.
* @param {string} element - Nome do elemento a ser criado.
* @param {string} className - Classe do elemento.
* @param {string} innerText - Texto do elemento.
* @param {number} index - Número do elemento, necessário para composição única do ID do elemento
* @returns {Element} Elemento criado.
*/
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  //  e.setAttribute('id', `${element}-${className}-${index}`);
  return e;
};

/** Função responsável por criar e retornar o elemento de imagem do produto.
* @param {string} imageSource - URL da imagem.
* @returns {Element} Elemento de imagem do produto.
*/
const createProductImageElement = (imageSource) => {
  const img = createCustomElement('img', 'item__image', '');
  img.src = imageSource;
  return img;
};

/** Função responsável por remover elemento do carrinho de compras.
* @param {string} productClicked - Elemento selecionado para remoção do carrinho.
* @param {string} GET_BUY_LIST - Elemento HTML que armazena lista de compras.
*/
const removerListener = (productClicked) => GET_BUY_LIST.removeChild(productClicked.target);

/** Função responsável por criar e retornar um item do carrinho.
* @param {Object} product - Objeto do produto.
* @param {string} product.id - ID do produto.
* @param {string} product.title - Título do produto.
* @param {string} product.price - Preço do produto.
* @returns {Element} Elemento de um item do carrinho.
*/
const createCartItemElement = ({ id, title, price }) => {
  const liText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  const li = createCustomElement('li', 'cart__item', liText);
  li.addEventListener('click', removerListener);
  return li;
};

/** Função responsável por adicionar elemento ao carrinho de compras.
* @param {string} productToBuy - Elemento selecionado para adição ao carrinho.
* @param {string} GET_BUY_LIST - Elemento HTML que armazena lista de compras.
*/
const addItemInCart = (productToBuy) => GET_BUY_LIST.appendChild(productToBuy);

/** Função responsável por requisitar dados do produto à API.
* @param {string} productClicked - Elemento selecionado pelo usuário através do clique no botão "adicionar ao carrinho".
*/
const requireClickedItemInfo = async (productClicked) => fetchItem(productClicked);

/** Função responsável administrar o fluxo de trabalho do código após interação do usuário com o botão "adicionar ao carrinho".
* @param {string} itemClicked - Elemento selecionado pelo usuário através do clique no botão "adicionar ao carrinho".
* @param {object} infoItem - constante que armazenará o objeto, resultado da requisição à API.
* @param {string} itemToAddInBuyList - constante que armazena o resultado, advindo da função construtora do Elemento que será adicionado ao HTML. 
*/
async function market(itemClicked) {
  const infoItem = await requireClickedItemInfo(itemClicked);
  const itemToAddInBuyList = createCartItemElement(infoItem);
  addItemInCart(itemToAddInBuyList);
}

/** Função que recupera o ID do produto passado como parâmetro.
* @param {element} element - Elemento clicado pelo usuário na página web.
* @param {string} clickedElement - constante que armazena o ID do botão clicado.
* @param {number} getElementNumber - constante que armazena o número do ID do botão clicado.
* @param {HTML} elementToSearch - captura o elemento HTML vinculado àquele botão que foi clicado.
*/
function getIdFromProductItem(element) {
  const clickedElement = element.target.id;
  const getElementNumber = clickedElement.match(/(\d+)/)[0];
  const elementToSearch = document.querySelector(`#span-item_id-${getElementNumber}`);
  market(elementToSearch.innerText);
}

/** Função responsável por criar e retornar o elemento do produto.
* @param {Object} product - Objeto do produto. 
* @param {string} product.id - ID do produto.
* @param {string} product.title - Título do produto.
* @param {string} product.thumbnail - URL da imagem do produto.
* @param {number} number - número identificador do elemento que será criado.
* @param {HTML} section - elemento HTML que armazenará os demais elementos.
* @param {HTML} spanId - elemento HTML que receberá o ID do produto.
* @param {HTML} spanTitle - elemento HTML que receberá a descrição do produto.
* @param {HTML} img - elemento HTML que receberá a imagem do produto.
* @param {HTML} listeningButton - elemento HTML que terá a função de compra do produto.
* @returns {Element} Elemento de produto.
*/
const createProductItemElement = ({ id, title, thumbnail }, number) => {
  const section = createCustomElement('section', 'item', '');
  const spanId = createCustomElement('span', 'item_id', id);
  const spanTitle = createCustomElement('span', 'item__title', title);
  const img = createProductImageElement(thumbnail);

  setIdAtribute(section, 'section', 'item', number);
  setIdAtribute(spanId, 'span', 'item_id', number);
  setIdAtribute(spanTitle, 'span', 'item__title', number);

  section.appendChild(spanId);
  section.appendChild(spanTitle);
  section.appendChild(img);

  const text = 'Adicionar ao carrinho!';
  const listeningButton = createCustomElement('button', 'item__add', text);
  listeningButton.addEventListener('click', getIdFromProductItem);

  setIdAtribute(listeningButton, 'button', 'item__add', number);
  section.appendChild(listeningButton);

  return section;
};

/** Função responsável por adicionar Elemento, vindo da requisição à API, ao HTML.
* @param {string} population - Elemento "section".
* @param {HTML} getSectionContainer - Constante que armazena elemento HTML.
*/
const populateWebPage = (population) => {
  const getSectionContainer = document.querySelector('#items-container');
  getSectionContainer.appendChild(population);
};

/** Função responsável gerenciar a adição de cada item advindo da consulta à API.
* @param {Array} ArrayDeObjFromAPI - Arrya de objetos retornado pela API, com os dados dos itens que serão adicionado à página HTML. 
* @param {Object} objProduct - Cada item, advindo da API, estruturando como um objeto.
* @param {string} constructor - constante que armazena o novo elemento HTML criado pela função chamada.
* @param {number} index - número identificador de cada objeto dentro do array.
*/
const getEachItemFromAPI = (ArrayDeObjFromAPI) => {
  ArrayDeObjFromAPI.forEach((objProduct, index) => {
    const constructor = createProductItemElement(objProduct, index);
    populateWebPage(constructor);
  });
};

/** Função responsável iniciar o script, e a consulta à API, assim que a página HTML é carregada.
* @param {Object} requestAPI - constante que armazena o todos os dados do objeto retornado pela API.
*/
window.onload = async () => {
  const requestAPI = await fetchProducts('computador');
  getEachItemFromAPI(requestAPI.results);
};