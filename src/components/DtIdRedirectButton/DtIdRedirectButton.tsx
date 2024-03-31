import { useEffect, useState } from 'react'
import { fetchDtDoc } from '../../utils'

interface Props {
  dtId: string
}

// WIP
const DtIdRedirectButton: React.FC<Props> = ({ dtId }) => {
  const [twinUrl, setTwinUrl] = useState<string>('')

  useEffect(() => {
    fetchDtDoc(dtId).then((res) => setTwinUrl(res))
  })

  if (!twinUrl) {
    return null
  }

  return (
    <a href={twinUrl} className='button ml-[10px] button'>
      View Twin
    </a>
  )
}

export default DtIdRedirectButton
