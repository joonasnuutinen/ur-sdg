import { useRouter } from 'next/router'
import companies, { RevenueMix } from '@/data/companies'
import sdgs, { SDG } from '@/data/sdgs'
import { getAggregatedAlignment } from '@/data/products'

const CompanyNotFound = () => {
  return <p>Company not found</p>
}

interface SdgProps {
  sdg: SDG
}

const Sdg = ({ sdg }: SdgProps) => {
  return <li>{sdg.name}</li>
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
    <ol>
      {sdgs.map((sdg) => <Sdg key={sdg.id} sdg={sdg} />)}
    </ol>
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
