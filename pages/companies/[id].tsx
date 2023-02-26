import { useRouter } from 'next/router'

const Company = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Company: {id}</p>
}

export default Company
