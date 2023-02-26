interface Product {
  id: string
  name: string
  parent?: string
  alignment: {
    [key: string]: number
  }
}

const products = [
  {
    id: 'food',
    name: 'Food',
    alignment: {
      hunger: 2
    }
  },
  {
    id: 'fruit',
    name: 'Fruit',
    alignment: {
      health: 1
    }
  },
  {
    id: 'apple',
    name: 'Apple',
    parent: 'fruit',
  },
  {
    id: 'pear',
    name: 'Pear',
    parent: 'fruit',
  },
]

export default products