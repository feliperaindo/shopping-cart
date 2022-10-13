require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('Verifica se `fetchProducts` é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('Verifica se a função é chamada com o parâmetro `computador`', async () => {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(url);
  });
  test('Verifica se o retorno da função é igual ao conteúdo de `computadorSearch`', async () => {
    expect(fetchProducts('computador')).resolves.toEqual(computadorSearch);
  });
  test('Verifica o retorno do erro esperando em caso da chamada da função sem parâmetro', async () => {
    expect(fetchProducts()).resolves.toThrow('You must provide an url');
  });
});
