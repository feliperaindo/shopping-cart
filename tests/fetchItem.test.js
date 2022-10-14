require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Verifica se `fetchItem` é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });
  test('Verifica se a função `fetchItem` utiliza o endpoint quando aplicado o parâmetro `MLB1615760527`', async () => {
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem('MLB1615760527')
    expect(fetch).toBeCalledWith(url);
  });
  test('Verifica se o retorno da função `fetchItem` é idêntico ao conteúdo da constante `item`', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  test('Verifica o retorno do erro esperando em caso da chamada da função sem parâmetro', async () => {
    expect(fetchItem()).resolves.toThrow('You must provide an url');
  });
});
