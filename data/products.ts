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
      hunger: 1,
      health: 1
    }
  },
  {
    id: 'fruit',
    name: 'Fruit',
    parent: 'food',
    alignment: {
      health: 2
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

// Recursively aggregate alignment from ancestor nodes
export const getAggregatedAlignment = (id: string): Alignment => {
  // Could be optimised with a hash map (e.g. if using a relational db)
  const product = products.find((p) => p.id === id)
  if (!product) throw Error('Product not found')

  const alignment = product.alignment || {}

  if (!product.parent) return { ...alignment }

  // Aggregate top-down so that the most specific individual alignment remains in force
  return { ...getAggregatedAlignment(product.parent), ...alignment }
}
