const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('Verifica se `getSavedCartItems` é  uma função', () => {
    expect(typeof getSavedCartItems).toBe('function');
  });
  test('Verifica se `localStorage.getItem` é aplicado, quando a função `getSavedCartItems` é requerida', () => {
    getSavedCartItems('cartItem')
    expect(localStorage.getItem).toBeCalled();
  });
  test('Verifica se após chamar a função `saveCartItems` localStorage contem chave de nome `cartItem` e valor respectivo, conforme passado por parâmetro', () => {
    getSavedCartItems('cartItem');
    expect(localStorage.getItem).toBeCalledWith('cartItem');
  });
});
