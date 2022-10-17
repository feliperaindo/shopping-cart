const localStorageSimulator = require('../mocks/localStorageSimulator');
const { saveCartItems, removeCartItemFromLocalStorage } = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('Verifica se `saveCartItems` é  uma função', () => {
    expect(typeof saveCartItems).toBe('function');
  });
  test('Verifica se `localStorage.setItem` é aplicado, quando a função `saveCartItems` é requerida', () => {
    saveCartItems('cartItem')
    expect(localStorage.setItem).toBeCalled();
  });
  test('Verifica se após chamar a função `saveCartItems` localStorage contem chave de nome `cartItem` e valor respectivo, conforme passado por parâmetro', () => {
    saveCartItems('cartItem', 'chave de teste');
    expect(localStorage.setItem).toBeCalledWith('cartItem', JSON.stringify('chave de teste'));
  });
});
