import { useRouter } from 'next/router'
import companies, { RevenueMix } from '@/data/companies'
import sdgs, { SDG } from '@/data/sdgs'
import { Alignment, getAggregatedAlignment } from '@/data/products'

// Types
interface AggregatedProduct {
  id: string
  percentage: number
  alignment: Alignment
}

interface AlignmentProps {
  revenueMix: RevenueMix
}

interface IndividualAlignment {
  [category: number]: number
}

interface CombinedAlignment {
  [sdgId: string]: IndividualAlignment
}

interface SdgProps {
  sdg: SDG
  alignment: CombinedAlignment
}

type CategoryKey = -2 | -1 | 1 | 2

// Helpers

// Takes in two alignment objects and sums the common percentages, e.g.
// { health: { '1': 80 } } + { health: { '1': 20 } } = { health: { '1': 100 } }
const combineFullAlignments = (a1: CombinedAlignment, a2: CombinedAlignment): CombinedAlignment => {
  // Add common percentages from a2 to a1
  const aMerged = Object.entries(a1).reduce((prev: CombinedAlignment, [sdgId, percentages]): CombinedAlignment => {
    const sdgAlignment = Object.entries(percentages).reduce((sums: IndividualAlignment, [category, percentage]): IndividualAlignment => {
      const a2Percentage = a2[sdgId]?.[Number(category)] || 0
      return {
        ...sums,
        [category]: percentage + a2Percentage
      }
    }, {})
    return {
      ...prev,
      [sdgId]: sdgAlignment
    }
  }, {})

  // Add the remaining percentages from a2 to a1
  return {
    ...a2,
    ...aMerged
  }
}

// Components

const Sdg = ({ sdg, alignment }: SdgProps) => {
  const categories: { [key in CategoryKey]: string } = {
    '-2': 'strongly misaligned',
    '-1': 'misaligned',
    '1': 'aligned',
    '2': 'strongly aligned'
  }
  const categoryOrder: CategoryKey[] = [-2, -1, 1, 2]
  const alignmentDescription = alignment[sdg.id]
  ? `: ${categoryOrder.filter((category) => alignment[sdg.id][category]).map((category) => `${alignment[sdg.id][category]} % ${categories[category]}`).join(', ')}`
  : ''
  return <li>{sdg.name + alignmentDescription}</li>
}

const Alignment = ({ revenueMix }: AlignmentProps) => {
  // Get aggregated alignment for each product
  const revenueMixEntries = Object.entries(revenueMix)
  const products: AggregatedProduct[] = revenueMixEntries.map(([id, percentage]) => {
    return {
      id,
      percentage,
      alignment: getAggregatedAlignment(id)
    }
  })

  // Pivot the data structure into a 2-dimensional object indexed by sdg x category:
  // { <sdg>: { <category>: <percentage> } }
  const combinedAlignments: CombinedAlignment = products.reduce((prev: CombinedAlignment, product) => {
    const { percentage } = product
    const combinedAlignment: CombinedAlignment = Object.entries(product.alignment).reduce((c: CombinedAlignment, [id, category]) => {
      return {
        ...c,
        [id]: {
          ...(c[id] || {}),
          [category]: percentage
        }
      }
    }, {})
    return combineFullAlignments(prev, combinedAlignment)
  }, {})

  return (
    <ol>
      {sdgs.map((sdg) => <Sdg key={sdg.id} sdg={sdg} alignment={combinedAlignments} />)}
    </ol>
  )
}

const CompanyNotFound = () => {
  return <p>Company not found</p>
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
