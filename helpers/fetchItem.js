const urlContructor = (itemId) => `https://api.mercadolibre.com/items/${itemId}`;

const fetchItem = async (item) => {
  const url = urlContructor(item);
  try {
  const getFetchItem = await fetch(url);
  const getItem = await getFetchItem.json();
  return getItem;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
