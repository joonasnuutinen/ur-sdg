export interface Alignment {
  [key: string]: number
}
interface Product {
  id: string
  name: string
  parent?: string
  alignment?: Alignment
}

const products: Product[] = [
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
    parent: 'food',
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
    alignment: {
      'clean-water': -1
    }
  },
]

export default products

export const getAggregatedAlignment = (id: string): Alignment => {
  const product = products.find((p) => p.id === id)
  if (!product) throw Error('Product not found')

  const alignment = product.alignment || {}

  if (!product.parent) return { ...alignment }

  return { ...alignment, ...getAggregatedAlignment(product.parent) }
}
