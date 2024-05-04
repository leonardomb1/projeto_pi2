const {
  valoresMaioresQueMedia,
  menorValor,
  somaDosItens,
  valoresMenoresQue20,
  primeiroEUltimo
} = require('./index')

test('devolve os valores maiores que a média', () => {
  const input = [1, 2, 3, 4, 5]
  const expectedOutput = [4, 5]
  expect(valoresMaioresQueMedia(input)).toEqual(expectedOutput)
})

test('devolve o menor valor no array', () => {
  const input = [1, 2, 3, 4, 5]
  const expectedOutput = 1
  expect(menorValor(input)).toEqual(expectedOutput)
})

test('devolve a soma dos itens do array', () => {
  const input = [1, 2, 3, 4, 5]
  const expectedOutput = 15
  expect(somaDosItens(input)).toEqual(expectedOutput)
})

test('devolve os valores menores que 20', () => {
  const input = [1, 2, 3, 23, 4, 5, 20]
  const expectedOutput = [1, 2, 3, 4, 5]
  expect(valoresMenoresQue20(input)).toEqual(expectedOutput)
})

test('devolve o primeiro e o último valor do array', () => {
  const input = [1, 2, 3, 4, 5]
  const expectedOutput = [1, 5]
  expect(primeiroEUltimo(input)).toEqual(expectedOutput)
})
