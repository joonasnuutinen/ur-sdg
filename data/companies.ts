interface Company {
  id: string
  name: string
  revenueMix: {
    [key: string]: number
  }
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