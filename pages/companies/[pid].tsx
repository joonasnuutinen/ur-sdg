import { useRouter } from 'next/router'
import companies, { RevenueMix } from '@/data/companies'
import sdgs from '@/data/sdgs'
import { getAggregatedAlignment } from '@/data/products'

const CompanyNotFound = () => {
  return <p>Company not found</p>
}

interface AlignmentProps {
  revenueMix: RevenueMix
}

const Alignment = ({ revenueMix }: AlignmentProps) => {
  const revenueMixEntries = Object.entries(revenueMix)
  const products = revenueMixEntries.map(([id, percentage]) => {
    return {
      id,
      percentage,
      alignment: getAggregatedAlignment(id)
    }
  })
  console.log(products)
  return (
    <div>
      Alignment
    </div>
  )
}

const Company = () => {
  const router = useRouter()
  const { pid } = router.query
  const company = companies.find(({ id }) => id === pid)

  if (!company) return <CompanyNotFound />

  const { name, revenueMix } = company

  return (
    <div>
      <h1>{name}</h1>
      <Alignment revenueMix={revenueMix} />
    </div>
  )
}

export default Company
