export interface RevenueMix {
  [key: string]: number
}

export interface Company {
  id: string
  name: string
  revenueMix: RevenueMix
}

const companies: Company[] = [
  {
    id: 'mikes-fruit-farm',
    name: 'Mike\'s fruit farm ltd',
    revenueMix: {
      'apple': 80,
      'pear': 20
    }
  }
]

export default companies