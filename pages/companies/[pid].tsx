import { useRouter } from 'next/router'
import companies from '@/data/companies'

const CompanyNotFound = () => {
  return <p>Company not found</p>
}

const Company = () => {
  const router = useRouter()
  const { pid } = router.query
  const company = companies.find(({ id }) => id === pid)

  if (!company) return <CompanyNotFound />

  return <p>{company.name}</p>
}

export default Company
